import { useState, useRef } from 'react';
import { Copy, Bold, Italic, Strikethrough, Code, Check } from 'lucide-react';
import SEO from '../../components/SEO';

export default function WhatsAppFormatter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (symbol: string) => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selectedText = text.substring(start, end);
    const before = text.substring(0, start);
    const after = text.substring(end);

    let newText = '';

    // Check if already formatted (simple toggle)
    if (before.endsWith(symbol) && after.startsWith(symbol)) {
      // Remove formatting
      newText = before.slice(0, -symbol.length) + selectedText + after.slice(symbol.length);
      setText(newText);

      // Restore selection
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

      // Restore selection
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + symbol.length;
          textareaRef.current.selectionEnd = end + symbol.length; // + symbol.length if we want cursor inside
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

    // Very basic parser for visualization
    // Note: This is purely for display purposes and might not handle nested complex cases perfectly
    let html = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    // Bold *text*
    html = html.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

    // Italic _text_
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Strikethrough ~text~
    html = html.replace(/~([^~]+)~/g, '<del>$1</del>');

    // Monospace ```text```
    html = html.replace(/```([^`]+)```/g, '<code class="bg-gray-200 text-red-500 px-1 rounded font-mono text-sm">$1</code>');

    // Line breaks
    html = html.replace(/\n/g, '<br/>');

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[var(--bg-primary)]">
      <SEO
        title="WhatsApp Formatter"
        description="Write formatting text for WhatsApp easily using this WYSIWYG editor."
      />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">WhatsApp Formatter</h1>
          <p className="text-[var(--text-secondary)]">
            Write with style. Bold, Italic, Strikethrough, and Monospace made easy.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-2 p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <button
              onClick={() => applyFormat('*')}
              className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors tooltip"
              title="Bold (*text*)"
            >
              <Bold className="w-5 h-5" />
            </button>
            <button
              onClick={() => applyFormat('_')}
              className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Italic (_text_)"
            >
              <Italic className="w-5 h-5" />
            </button>
            <button
              onClick={() => applyFormat('~')}
              className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Strikethrough (~text~)"
            >
              <Strikethrough className="w-5 h-5" />
            </button>
            <button
              onClick={() => applyFormat('```')}
              className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Monospace (```text```)"
            >
              <Code className="w-5 h-5" />
            </button>

            <div className="flex-1"></div>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-brand-red text-white hover:bg-red-700'
                }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Text'}
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
