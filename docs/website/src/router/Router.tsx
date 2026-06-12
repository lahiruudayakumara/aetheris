import { useState, useEffect, useRef } from 'react';
import { Home } from '../pages/Home';
import { Docs } from '../pages/Docs';
import { FeedbackModal } from '../components/FeedbackModal';
import { useDocs } from '../hooks/useDocs';
import type { DocPage } from '../types';
import { Sun, Moon, Menu, X, MessageSquareShare } from 'lucide-react';

export const Router = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [hash, setHash] = useState(window.location.hash || '#/');
  const [headings, setHeadings] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<DocPage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { sortedDocs, groupedDocs, categoryMeta, selectedPage, selectPageByKey } = useDocs();

  // Parse hash routing
  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync state with parsed hash
  useEffect(() => {
    if (hash.startsWith('#/docs/')) {
      const docPath = hash.replace('#/docs/', '');
      const docKey = docPath.split('#')[0];
      
      // Scroll to top only if navigating to a new page
      if (selectedPage.key !== docKey) {
        window.scrollTo(0, 0);
      }
      selectPageByKey(docKey);
    }
  }, [hash, selectedPage.key]);

  // Dark/Light Mode toggle
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Quick navigation
  const selectPageAndNavigate = (key: string) => {
    window.location.hash = `#/docs/${key}`;
    setIsSidebarOpen(false);
    setSearchQuery('');
  };

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const results = sortedDocs.filter(
      (page) =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results.slice(0, 5));
  }, [searchQuery, sortedDocs]);

  // Hotkey CMD/CTRL + K for search focus
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isDocsView = hash.startsWith('#/docs');

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo-container" onClick={() => { window.location.hash = '#/'; }}>
          <div className="logo-icon">Æ</div>
          <span>Aetheris</span>
        </div>

        <nav className="header-nav">
          <span 
            className={`header-link ${!isDocsView ? 'active' : ''}`}
            onClick={() => { window.location.hash = '#/'; }}
          >
            Home
          </span>
          <a href="#features" className="header-link" onClick={() => { window.location.hash = '#/'; }}>Features</a>
          <a href="#community" className="header-link" onClick={() => { window.location.hash = '#/'; }}>Community</a>
          <span 
            className={`header-link ${isDocsView ? 'active' : ''}`}
            onClick={() => { window.location.hash = `#/docs/${selectedPage.key || sortedDocs[0]?.key}`; }}
          >
            Docs
          </span>
        </nav>

        <div className="header-right">
          {isDocsView && (
            <div className="search-wrapper">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-shortcut">⌘K</span>
              {searchResults.length > 0 && (
                <div className="search-results-overlay">
                  {searchResults.map((result) => (
                    <div
                      key={result.key}
                      className="search-result-item"
                      onClick={() => selectPageAndNavigate(result.key)}
                    >
                      <div className="search-result-title">{result.title}</div>
                      <div className="search-result-preview">{result.content.substring(0, 60)}...</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button className="cta-btn flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
            <MessageSquareShare size={16} />
            <span>Submit Feedback</span>
          </button>

          {isDocsView && (
            <button className="icon-btn mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </header>

      {/* Router views */}
      {!isDocsView ? (
        <Home 
          onNavigateToDocs={() => { window.location.hash = `#/docs/${selectedPage.key || sortedDocs[0]?.key}`; }}
          onRequestFeedback={() => setIsModalOpen(true)}
        />
      ) : (
        <Docs 
          groupedDocs={groupedDocs}
          categoryMeta={categoryMeta}
          selectedPage={selectedPage}
          selectPageByKey={selectPageAndNavigate}
          headings={headings}
          setHeadings={setHeadings}
          isSidebarOpen={isSidebarOpen}
        />
      )}

      {/* Feedback modal */}
      {isModalOpen && (
        <FeedbackModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
export default Router;
