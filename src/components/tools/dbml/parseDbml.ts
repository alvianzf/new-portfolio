import type { DbmlError, DiagramRef, DiagramTable, ParsedResult } from './types';

export class DbmlParseError extends Error {
  errors: DbmlError[];

  constructor(errors: DbmlError[]) {
    super(errors[0]?.message ?? 'Failed to parse DBML');
    this.name = 'DbmlParseError';
    this.errors = errors;
  }
}

function toDbmlErrors(err: unknown): DbmlError[] {
  const diags = (err as { diags?: unknown })?.diags;
  if (Array.isArray(diags) && diags.length > 0) {
    return diags.map((d: { message?: string; location?: { start?: { line?: number; column?: number } } }) => ({
      message: d.message ?? 'Unknown parse error',
      line: d.location?.start?.line,
      column: d.location?.start?.column,
    }));
  }
  return [{ message: err instanceof Error ? err.message : String(err) }];
}

/**
 * Parses DBML source and exports PostgreSQL DDL.
 * `@dbml/core` is dynamically imported so it stays out of the main bundle.
 * Throws DbmlParseError with line info on invalid input.
 */
export async function parseDbml(source: string): Promise<ParsedResult> {
  const { Parser, ModelExporter } = await import('@dbml/core');

  try {
    const database = Parser.parse(source, 'dbmlv2');
    const sql = ModelExporter.export(database, 'postgres');

    const tables: DiagramTable[] = [];
    const refs: DiagramRef[] = [];

    database.schemas.forEach((schema) => {
      schema.tables.forEach((table) => {
        tables.push({
          name: table.name,
          fields: table.fields.map((field) => ({
            name: field.name,
            type: String(field.type?.type_name ?? ''),
            pk: Boolean(field.pk),
            unique: Boolean(field.unique),
            notNull: Boolean(field.not_null),
            increment: Boolean(field.increment),
          })),
        });
      });

      schema.refs.forEach((ref, refIndex) => {
        const [a, b] = ref.endpoints;
        if (!a || !b) return;
        // Draw from the many side ('*') towards the one side ('1') when possible.
        const [source_, target] = String(a.relation) === '*' ? [a, b] : [b, a];
        refs.push({
          id: `${schema.name}-${refIndex}`,
          source: {
            table: source_.tableName,
            field: source_.fieldNames[0] ?? '',
            relation: String(source_.relation),
          },
          target: {
            table: target.tableName,
            field: target.fieldNames[0] ?? '',
            relation: String(target.relation),
          },
        });
      });
    });

    return { tables, refs, sql };
  } catch (err) {
    if (err instanceof DbmlParseError) throw err;
    throw new DbmlParseError(toDbmlErrors(err));
  }
}
