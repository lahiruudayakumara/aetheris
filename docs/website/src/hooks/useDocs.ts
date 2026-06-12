import { useState } from 'react';
import type { DocPage } from '../types';

// Load markdown files dynamically from sibling directories using Vite glob
const mdFiles = import.meta.glob<{ default: string }>('../../../{introduction,getting-started,framework,cli,api-reference}/*.md', {
  query: '?raw',
  eager: true,
});

// Convert path to clean keys and metadata
const docsList: DocPage[] = Object.entries(mdFiles).map(([path, module]) => {
  // path is like "../../../getting-started/installation.md"
  const cleanPath = path.replace('../../../', '').replace('.md', '');
  const parts = cleanPath.split('/');
  const category = parts[0];
  const pageName = parts[1];

  // Extract title from the first # heading in markdown
  const markdownText = module.default;
  const titleMatch = markdownText.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return {
    key: cleanPath,
    category,
    title,
    content: markdownText,
  };
});

// Category ordering & names mapping
export const categoryMeta: Record<string, { label: string; order: number }> = {
  'introduction': { label: 'Introduction', order: 1 },
  'getting-started': { label: 'Getting Started', order: 2 },
  'framework': { label: 'Core Framework', order: 3 },
  'cli': { label: 'Command Line', order: 4 },
  'api-reference': { label: 'API Reference', order: 5 },
};

// Sort pages based on category order
export const sortedDocs = [...docsList].sort((a, b) => {
  const orderA = categoryMeta[a.category]?.order ?? 99;
  const orderB = categoryMeta[b.category]?.order ?? 99;
  if (orderA !== orderB) return orderA - orderB;
  return a.key.localeCompare(b.key);
});

export const useDocs = () => {
  const [selectedPage, setSelectedPage] = useState<DocPage>(sortedDocs[0] || { key: '', category: '', title: '', content: '' });

  const selectPageByKey = (key: string) => {
    const page = sortedDocs.find((d) => d.key === key);
    if (page) {
      setSelectedPage(page);
    }
  };

  // Group pages by category
  const groupedDocs = sortedDocs.reduce<Record<string, DocPage[]>>((acc, page) => {
    if (!acc[page.category]) acc[page.category] = [];
    acc[page.category].push(page);
    return acc;
  }, {});

  return {
    sortedDocs,
    groupedDocs,
    categoryMeta,
    selectedPage,
    selectPageByKey,
  };
};
