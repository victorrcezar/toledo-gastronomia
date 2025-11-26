import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center pt-28 md:pt-36">
       <img
          src="https://static.wixstatic.com/media/1f17f3_8f057925421a407ba0e642d5b1d238e4~mv2.jpg"
          alt="Chef Selma"
          className="w-28 h-28 rounded-full mx-auto mb-6 border-4 border-card shadow-lg animate-fade-in-up"
          style={{ animationDelay: '150ms', animationDuration: '500ms' }}
        />
       <div className="text-sm font-semibold bg-card/70 border border-white/10 rounded-full px-4 py-1.5 inline-block mb-4 animate-fade-in-up" style={{ animationDelay: '300ms', animationDuration: '550ms' }}>
          Apresentação Consultiva Exclusiva
        </div>
      <h1 className="font-poppins text-4xl md:text-6xl font-bold text-text-primary leading-tight animate-fade-in-up" style={{ animationDelay: '400ms', animationDuration: '600ms' }}>
        Selma, vamos construir seu
        <br />
        plano para um negócio <span className="text-accent-gold">previsível</span>.
      </h1>
      <p className="mt-6 text-text-secondary max-w-2xl mx-auto text-lg md:text-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '550ms', animationDuration: '650ms' }}>
        Nosso objetivo é te tirar da instabilidade de agenda e criar um funil de vendas que funciona todos os dias, fortalecendo sua marca e escalando seu faturamento.
      </p>
    </header>
  );
};

export default Header;