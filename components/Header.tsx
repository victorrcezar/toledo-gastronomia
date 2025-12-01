import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center pt-28 md:pt-36 px-4 md:px-0">
       <img
          src="https://static.wixstatic.com/media/1f17f3_8f057925421a407ba0e642d5b1d238e4~mv2.jpg"
          alt="Chef Selma"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-6 border-4 border-card shadow-lg animate-fade-in-up"
          style={{ animationDelay: '100ms', animationDuration: '700ms', animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        />
       <div 
          className="text-xs md:text-sm font-semibold bg-card/70 border border-white/10 rounded-full px-4 py-1.5 inline-block mb-4 animate-fade-in-up backdrop-blur-md" 
          style={{ animationDelay: '300ms', animationDuration: '600ms', animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
       >
          Apresentação Consultiva Exclusiva
        </div>
      <h1 
        className="font-poppins text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight animate-fade-in-up" 
        style={{ animationDelay: '500ms', animationDuration: '800ms', animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        Selma, vamos construir seu
        <br className="hidden md:block" />
        <span className="md:hidden"> </span>
        plano para um negócio <span className="text-accent-gold">previsível</span>.
      </h1>
      <p 
        className="mt-6 text-text-secondary max-w-2xl mx-auto text-base md:text-xl leading-relaxed animate-fade-in-up" 
        style={{ animationDelay: '700ms', animationDuration: '800ms', animationTimingFunction: 'ease-out' }}
      >
        Nosso objetivo é te tirar da instabilidade de agenda e criar um funil de vendas que funciona todos os dias, fortalecendo sua marca e escalando seu faturamento.
      </p>
    </header>
  );
};

export default Header;