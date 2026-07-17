import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box, Button, Card, Chip, CircularProgress, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { Play, RotateCcw, Database, History } from 'lucide-react';
import type { PGlite, Results } from '@electric-sql/pglite';
import SEO from '../../components/SEO';
import { SEED_SQL, EXAMPLE_QUERIES, DEFAULT_QUERY } from '../../components/tools/pg/seed';

const MAX_DISPLAY_ROWS = 500;

type BootStatus = 'booting' | 'ready' | 'error';

type Outcome =
  | { kind: 'results'; results: Results[]; ms: number }
  | { kind: 'error'; message: string; ms: number };

interface HistoryEntry {
  sql: string;
  ok: boolean;
  at: string;
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return 'NULL';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function StatementResult({ result, index }: { result: Results; index: number }) {
  const isSelect = result.fields.length > 0;
  const rows = result.rows as Record<string, unknown>[];
  const shown = rows.slice(0, MAX_DISPLAY_ROWS);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
        Statement {index + 1}
      </Typography>
      {isSelect ? (
        <>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ maxHeight: 360, mt: 0.5, bgcolor: 'background.paper' }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  {result.fields.map((f, i) => (
                    <TableCell
                      key={`${f.name}-${i}`}
                      sx={{ fontWeight: 'bold', fontFamily: 'monospace', whiteSpace: 'nowrap', bgcolor: 'background.paper' }}
                    >
                      {f.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {shown.map((row, r) => (
                  <TableRow key={r} hover>
                    {result.fields.map((f, c) => (
                      <TableCell
                        key={c}
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: 13,
                          whiteSpace: 'nowrap',
                          color: row[f.name] === null || row[f.name] === undefined ? 'text.secondary' : 'text.primary',
                          fontStyle: row[f.name] === null || row[f.name] === undefined ? 'italic' : 'normal',
                        }}
                      >
                        {formatCell(row[f.name])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {shown.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={result.fields.length} sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                      0 rows. Technically a success.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {rows.length} row{rows.length === 1 ? '' : 's'}
            {rows.length > MAX_DISPLAY_ROWS &&
              ` (showing first ${MAX_DISPLAY_ROWS} — nobody scrolls further anyway)`}
          </Typography>
        </>
      ) : (
        <Paper variant="outlined" sx={{ p: 1.5, mt: 0.5, bgcolor: 'background.paper' }}>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 14, color: 'text.primary' }}>
            OK{typeof result.affectedRows === 'number' && result.affectedRows > 0
              ? ` — ${result.affectedRows} row${result.affectedRows === 1 ? '' : 's'} affected`
              : ''}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export interface PostgresSandboxToolProps {
  /** When provided/changed, this SQL is loaded into the editor (e.g. from the DBML designer). */
  initialSql?: string;
}

export function PostgresSandboxTool({ initialSql }: PostgresSandboxToolProps) {
  const dbRef = useRef<PGlite | null>(null);
  const genRef = useRef(0);
  const [boot, setBoot] = useState<BootStatus>('booting');
  const [bootError, setBootError] = useState('');
  const [sql, setSql] = useState(DEFAULT_QUERY);
  const [running, setRunning] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const bootDb = useCallback(async () => {
    const gen = ++genRef.current;
    dbRef.current?.close();
    dbRef.current = null;
    setBoot('booting');
    setOutcome(null);
    try {
      const { PGlite } = await import('@electric-sql/pglite');
      const db = new PGlite(); // in-memory: gone when the tab closes, like your motivation
      await db.exec(SEED_SQL);
      if (gen !== genRef.current) {
        db.close();
        return;
      }
      dbRef.current = db;
      setBoot('ready');
    } catch (err) {
      if (gen === genRef.current) {
        setBootError(err instanceof Error ? err.message : String(err));
        setBoot('error');
      }
    }
  }, []);

  useEffect(() => {
    bootDb();
    return () => {
      genRef.current++;
      dbRef.current?.close();
      dbRef.current = null;
    };
  }, [bootDb]);

  useEffect(() => {
    if (initialSql !== undefined) setSql(initialSql);
  }, [initialSql]);

  const run = useCallback(async (text?: string) => {
    const db = dbRef.current;
    const query = (text ?? sql).trim();
    if (!db || !query) return;
    setRunning(true);
    const t0 = performance.now();
    try {
      const results = await db.exec(query);
      setOutcome({ kind: 'results', results, ms: performance.now() - t0 });
      setHistory((h) => [
        { sql: query, ok: true, at: new Date().toLocaleTimeString() },
        ...h,
      ].slice(0, 50));
    } catch (err) {
      setOutcome({
        kind: 'error',
        message: err instanceof Error ? err.message : String(err),
        ms: performance.now() - t0,
      });
      setHistory((h) => [
        { sql: query, ok: false, at: new Date().toLocaleTimeString() },
        ...h,
      ].slice(0, 50));
    } finally {
      setRunning(false);
    }
  }, [sql]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!running && boot === 'ready') run();
    }
  };

  if (boot === 'booting') {
    return (
      <Card elevation={8} sx={{ borderRadius: 4, p: 6, textAlign: 'center' }}>
        <CircularProgress size={32} />
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          Provisioning your very own prod database to destroy…
        </Typography>
      </Card>
    );
  }

  if (boot === 'error') {
    return (
      <Card elevation={8} sx={{ borderRadius: 4, p: 4 }}>
        <Typography sx={{ color: 'error.main', fontWeight: 'bold', mb: 1 }}>
          The database refused to exist.
        </Typography>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 13, color: 'text.secondary', mb: 2 }}>
          {bootError}
        </Typography>
        <Button variant="contained" onClick={bootDb} startIcon={<RotateCcw size={16} />}>
          Try again
        </Button>
      </Card>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 300px' },
        alignItems: 'start',
      }}
    >
      {/* Main column: editor + results */}
      <Box sx={{ minWidth: 0 }}>
        <Card elevation={8} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap',
              p: 1.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.default',
            }}
          >
            <Database size={18} />
            <Typography sx={{ fontWeight: 'bold', color: 'text.primary', mr: 'auto' }}>
              SQL Editor
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}>
              {navigator.platform.toLowerCase().includes('mac') ? '⌘' : 'Ctrl'}+Enter to run
            </Typography>
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<RotateCcw size={14} />}
              onClick={bootDb}
            >
              Reset Database
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={running ? <CircularProgress size={14} color="inherit" /> : <Play size={14} />}
              disabled={running}
              onClick={() => run()}
              data-testid="run-query"
            >
              Run
            </Button>
          </Box>
          <Box
            component="textarea"
            value={sql}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSql(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            placeholder="SELECT courage FROM developers WHERE deadline < now();"
            aria-label="SQL editor"
            data-testid="sql-editor"
            sx={{
              display: 'block',
              width: '100%',
              minHeight: { xs: 160, md: 220 },
              resize: 'vertical',
              border: 'none',
              outline: 'none',
              p: 2,
              m: 0,
              fontFamily: '"Fira Code", "JetBrains Mono", Menlo, monospace',
              fontSize: 14,
              lineHeight: 1.6,
              bgcolor: 'background.paper',
              color: 'text.primary',
              '&::placeholder': { color: 'text.secondary', opacity: 0.6 },
            }}
          />
        </Card>

        {/* Results */}
        <Box sx={{ mt: 3 }}>
          {outcome === null && (
            <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', px: 1 }}>
              Results appear here. So do consequences, briefly.
            </Typography>
          )}
          {outcome?.kind === 'error' && (
            <Paper
              variant="outlined"
              data-testid="query-error"
              sx={{
                p: 2,
                borderColor: 'error.main',
                bgcolor: 'background.paper',
                borderLeft: '4px solid',
                borderLeftColor: 'error.main',
              }}
            >
              <Typography sx={{ color: 'error.main', fontWeight: 'bold', mb: 0.5 }}>
                Postgres has opinions about that query
              </Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: 13, whiteSpace: 'pre-wrap', color: 'text.primary' }}>
                {outcome.message}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Failed in {outcome.ms.toFixed(1)} ms — at least it was quick.
              </Typography>
            </Paper>
          )}
          {outcome?.kind === 'results' && (
            <Box data-testid="query-results">
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                {outcome.results.length} statement{outcome.results.length === 1 ? '' : 's'} in {outcome.ms.toFixed(1)} ms
              </Typography>
              {outcome.results.map((res, i) => (
                <StatementResult key={i} result={res} index={i} />
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Side column: examples + history */}
      <Box sx={{ minWidth: 0, display: 'grid', gap: 3 }}>
        <Card elevation={4} sx={{ borderRadius: 4, p: 2 }}>
          <Typography sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1.5 }}>
            Queries you can pretend you wrote
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {EXAMPLE_QUERIES.map((ex) => (
              <Chip
                key={ex.label}
                label={ex.label}
                onClick={() => {
                  setSql(ex.sql);
                  run(ex.sql);
                }}
                sx={{
                  justifyContent: 'flex-start',
                  height: 'auto',
                  py: 0.75,
                  '& .MuiChip-label': { whiteSpace: 'normal' },
                }}
              />
            ))}
          </Box>
        </Card>

        <Card elevation={4} sx={{ borderRadius: 4, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <History size={16} />
            <Typography sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              Evidence log
            </Typography>
          </Box>
          {history.length === 0 ? (
            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              No queries yet. Your record is clean. Enjoy it while it lasts.
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: 320, overflowY: 'auto' }}>
              {history.map((h, i) => (
                <Paper
                  key={i}
                  variant="outlined"
                  onClick={() => setSql(h.sql)}
                  sx={{
                    p: 1,
                    cursor: 'pointer',
                    borderLeft: '3px solid',
                    borderLeftColor: h.ok ? 'success.main' : 'error.main',
                    '&:hover': { borderColor: 'primary.main' },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: 12,
                      color: 'text.primary',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h.sql.replace(/\s+/g, ' ')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {h.at} · {h.ok ? 'worked' : 'did not work'}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
        </Card>
      </Box>
    </Box>
  );
}

export default function PostgresSandbox() {
  return (
    <Box className="min-h-screen pt-32 pb-20 px-6" sx={{ bgcolor: 'background.default' }}>
      <SEO
        title="Consequence-Free Database"
        description="A real PostgreSQL running entirely in your browser. Practice DROP TABLE without updating your resume — everything is wiped when you close the tab, just like staging."
      />
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
            Consequence-Free Database
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Real PostgreSQL, in your browser, in memory. Run DROP TABLE like nobody&apos;s watching — because nobody is, and it&apos;s gone when you close the tab anyway.
          </Typography>
        </Box>
        <PostgresSandboxTool />
      </Box>
    </Box>
  );
}
