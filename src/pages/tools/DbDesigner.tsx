import { useEffect, useRef, useState } from 'react';
import {
  Box, Button, Card, Tab, Tabs, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Check, Copy, Download, Rocket } from 'lucide-react';
import SEO from '../../components/SEO';
import DiagramCanvas from '../../components/tools/dbml/DiagramCanvas';
import { CARD_WIDTH } from '../../components/tools/dbml/TableCard';
import { DbmlParseError, parseDbml } from '../../components/tools/dbml/parseDbml';
import type { DbmlError, ParsedResult, Position } from '../../components/tools/dbml/types';

const DEFAULT_DBML = `// Whiteboard Architect
// Every unicorn starts with three tables and unearned confidence.

Table users {
  id uuid [pk, default: \`gen_random_uuid()\`]
  email varchar(255) [unique, not null, note: 'also the entire growth strategy']
  full_name varchar(120)
  is_founder boolean [default: false]
  created_at timestamp [not null, default: \`now()\`]

  indexes {
    (email) [name: 'idx_users_email']
  }
}

Table subscriptions {
  id integer [pk, increment]
  user_id uuid [not null]
  plan varchar(50) [not null, default: 'free', note: 'everyone is on free']
  mrr_cents integer [default: 0]
  cancelled_at timestamp
}

Table feature_flags {
  id integer [pk, increment]
  name varchar(100) [unique, not null]
  enabled boolean [default: false, note: 'it stays false']
  owner_id uuid
}

Ref: subscriptions.user_id > users.id
Ref: feature_flags.owner_id > users.id
`;

const GRID_COLS = 2;
const GRID_X_GAP = 72;
const GRID_Y_GAP = 260;

function withNewTables(prev: Record<string, Position>, tableNames: string[]): Record<string, Position> {
  const missing = tableNames.filter((name) => !prev[name]);
  if (missing.length === 0) return prev;
  const next = { ...prev };
  let slot = Object.keys(prev).length;
  missing.forEach((name) => {
    const col = slot % GRID_COLS;
    const row = Math.floor(slot / GRID_COLS);
    next[name] = { x: 32 + col * (CARD_WIDTH + GRID_X_GAP), y: 32 + row * GRID_Y_GAP };
    slot += 1;
  });
  return next;
}

function PaneHeader({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default',
        minHeight: 52,
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 1, textTransform: 'uppercase' }}>
        {label}
      </Typography>
      <Box sx={{ ml: 'auto', display: 'flex', gap: 1, flexWrap: 'wrap' }}>{children}</Box>
    </Box>
  );
}

export interface DbDesignerToolProps {
  /** When provided, renders a "Deploy to sandbox" button that receives the generated PostgreSQL DDL. */
  onSendToSandbox?: (sql: string) => void;
}

