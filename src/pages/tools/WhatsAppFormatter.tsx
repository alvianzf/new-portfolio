import { useState, useRef, type ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  Copy, Bold, Italic, Strikethrough, Code, Check,
  List, ListOrdered, Quote, Terminal, Send
} from 'lucide-react';
import { Box, Button, Card, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material';
import SEO from '../../components/SEO';

export default function WhatsAppFormatter() {
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [phone, setPhone] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const phoneDigits = phone.replace(/\D/g, '');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneDigits) return;
    window.open(`https://wa.me/${phoneDigits}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const applyFormat = (symbol: string, type: 'wrap' | 'block' = 'wrap') => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selectedText = text.substring(start, end);
    const before = text.substring(0, start);
    const after = text.substring(end);

    let newText = '';

    if (type === 'wrap') {
      // Check if already formatted (simple toggle)
      if (before.endsWith(symbol) && after.startsWith(symbol)) {
        // Remove formatting
        newText = before.slice(0, -symbol.length) + selectedText + after.slice(symbol.length);
        setText(newText);

        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = start - symbol.length;
            textareaRef.current.selectionEnd = end - symbol.length;
            textareaRef.current.focus();
          }
        }, 0);
      } else {
        // Add formatting
        newText = before + symbol + selectedText + symbol + after;
        setText(newText);

        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = start + symbol.length;
            textareaRef.current.selectionEnd = end + symbol.length;
            textareaRef.current.focus();
          }
        }, 0);
      }
    } else if (type === 'block') {
      // Handle block formatting (Lists, Quotes)
      const lines = selectedText.split('\n');
      let formattedText = '';

      if (symbol === '1. ') {
        formattedText = lines.map((line, i) => `${i + 1}. ${line}`).join('\n');
      } else {
        // Toggle logic for simple prefixes like "- " or "> "
        const allStarted = lines.every(line => line.startsWith(symbol));
        if (allStarted) {
          formattedText = lines.map(line => line.slice(symbol.length)).join('\n');
        } else {
          formattedText = lines.map(line => symbol + line).join('\n');
        }
      }

      newText = before + formattedText + after;
      setText(newText);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start;
          textareaRef.current.selectionEnd = start + formattedText.length;
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderPreview = (content: string) => {
    if (!content) return <span className="text-slate-400 italic">Preview will appear here...</span>;

    let html = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Block logic strictly for preview visualization
    // Note: This is an approximation.

    // Code Blocks
    html = html.replace(/```([\s\S]*?)```/g, '<div class="bg-gray-200 text-slate-800 p-2 rounded font-mono text-sm my-1 whitespace-pre-wrap">$1</div>');

    // Inline Code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-200 text-red-500 px-1 rounded font-mono text-sm">$1</code>');

    // Bold *text*
    html = html.replace(/\*([^*<]+)\*/g, '<strong>$1</strong>');

    // Italic _text_
    html = html.replace(/_([^_<]+)_/g, '<em>$1</em>');

    // Strikethrough ~text~
    html = html.replace(/~([^~<]+)~/g, '<del>$1</del>');

    // Quotes (simple generic handle)
    html = html.replace(/^&gt; (.*$)/gm, '<div class="border-l-4 border-slate-400 pl-2 text-slate-500 italic">$1</div>');

    // Lists (visualization only)
    html = html.replace(/^- (.*$)/gm, '• $1');

    // Line breaks
    html = html.replace(/\n/g, '<br/>');

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const inlineTools: Array<{ title: string; symbol: string; type?: 'wrap' | 'block'; icon: ReactNode }> = [
    { title: 'Bold', symbol: '*', icon: <Bold className="w-4 h-4" /> },
    { title: 'Italic', symbol: '_', icon: <Italic className="w-4 h-4" /> },
    { title: 'Strike', symbol: '~', icon: <Strikethrough className="w-4 h-4" /> },
    { title: 'Monospace', symbol: '`', icon: <Code className="w-4 h-4" /> },
  ];

  const blockTools: Array<{ title: string; symbol: string; type: 'wrap' | 'block'; icon: ReactNode }> = [
    { title: 'Bulleted List', symbol: '- ', type: 'block', icon: <List className="w-4 h-4" /> },
    { title: 'Numbered List', symbol: '1. ', type: 'block', icon: <ListOrdered className="w-4 h-4" /> },
    { title: 'Quote', symbol: '> ', type: 'block', icon: <Quote className="w-4 h-4" /> },
    { title: 'Code Block', symbol: '```', type: 'wrap', icon: <Terminal className="w-4 h-4" /> },
  ];

  return (
    <Box className="min-h-screen pt-32 pb-20 px-6" sx={{ bgcolor: 'background.default' }}>
      <SEO
        title="Boomer Text Gen"
        description="Write formatting text for WhatsApp easily using this WYSIWYG editor."
      />

      <Box sx={{ maxWidth: 672, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>Boomer Text Gen</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Write with style. Perfect for urgent family group announcements.
          </Typography>
        </Box>

        <Card elevation={8} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          {/* Toolbar */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0.5, p: 1.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
            {/* Inline Styles */}
            <Paper variant="outlined" sx={{ display: 'flex', borderRadius: 2, p: 0.5 }}>
              {inlineTools.map(tool => (
                <Tooltip key={tool.title} title={tool.title}>
                  <IconButton size="small" onClick={() => applyFormat(tool.symbol)} sx={{ width: 40, height: 40, borderRadius: 1, color: 'text.secondary' }}>
                    {tool.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Paper>

            {/* Block Styles */}
            <Paper variant="outlined" sx={{ display: 'flex', borderRadius: 2, p: 0.5 }}>
              {blockTools.map(tool => (
                <Tooltip key={tool.title} title={tool.title}>
                  <IconButton size="small" onClick={() => applyFormat(tool.symbol, tool.type)} sx={{ width: 40, height: 40, borderRadius: 1, color: 'text.secondary' }}>
                    {tool.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Paper>

            <Button
              onClick={handleCopy}
              variant="contained"
              startIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              sx={{
                fontWeight: 'bold',
                ml: { sm: 'auto' },
                width: { xs: '100%', sm: 'auto' },
                ...(copied && {
                  bgcolor: '#dcfce7',
                  color: '#15803d',
                  '&:hover': { bgcolor: '#dcfce7' },
                }),
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </Box>

          {/* Editor Area */}
          <Box className="grid md:grid-cols-2 h-[500px]" sx={{ '& > *': { borderColor: 'divider' } }}>
            <TextField
              multiline
              inputRef={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message here..."
              sx={{
                width: '100%',
                height: '100%',
                borderRight: { md: '1px solid' },
                borderBottom: { xs: '1px solid', md: 'none' },
                borderColor: { xs: 'divider', md: 'divider' },
                '& .MuiInputBase-root': {
                  height: '100%',
                  alignItems: 'flex-start',
                  p: 0,
                  borderRadius: 0,
                  bgcolor: 'transparent',
                },
                '& .MuiInputBase-input': {
                  height: '100% !important',
                  overflow: 'auto !important',
                  color: 'text.primary',
                  lineHeight: 1.625,
                  p: 2,
                },
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}
            />
            <div className="w-full h-full bg-[var(--bg-secondary)] p-4 overflow-y-auto">
              {/* WhatsApp-like Bubble */}
              <Box
                sx={{
                  p: 1.5,
                  boxShadow: 1,
                  display: 'inline-block',
                  maxWidth: '90%',
                  position: 'relative',
                  ...(theme === 'cyberpunk'
                    ? {
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                        borderRadius: 0,
                        border: '1px solid',
                        borderColor: 'divider',
                      }
                    : theme === 'dark'
                      ? { bgcolor: '#005c4b', color: '#ffffff', borderRadius: 2, borderTopLeftRadius: 0 }
                      : { bgcolor: '#dcf8c6', color: '#111b21', borderRadius: 2, borderTopLeftRadius: 0 }),
                }}
              >
                <div className="leading-relaxed whitespace-pre-wrap break-words">
                  {renderPreview(text)}
                </div>
                <Box
                  sx={{
                    fontSize: 10,
                    textAlign: 'right',
                    mt: 0.5,
                    userSelect: 'none',
                    color: theme === 'cyberpunk' ? 'text.secondary' : theme === 'dark' ? '#8696a0' : '#667781',
                  }}
                >
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Box>
              </Box>
            </div>
          </Box>
        </Card>

        {/* Send directly via WhatsApp */}
        <Paper
          component="form"
          onSubmit={handleSend}
          variant="outlined"
          sx={{ mt: 3, p: 2.5, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 2 }}
        >
          <TextField
            label="WhatsApp number"
            placeholder="6281234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            helperText="Start with the country code, no + (Indonesia is 62)"
            slotProps={{ htmlInput: { inputMode: 'numeric' } }}
            sx={{ flex: 1, minWidth: 240 }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!phoneDigits}
            startIcon={<Send className="w-4 h-4" />}
            sx={{ fontWeight: 'bold', py: 1.5, width: { xs: '100%', sm: 'auto' } }}
          >
            Send it to the family
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
