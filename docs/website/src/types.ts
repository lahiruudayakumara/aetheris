export interface DocPage {
  key: string; // e.g., 'getting-started/installation'
  category: string; // e.g., 'getting-started'
  title: string; // e.g., 'Installation Guide'
  content: string; // Raw markdown text
}

export type ViewType = 'landing' | 'docs';
export type LanguageTab = 'ts' | 'go' | 'csharp';
