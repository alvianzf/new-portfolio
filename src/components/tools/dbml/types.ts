export interface DiagramField {
  name: string;
  type: string;
  pk: boolean;
  unique: boolean;
  notNull: boolean;
  increment: boolean;
}

export interface DiagramTable {
  name: string;
  fields: DiagramField[];
}

export interface DiagramRefEnd {
  table: string;
  field: string;
  /** '1' or '*' */
  relation: string;
}

export interface DiagramRef {
  id: string;
  source: DiagramRefEnd;
  target: DiagramRefEnd;
}

export interface ParsedResult {
  tables: DiagramTable[];
  refs: DiagramRef[];
  sql: string;
}

export interface DbmlError {
  message: string;
  line?: number;
  column?: number;
}

export interface Position {
  x: number;
  y: number;
}
