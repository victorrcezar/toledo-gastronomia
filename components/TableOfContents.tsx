import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../types';

interface TableOfContentsProps {
  sections: Section[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '');
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const observer = useRef<IntersectionObserver>();
  const activeLinkRef = useRef<HTMLLIElement>(null);
  const closeAccordionTimeout = useRef<number>();


  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
           setActiveId(entry.target.id);
        }
      });
    };
    
    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0% 0px -80% 0px"
    });

    const elements = sections.map(s => document.getElementById(s.id)).filter(el => el);
    elements.forEach(el => observer.current?.observe(el!));

    return () => {
        observer.current?.disconnect();
        if (closeAccordionTimeout.current) {
            clearTimeout(closeAccordionTimeout.current);
        }
    }
  }, [sections]);

  useEffect(() => {
    if (isAccordionOpen && activeLinkRef.current) {
      setTimeout(() => {
        activeLinkRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 300); // Match transition duration for a smoother effect
    }
  }, [isAccordionOpen]);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    setActiveId(id);

    // Auto-close accordion after scroll animation finishes
    if (isAccordionOpen) {
        if (closeAccordionTimeout.current) {
            clearTimeout(closeAccordionTimeout.current);
        }
        closeAccordionTimeout.current = window.setTimeout(() => {
            setIsAccordionOpen(false);
        }, 700); // 700ms delay to allow scroll to complete
    }
  }

  const activeSection = sections.find(section => section.id === activeId) || sections[0];

  const NavLinks = () => (
    <ul className="space-y-1">
      {sections.map(section => (
        <li 
          key={section.id}
          ref={activeId === section.id ? activeLinkRef : null}
        >
          <a 
            href={`#${section.id}`}
            onClick={(e) => handleClick(e, section.id)}
            className={`flex items-center p-2 rounded-lg transition-all duration-200 ease-in-out ${
              activeId === section.id 
              ? 'bg-blue-50 text-brand-accent font-bold' 
              : 'text-brand-muted hover:text-brand-dark hover:bg-slate-50'
            }`}
          >
            <div className="flex-shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full block transition-all duration-200 ease-in-out ${
                activeId === section.id ? 'bg-brand-accent scale-125' : 'bg-slate-300'
                }`}></span>
            </div>
            <span className="ml-3 text-sm">{section.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-28 self-start w-64 flex-shrink-0 pr-8">
        <nav>
          <NavLinks />
        </nav>
      </aside>

      {/* Mobile Accordion */}
      <div className="lg:hidden mb-6">
        <div className="border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden">
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full flex justify-between items-center p-4 text-left font-poppins font-bold text-brand-dark"
            aria-expanded={isAccordionOpen}
            aria-controls="toc-accordion-panel"
          >
            <span className="truncate pr-2">{activeSection.emoji} {activeSection.title}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 text-brand-muted flex-shrink-0 ${isAccordionOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div 
            id="toc-accordion-panel"
            className={`overflow-y-auto transition-all duration-300 ease-in-out ${isAccordionOpen ? 'max-h-72' : 'max-h-0'}`}
          >
            <div className="p-4 border-t border-slate-200">
              <NavLinks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableOfContents;