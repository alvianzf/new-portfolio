import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { KeyRound } from 'lucide-react';
import type { DiagramTable, Position } from './types';

export const CARD_WIDTH = 224;
export const HEADER_HEIGHT = 36;
export const ROW_HEIGHT = 26;

export function cardHeight(table: DiagramTable): number {
  return HEADER_HEIGHT + table.fields.length * ROW_HEIGHT;
}

/** Vertical center of a field row (or the header if the field is unknown). */
export function fieldAnchorY(table: DiagramTable, fieldName: string): number {
  const index = table.fields.findIndex((f) => f.name === fieldName);
  if (index === -1) return HEADER_HEIGHT / 2;
  return HEADER_HEIGHT + index * ROW_HEIGHT + ROW_HEIGHT / 2;
}

interface TableCardProps {
  table: DiagramTable;
  position: Position;
  onMove: (tableName: string, position: Position) => void;
}

export default function TableCard({ table, position, onMove }: TableCardProps) {
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Keep the canvas from panning while a card is being dragged.
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: position.x,
      originY: position.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    onMove(table.name, {
      x: drag.originX + (e.clientX - drag.startX),
      y: drag.originY + (e.clientY - drag.startY),
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === e.pointerId) dragRef.current = null;
  };

  return (
    <Box
      data-testid={`table-card-${table.name}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      sx={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: CARD_WIDTH,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        boxShadow: 3,
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
        '&:active': { cursor: 'grabbing' },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: HEADER_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          px: 1.5,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'monospace', color: 'inherit' }} noWrap>
          {table.name}
        </Typography>
      </Box>
      {table.fields.map((field) => (
        <Box
          key={field.name}
          sx={{
            height: ROW_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {field.pk && <KeyRound size={12} style={{ flexShrink: 0 }} aria-label="primary key" />}
          <Typography
            variant="caption"
            sx={{ fontFamily: 'monospace', color: 'text.primary', fontWeight: field.pk ? 700 : 400 }}
            noWrap
          >
            {field.name}
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', ml: 'auto' }} noWrap>
            {field.type}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