export function DbDesignerTool({ onSendToSandbox }: DbDesignerToolProps) {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [mobileTab, setMobileTab] = useState(0);

  const [source, setSource] = useState(DEFAULT_DBML);
  const [result, setResult] = useState<ParsedResult | null>(null);
  const [errors, setErrors] = useState<DbmlError[] | null>(null);
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const [copied, setCopied] = useState(false);
  const runIdRef = useRef(0);

  useEffect(() => {
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    const timer = setTimeout(async () => {
      try {
        const parsed = await parseDbml(source);
        if (runIdRef.current !== runId) return;
        setResult(parsed);
        setErrors(null);
        setPositions((prev) => withNewTables(prev, parsed.tables.map((t) => t.name)));
      } catch (err) {
        if (runIdRef.current !== runId) return;
        setErrors(err instanceof DbmlParseError ? err.errors : [{ message: String(err) }]);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [source]);

  const handleMove = (tableName: string, position: Position) => {
    setPositions((prev) => ({ ...prev, [tableName]: position }));
  };

  const sql = result?.sql ?? '';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sql], { type: 'application/sql' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'whiteboard-architect.sql';
    link.click();
    URL.revokeObjectURL(url);
  };

  const editorPane = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0 }}>
      <PaneHeader label="DBML" />
      <Box
        component="textarea"
        value={source}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSource(e.target.value)}
        spellCheck={false}
        aria-label="DBML source"
        // Multiline editor: Enter inserts a newline here, nothing submits.
        sx={{
          flex: 1,
          width: '100%',
          resize: 'none',
          border: 'none',
          outline: 'none',
          bgcolor: 'transparent',
          color: 'text.primary',
          fontFamily: 'monospace',
          fontSize: 13,
          lineHeight: 1.6,
          p: 2,
          minHeight: 0,
        }}
      />
      {errors && (
        <Box
          data-testid="dbml-error-panel"
          sx={{
            borderTop: '1px solid',
            borderColor: 'error.main',
            bgcolor: 'background.default',
            p: 1.5,
            maxHeight: 140,
            overflowY: 'auto',
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'error.main', display: 'block', mb: 0.5 }}>
            The whiteboard rejects your marker:
          </Typography>
          {errors.map((error, i) => (
            <Typography key={i} variant="caption" sx={{ display: 'block', fontFamily: 'monospace', color: 'error.main' }}>
              {error.line != null ? `Line ${error.line}${error.column != null ? `:${error.column}` : ''} — ` : ''}
              {error.message}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );

  const diagramPane = (
    <Box sx={{ height: '100%', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      <PaneHeader label="Diagram" />
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <DiagramCanvas
          tables={result?.tables ?? []}
          refs={result?.refs ?? []}
          positions={positions}
          onMove={handleMove}
        />
      </Box>
    </Box>
  );

  const sqlPane = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0 }}>
      <PaneHeader label="PostgreSQL">
        <Button
          size="small"
          variant="outlined"
          onClick={handleCopy}
          disabled={!sql}
          startIcon={copied ? <Check size={14} /> : <Copy size={14} />}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={handleDownload}
          disabled={!sql}
          startIcon={<Download size={14} />}
        >
          .sql
        </Button>
        {onSendToSandbox && (
          <Button
            size="small"
            variant="contained"
            onClick={() => onSendToSandbox(sql)}
            disabled={!sql}
            startIcon={<Rocket size={14} />}
          >
            Deploy to sandbox
          </Button>
        )}
      </PaneHeader>
      <Box
        component="pre"
        data-testid="sql-output"
        sx={{
          flex: 1,
          m: 0,
          p: 2,
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: 13,
          lineHeight: 1.6,
          color: 'text.primary',
          bgcolor: 'transparent',
          minHeight: 0,
        }}
      >
        {sql || '-- Waiting for parsable DBML. The intern is on it.'}
      </Box>
    </Box>
  );

  if (isMobile) {
    const panes = [editorPane, diagramPane, sqlPane];
    return (
      <Card elevation={8} sx={{ overflow: 'hidden' }}>
        <Tabs
          value={mobileTab}
          onChange={(_, value: number) => setMobileTab(value)}
          variant="fullWidth"
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        >
          <Tab label="DBML" />
          <Tab label="Diagram" />
          <Tab label="SQL" />
        </Tabs>
        <Box sx={{ height: 480 }}>{panes[mobileTab]}</Box>
      </Card>
    );
  }

  return (
    <Card elevation={8} sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr)',
          height: 640,
          '& > * + *': { borderLeft: '1px solid', borderColor: 'divider' },
        }}
      >
        {editorPane}
        {diagramPane}
        {sqlPane}
      </Box>
    </Card>
  );
}

export default function DbDesigner() {
  return (
    <Box className="min-h-screen pt-32 pb-20 px-6" sx={{ bgcolor: 'background.default' }}>
      <SEO
        title="Whiteboard Architect"
        description="Drag boxes around a fake whiteboard until they become CREATE TABLE statements. Enterprise-ready, microservices sold separately."
      />
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
            Whiteboard Architect
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Type DBML, drag boxes, receive PostgreSQL. Just like the architecture meeting, but something ships.
          </Typography>
        </Box>
        <DbDesignerTool />
      </Box>
    </Box>
  );
}
