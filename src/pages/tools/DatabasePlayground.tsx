import { useState } from 'react';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import { DraftingCompass, Database } from 'lucide-react';
import SEO from '../../components/SEO';
import { DbDesignerTool } from './DbDesigner';
import { PostgresSandboxTool } from './PostgresSandbox';

export default function DatabasePlayground() {
  const [tab, setTab] = useState(0);
  const [pendingSql, setPendingSql] = useState<string | undefined>(undefined);

  const handleSendToSandbox = (sql: string) => {
    setPendingSql(sql);
    setTab(1);
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 16 }, pb: 10, bgcolor: 'background.default' }}>
      <SEO
        title="DBA Cosplay Kit"
        description="Drag boxes until they become CREATE TABLE, then run it on a real Postgres that can't hurt you. DROP TABLE without updating your resume."
        keywords={[
          'DBML Editor', 'Database Diagram', 'PostgreSQL Sandbox', 'SQL Playground',
          'CREATE TABLE Generator', 'ERD Tool', 'Learn SQL'
        ]}
      />

      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
            DBA Cosplay Kit
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Drag boxes, receive CREATE TABLE, then run it on a database with zero consequences.
          </Typography>
        </Box>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          centered
          sx={{ mb: 3, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}
        >
          <Tab icon={<DraftingCompass size={18} />} iconPosition="start" label="Whiteboard Architect" />
          <Tab icon={<Database size={18} />} iconPosition="start" label="Consequence-Free Database" />
        </Tabs>

        {/* Both stay mounted so the in-memory Postgres survives tab switches */}
        <Box sx={{ display: tab === 0 ? 'block' : 'none' }}>
          <DbDesignerTool onSendToSandbox={handleSendToSandbox} />
        </Box>
        <Box sx={{ display: tab === 1 ? 'block' : 'none' }}>
          <PostgresSandboxTool initialSql={pendingSql} />
        </Box>
      </Container>
    </Box>
  );
}
