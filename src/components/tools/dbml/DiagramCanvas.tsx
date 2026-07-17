import { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TableCard, { CARD_WIDTH, fieldAnchorY } from './TableCard';
import type { DiagramRef, DiagramTable, Position } from './types';

interface DiagramCanvasProps {
  tables: DiagramTable[];
  refs: DiagramRef[];
  positions: Record<string, Position>;
  onMove: (tableName: string, position: Position) => void;
}

interface Edge {
  id: string;
  path: string;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  sourceLabel: string;
  targetLabel: string;
}

function buildEdge(
  ref: DiagramRef,
  tableByName: Map<string, DiagramTable>,
  positions: Record<string, Position>,
): Edge | null {
  const sourceTable = tableByName.get(ref.source.table);
  const targetTable = tableByName.get(ref.target.table);
  const sourcePos = positions[ref.source.table];
  const targetPos = positions[ref.target.table];
  if (!sourceTable || !targetTable || !sourcePos || !targetPos) return null;

  const sy = sourcePos.y + fieldAnchorY(sourceTable, ref.source.field);
  const ty = targetPos.y + fieldAnchorY(targetTable, ref.target.field);

  // Leave from the side of each card that faces the other card.
  const sourceCenter = sourcePos.x + CARD_WIDTH / 2;
  const targetCenter = targetPos.x + CARD_WIDTH / 2;
  const sourceExitsRight = targetCenter >= sourceCenter;
  const targetExitsRight = sourceCenter > targetCenter;

  const sx = sourceExitsRight ? sourcePos.x + CARD_WIDTH : sourcePos.x;
  const tx = targetExitsRight ? targetPos.x + CARD_WIDTH : targetPos.x;

  const bend = Math.max(40, Math.abs(tx - sx) / 2);
  const c1x = sx + (sourceExitsRight ? bend : -bend);
  const c2x = tx + (targetExitsRight ? bend : -bend);

  return {
    id: ref.id,
    path: `M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${ty}, ${tx} ${ty}`,
    sx,
    sy,
    tx,
    ty,
    sourceLabel: ref.source.relation,
    targetLabel: ref.target.relation,
  };
}

export default function DiagramCanvas({ tables, refs, positions, onMove }: DiagramCanvasProps) {
  const theme = useTheme();
  const [pan, setPan] = useState<Position>({ x: 0, y: 0 });
  const panRef = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    panRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: pan.x,
      originY: pan.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = panRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    setPan({ x: drag.originX + (e.clientX - drag.startX), y: drag.originY + (e.clientY - drag.startY) });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (panRef.current?.pointerId === e.pointerId) panRef.current = null;
  };

  const tableByName = new Map(tables.map((t) => [t.name, t]));
  const edges = refs
    .map((ref) => buildEdge(ref, tableByName, positions))
    .filter((edge): edge is Edge => edge !== null);

  const lineColor = theme.palette.primary.main;

  return (
    <Box
      data-testid="diagram-canvas"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        bgcolor: 'background.default',
        cursor: 'grab',
        touchAction: 'none',
        backgroundImage: `radial-gradient(${theme.palette.divider} 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    >
      {tables.length === 0 && (
        <Typography variant="body2" sx={{ color: 'text.secondary', p: 2 }}>
          No tables yet. The whiteboard is judging you.
        </Typography>
      )}
      <Box sx={{ position: 'absolute', top: 0, left: 0, transform: `translate(${pan.x}px, ${pan.y}px)` }}>
        <svg
          width={1}
          height={1}
          style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none' }}
        >
          {edges.map((edge) => (
            <g key={edge.id} data-testid="relationship-line">
              <path d={edge.path} fill="none" stroke={lineColor} strokeWidth={1.5} />
              <circle cx={edge.sx} cy={edge.sy} r={3} fill={lineColor} />
              <circle cx={edge.tx} cy={edge.ty} r={3} fill={lineColor} />
              <text
                x={edge.sx + (edge.sx > edge.tx ? 6 : -12)}
                y={edge.sy - 5}
                fontSize={10}
                fontFamily="monospace"
                fill={theme.palette.text.secondary}
              >
                {edge.sourceLabel}
              </text>
              <text
                x={edge.tx + (edge.tx > edge.sx ? 6 : -12)}
                y={edge.ty - 5}
                fontSize={10}
                fontFamily="monospace"
                fill={theme.palette.text.secondary}
              >
                {edge.targetLabel}
              </text>
            </g>
          ))}
        </svg>
        {tables.map((table) => {
          const position = positions[table.name];
          if (!position) return null;
          return <TableCard key={table.name} table={table} position={position} onMove={onMove} />;
        })}
      </Box>
    </Box>
  );
}
