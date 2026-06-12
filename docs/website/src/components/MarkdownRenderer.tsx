import React, { useEffect } from 'react';
import { CopyButton } from './CopyButton';

interface MarkdownRendererProps {
  content: string;
  onHeadingsDetected: (headings: string[]) => void;
}

// Simple regex syntax highlighting function
export const highlightCode = (code: string, language: string): React.ReactNode => {
  if (language === 'typescript' || language === 'ts' || language === 'javascript' || language === 'js') {
    const keywords = /\b(const|let|var|function|return|import|from|export|default|class|constructor|new|extends|interface|string|number|boolean|void)\b/g;
    const strings = /("[^"]*"|'[^']*'|`[^`]*`)/g;
    const comments = /(\/\/.*)/g;
    const methods = /\b(route|connectionString|Database|Gateway|Service|Function)\b/g;

    let temp = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const stringMatches: string[] = [];
    temp = temp.replace(strings, (match) => {
      stringMatches.push(match);
      return `___STR_${stringMatches.length - 1}___`;
    });

    const commentMatches: string[] = [];
    temp = temp.replace(comments, (match) => {
      commentMatches.push(match);
      return `___COM_${commentMatches.length - 1}___`;
    });

    temp = temp.replace(keywords, '<span style="color: #ff7b72;">$1</span>');
    temp = temp.replace(methods, '<span style="color: #79c0ff;">$1</span>');

    stringMatches.forEach((val, i) => {
      temp = temp.replace(`___STR_${i}___`, `<span style="color: #a5d6ff;">${val}</span>`);
    });
    commentMatches.forEach((val, i) => {
      temp = temp.replace(`___COM_${i}___`, `<span style="color: #8b949e; font-style: italic;">${val}</span>`);
    });

    return <code className="code-block" dangerouslySetInnerHTML={{ __html: temp }} />;
  }

  if (language === 'bash' || language === 'sh' || language === 'text') {
    const commands = /\b(aetheris|npm|yarn|pnpm|curl)\b/g;
    let temp = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(commands, '<span style="color: #79c0ff; font-weight: 600;">$1</span>');
    return <code className="code-block" dangerouslySetInnerHTML={{ __html: temp }} />;
  }

  return <code className="code-block">{code}</code>;
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onHeadingsDetected }) => {
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  const headingsList: string[] = [];

  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLang = '';
  let inList = false;
  let listItems: React.ReactNode[] = [];

  const parseInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*.*?\*\*|`.*?`|\*.*?\*|\[.*?\]\(.*?\))/g;
    const matches = text.split(regex);

    matches.forEach((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        parts.push(<strong key={idx} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>);
      } else if (part.startsWith('`') && part.endsWith('`')) {
        parts.push(<code className="inline-code" key={idx}>{part.slice(1, -1)}</code>);
      } else if (part.startsWith('*') && part.endsWith('*')) {
        parts.push(<em key={idx}>{part.slice(1, -1)}</em>);
      } else if (part.startsWith('[') && part.includes('](')) {
        const linkText = part.substring(1, part.indexOf(']'));
        const linkUrl = part.substring(part.indexOf('](') + 2, part.length - 1);
        parts.push(
          <a key={idx} href={linkUrl} style={{ color: 'var(--accent-primary)', textDecoration: 'none' }} target="_blank" rel="noreferrer">
            {linkText}
          </a>
        );
      } else {
        parts.push(part);
      }
    });

    return parts;
  };

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      renderedElements.push(<ul key={`list-${key}`}>{...listItems}</ul>);
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        const blockCode = codeBlockContent.join('\n');
        
        if (codeBlockLang === 'mermaid') {
          renderedElements.push(
            <div key={`mermaid-${index}`} className="mermaid-container">
              <svg width="100%" height="180" viewBox="0 0 500 180" style={{ maxWidth: '400px' }}>
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <rect x="10" y="70" width="120" height="40" rx="8" fill="url(#grad1)" />
                <text x="70" y="95" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">TypeScript/Go Source</text>
                
                <path d="M 130 90 L 160 90" stroke="var(--text-muted)" strokeWidth="2" />
                
                <rect x="170" y="70" width="130" height="40" rx="8" fill="var(--bg-tertiary)" stroke="var(--border-color)" />
                <text x="235" y="95" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">Aetheris Compiler</text>
                
                <path d="M 300 90 L 330 90" stroke="var(--text-muted)" strokeWidth="2" />
                
                <rect x="340" y="70" width="130" height="40" rx="8" fill="var(--bg-tertiary)" stroke="var(--border-color)" />
                <text x="405" y="95" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">Cloud Engines (AWS/K8s)</text>
              </svg>
            </div>
          );
        } else {
          renderedElements.push(
            <div className="code-block-container" key={`code-${index}`}>
              <div className="code-header">
                <span>{codeBlockLang || 'text'}</span>
                <CopyButton text={blockCode} />
              </div>
              <pre className="code-block">
                {highlightCode(blockCode, codeBlockLang)}
              </pre>
            </div>
          );
        }
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeBlockLang = line.slice(3).trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      inList = true;
      listItems.push(<li key={`li-${index}`}>{parseInline(line.substring(2))}</li>);
      return;
    } else if (line.trim() === '') {
      flushList(index);
      return;
    } else if (inList) {
      flushList(index);
    }

    if (line.startsWith('# ')) {
      const text = line.substring(2).trim();
      headingsList.push(text);
      renderedElements.push(<h1 key={`h1-${index}`}>{text}</h1>);
      return;
    }

    if (line.startsWith('## ')) {
      const text = line.substring(3).trim();
      headingsList.push(text);
      renderedElements.push(<h2 key={`h2-${index}`} id={text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{text}</h2>);
      return;
    }

    if (line.startsWith('### ')) {
      const text = line.substring(4).trim();
      renderedElements.push(<h3 key={`h3-${index}`}>{text}</h3>);
      return;
    }

    if (line.trim() !== '') {
      renderedElements.push(<p key={`p-${index}`}>{parseInline(line)}</p>);
    }
  });

  flushList(lines.length);

  useEffect(() => {
    onHeadingsDetected(headingsList);
  }, [content]);

  return <div className="markdown-body animate-fade-in">{renderedElements}</div>;
};
