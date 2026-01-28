import { useState, useRef } from 'react';
import {
  Copy, Bold, Italic, Strikethrough, Code, Check,
  List, ListOrdered, Quote, Terminal
} from 'lucide-react';
import SEO from '../../components/SEO';

export default function WhatsAppFormatter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[var(--bg-primary)]">
      <SEO
        title="Boomer Text Gen"
        description="Write formatting text for WhatsApp easily using this WYSIWYG editor."
      />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Boomer Text Gen</h1>
          <p className="text-[var(--text-secondary)]">
            Write with style. Perfect for urgent family group announcements.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            {/* Inline Styles */}
            <div className="flex bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-1">
              <button onClick={() => applyFormat('*')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Bold">
                <Bold className="w-4 h-4" />
              </button>
              <button onClick={() => applyFormat('_')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Italic">
                <Italic className="w-4 h-4" />
              </button>
              <button onClick={() => applyFormat('~')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Strike">
                <Strikethrough className="w-4 h-4" />
              </button>
              <button onClick={() => applyFormat('`')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Monospace">
                <Code className="w-4 h-4" />
              </button>
            </div>

            {/* Block Styles */}
            <div className="flex bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-1">
              <button onClick={() => applyFormat('- ', 'block')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Bulleted List">
                <List className="w-4 h-4" />
              </button>
              <button onClick={() => applyFormat('1. ', 'block')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Numbered List">
                <ListOrdered className="w-4 h-4" />
              </button>
              <button onClick={() => applyFormat('> ', 'block')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Quote">
                <Quote className="w-4 h-4" />
              </button>
              <button onClick={() => applyFormat('```', 'wrap')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Code Block">
                <Terminal className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1"></div>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-brand-red text-white hover:bg-red-700'
                }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Editor Area */}
          <div className="grid md:grid-cols-2 h-[500px] divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-full p-4 bg-transparent resize-none focus:outline-none text-[var(--text-primary)] font-sans leading-relaxed"
            />
            <div className="w-full h-full bg-[var(--bg-secondary)] p-4 overflow-y-auto">
              {/* WhatsApp-like Bubble */}
              <div className="bg-white dark:bg-[#005c4b] p-3 rounded-lg rounded-tl-none shadow-sm inline-block max-w-[90%] relative">
                <div className="text-[var(--text-primary)] dark:text-white leading-relaxed whitespace-pre-wrap break-words">
                  {renderPreview(text)}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-[#8696a0] text-right mt-1 select-none">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
