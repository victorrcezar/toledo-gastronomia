import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 md:mt-32 text-center py-8 border-t border-white/10">
      <img 
        src="https://static.wixstatic.com/media/1f17f3_1e2b54d2fd894dd997c6cbc18e940576~mv2.png" 
        alt="UP! Company Logo"
        className="w-12 mx-auto mb-4"
      />
      <p className="text-sm text-text-secondary">
        © 2025 — UP! Company | Estratégia Digital & Performance
      </p>
    </footer>
  );
};

export default Footer;