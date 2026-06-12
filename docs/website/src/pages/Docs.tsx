import React from 'react';
import type { DocPage } from '../types';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

interface DocsProps {
  groupedDocs: Record<string, DocPage[]>;
  categoryMeta: Record<string, { label: string; order: number }>;
  selectedPage: DocPage;
  selectPageByKey: (key: string) => void;
  headings: string[];
  setHeadings: (headings: string[]) => void;
  isSidebarOpen: boolean;
}

export const Docs: React.FC<DocsProps> = ({
  groupedDocs,
  categoryMeta,
  selectedPage,
  selectPageByKey,
  headings,
  setHeadings,
  isSidebarOpen,
}) => {
  return (
    <div className="main-wrapper">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {Object.entries(groupedDocs).map(([catKey, pages]) => (
          <div key={catKey} className="nav-group">
            <div className="nav-group-title">{categoryMeta[catKey]?.label || catKey}</div>
            <ul className="nav-list">
              {pages.map((page) => (
                <li key={page.key} className="nav-item">
                  <span
                    className={`nav-link ${selectedPage.key === page.key ? 'active' : ''}`}
                    onClick={() => selectPageByKey(page.key)}
                  >
                    {page.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Content View */}
      <main className="content-container animate-fade-in">
        <MarkdownRenderer content={selectedPage.content} onHeadingsDetected={setHeadings} />
      </main>

      {/* Right Table of Contents */}
      {headings.length > 1 && (
        <aside className="toc-container">
          <div className="toc-title">On this page</div>
          <ul className="toc-list">
            {headings.map((heading) => {
              const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <li key={heading}>
                  <a href={`#/docs/${selectedPage.key}#${id}`} className="toc-link">
                    {heading}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
      )}
    </div>
  );
};
