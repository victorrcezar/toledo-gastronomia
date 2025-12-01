import React, { useState, useEffect, useRef } from 'react';
import { sectionsData } from './constants';
import { Section, JourneyStep, TimelineItem } from './types';
import Header from './components/Header';
import SectionCard from './components/SectionCard';
import Footer from './components/Footer';

// New component to encapsulate the journey timeline logic
const JourneyTimeline: React.FC<{ steps: JourneyStep[], isVisible: boolean }> = ({ steps, isVisible }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Ensure the refs array is the same size as the steps array
    stepRefs.current = stepRefs.current.slice(0, steps.length);
    const stepElements = stepRefs.current.filter((ref): ref is HTMLDivElement => ref !== null);

    if (stepElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Find the topmost visible entry to set as active
          const topmostVisibleEntry = visibleEntries.reduce((topmost, current) => {
            return current.boundingClientRect.top < topmost.boundingClientRect.top ? current : topmost;
          });
          
          const index = stepElements.findIndex(el => el === topmostVisibleEntry.target);
          if (index !== -1) {
            setActiveStepIndex(index);
          }
        }
      },
      {
        // Defines the "active" area as the central 20% of the viewport height
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    stepElements.forEach(el => observer.observe(el));

    return () => {
      stepElements.forEach(el => observer.unobserve(el));
    };
  }, [steps.length]);

  const activeStep = steps[activeStepIndex] || steps[0];

  return (
    <div className="relative mt-8">
      {/* Sticky Progress Bar */}
      <div className={`sticky top-4 z-10 mb-12 p-2 bg-card/60 backdrop-blur-md border border-white/10 rounded-full shadow-lg transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center space-x-3">
          <div className="flex-grow flex items-center gap-1.5 px-2 overflow-x-auto no-scrollbar">
            {steps.map((_, index) => (
              <button
                 key={index}
                 onClick={() => {
                   stepRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                 }}
                 className={`h-1.5 rounded-full transition-all duration-500 ease-out flex-1 min-w-[20px] hover:h-2.5 ${index <= activeStepIndex ? 'bg-accent-gold' : 'bg-white/10'}`}
                 aria-label={`Ir para etapa ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 pr-2 shrink-0">
            <button 
              onClick={() => {
                const prevIndex = Math.max(0, activeStepIndex - 1);
                stepRefs.current[prevIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              disabled={activeStepIndex === 0}
              className="p-1 text-text-secondary hover:text-accent-gold disabled:opacity-30 disabled:hover:text-text-secondary transition-colors"
              aria-label="Etapa anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-right w-32 hidden md:block">
              <p className="font-poppins font-semibold text-sm text-text-primary leading-tight truncate">{activeStep.title}</p>
              <p className="text-xs text-text-secondary leading-tight">Etapa {activeStepIndex + 1} de {steps.length}</p>
            </div>
             <button 
              onClick={() => {
                const nextIndex = Math.min(steps.length - 1, activeStepIndex + 1);
                stepRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              disabled={activeStepIndex === steps.length - 1}
              className="p-1 text-text-secondary hover:text-accent-gold disabled:opacity-30 disabled:hover:text-text-secondary transition-colors"
              aria-label="Próxima etapa"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="relative">
        <div className="absolute left-4 md:left-8 w-0.5 h-full bg-white/10" aria-hidden="true"></div>
        {steps.map((step, index) => (
          <div 
            key={index} 
            ref={el => { if (el) stepRefs.current[index] = el; }}
            className="relative pl-12 md:pl-20 pb-12 last:pb-0"
          >
            <div 
               className={`absolute left-4 md:left-8 top-1 -ml-2.5 w-5 h-5 rounded-full border-2 transition-all duration-500 ${activeStepIndex >= index ? 'bg-accent-gold border-accent-gold' : 'bg-card border-white/20'}`}
               style={{ transitionDelay: `${150 + index * 100}ms`}}
            ></div>
            <div 
              className={`bg-card/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{
                animationDelay: `${150 + index * 120}ms`,
                animationDuration: `${500 + (index % 3) * 75}ms`,
              }}
            >
              <h3 className="font-poppins text-xl text-accent-gold font-semibold">{`Etapa ${index + 1}: ${step.title}`}</h3>
              <div className="mt-4 grid md:grid-cols-3 gap-6">
                
                {/* Mindset */}
                <div className="border-l-2 border-accent-blue/30 pl-4">
                  <div className="flex items-center gap-2">
                     {step.mindset.icon}
                     <h4 className="font-poppins text-md text-text-primary font-semibold">{step.mindset.title}</h4>
                  </div>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-text-secondary text-sm">
                     {step.mindset.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

                {/* Action */}
                 <div className="border-l-2 border-accent-gold/30 pl-4">
                  <div className="flex items-center gap-2">
                     {step.action.icon}
                     <h4 className="font-poppins text-md text-text-primary font-semibold">{step.action.title}</h4>
                  </div>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-text-secondary text-sm">
                     {step.action.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

                {/* Objective */}
                 <div className="border-l-2 border-white/20 pl-4">
                  <div className="flex items-center gap-2">
                     {step.objective.icon}
                     <h4 className="font-poppins text-md text-text-primary font-semibold">{step.objective.title}</h4>
                  </div>
                   <ul className="mt-2 space-y-1 list-disc list-inside text-text-secondary text-sm">
                     {step.objective.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// New component for the interactive Project Timeline
const ProjectTimeline: React.FC<{ items: TimelineItem[], isVisible: boolean }> = ({ items, isVisible }) => {
   const [activeItemIndex, setActiveItemIndex] = useState(0);
   const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

   useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
    const elements = itemRefs.current.filter((ref): ref is HTMLDivElement => ref !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
             const index = elements.findIndex(el => el === entry.target);
             if (index !== -1) setActiveItemIndex(index);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.1 }
    );

    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
   }, [items.length]);


  return (
    <div className="relative mt-12">
      {/* The vertical line */}
      <div className="absolute left-6 md:left-1/2 -ml-px w-0.5 h-full bg-white/10" aria-hidden="true"></div>

      {items.map((item, index) => (
        <div 
          key={index} 
          ref={el => { if(el) itemRefs.current[index] = el; }}
          className="relative flex flex-col md:flex-row md:justify-center mb-12 last:mb-0 group"
        >
           <div className={`w-full md:w-1/2 flex pl-16 md:pl-0 ${index % 2 === 0 ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'}`}>
             <div 
                className={`w-full max-w-sm bg-card/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl transition-all duration-500 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } ${index === activeItemIndex ? 'border-accent-gold/50 shadow-lg shadow-accent-gold/5' : ''}`}
                style={{ transitionDelay: `${index * 150}ms`}}
              >
              <p className="text-sm font-semibold text-accent-blue">{item.phase}</p>
              <h3 className={`font-poppins text-lg font-semibold mt-1 transition-colors duration-300 ${index === activeItemIndex ? 'text-accent-gold' : 'text-text-primary'}`}>
                {item.title}
              </h3>
              <p className="text-text-secondary mt-2 text-sm">{item.description}</p>
            </div>
          </div>
          {/* The circle on the timeline */}
          <div 
            className={`absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 mt-8 md:mt-0 w-4 h-4 rounded-full border-2 transition-all duration-500 ${
              index === activeItemIndex ? 'bg-accent-gold border-accent-gold scale-125' : 'bg-card border-white/30'
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};


const App: React.FC = () => {
  const renderSectionContent = (section: Section, isVisible: boolean) => {
    const baseTransition = 'transition-all duration-500 ease-out';
    const visibleClass = 'opacity-100 translate-y-0';
    const hiddenClass = 'opacity-0 translate-y-4';
    const getTransition = (visible: boolean) => (visible ? visibleClass : hiddenClass);

    switch (section.type) {
       case 'journey':
        return <JourneyTimeline steps={section.journeySteps || []} isVisible={isVisible} />;
      case 'timeline':
        return <ProjectTimeline items={section.timelineItems || []} isVisible={isVisible} />;
      case 'pricing':
        return (
          <div className="mt-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {section.pricingPlans?.map((plan, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col bg-card/50 backdrop-blur-sm border rounded-2xl p-6 md:p-8 transition-all duration-500 hover:border-accent-gold/50 hover:-translate-y-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  } ${plan.highlight ? 'border-accent-gold/40 shadow-xl shadow-accent-gold/10' : 'border-white/10'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                       <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${plan.highlight ? 'text-accent-gold' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                       </svg>
                       <span className="font-poppins font-bold text-lg tracking-wider text-white">{plan.name}</span>
                    </div>
                    <div className="text-4xl font-bold text-white">
                      {plan.price}<span className="text-lg font-normal text-text-secondary">/mês</span>
                    </div>
                  </div>

                  <div className="flex-grow">
                     <p className="text-sm font-bold text-white mb-4">O que está incluso?</p>
                     <ul className="space-y-3">
                       {plan.features.map((feature, i) => (
                         <li key={i} className="flex items-start text-sm text-text-secondary">
                           <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-gold/20 flex items-center justify-center mr-3 mt-0.5">
                              <svg className="w-3 h-3 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                           </div>
                           <span>{feature}</span>
                         </li>
                       ))}
                     </ul>
                  </div>
                </div>
              ))}
            </div>
             {section.pricingNotes && (
              <div 
                className={`mt-10 text-center space-y-2 ${baseTransition} ${getTransition(isVisible)}`}
                style={{ transitionDelay: '400ms' }}
              >
                {section.pricingNotes.map((note, i) => (
                  <p key={i} className="text-accent-gold font-bold text-lg md:text-xl font-poppins">{note}</p>
                ))}
              </div>
            )}
          </div>
        );
      case 'grid': {
        let animationCounter = 0;
        const delayIncrement = 75;
        const baseDelay = 150;

        return (
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {section.columns?.map((col, colIndex) => (
              <div
                key={colIndex}
                className="bg-card/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl"
              >
                {col.title && (
                  <h3
                    className={`font-poppins text-lg text-text-primary mb-4 opacity-0 ${ isVisible ? 'animate-fade-in-up' : '' }`}
                    style={{
                      animationDelay: `${ baseDelay + animationCounter++ * delayIncrement }ms`,
                      animationDuration: `${500 + (animationCounter % 3) * 50}ms`,
                    }}
                  >
                    {col.title}
                  </h3>
                )}
                <ul className="space-y-3">
                  {col.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`p-3 rounded-xl bg-card/40 border border-white/5 shadow-inner opacity-0 ${ isVisible ? 'animate-fade-in-up' : '' }`}
                      style={{
                        animationDelay: `${ baseDelay + animationCounter++ * delayIncrement }ms`,
                        animationDuration: `${500 + (animationCounter % 3) * 50}ms`,
                      }}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-card border border-white/10 flex items-center justify-center mr-4 shadow-md">
                          <div className="w-5 h-5 text-accent-gold">
                             {item.icon}
                          </div>
                        </div>
                        <span
                          className="text-text-secondary"
                          dangerouslySetInnerHTML={{ __html: item.text }}
                        ></span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      }
      case 'card-highlight':
        return (
           <div 
              className={`bg-gradient-to-br from-accent-blue/20 to-accent-gold/20 border border-accent-gold/30 p-6 md:p-10 rounded-3xl mt-4 shadow-2xl shadow-accent-gold/20`}
            >
             <div className="flex justify-center items-center gap-6 md:gap-10 mb-8">
              {/* Attract Icon */}
              <div className={`w-12 h-12 md:w-16 md:h-16 bg-card/50 rounded-full flex items-center justify-center border-2 border-accent-blue/50 shadow-lg opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '150ms'}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              {/* Engage Icon */}
              <div className={`w-12 h-12 md:w-16 md:h-16 bg-card/50 rounded-full flex items-center justify-center border-2 border-accent-gold/50 shadow-lg opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '300ms'}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              {/* Convert Icon */}
              <div className={`w-12 h-12 md:w-16 md:h-16 bg-card/50 rounded-full flex items-center justify-center border-2 border-accent-blue/50 shadow-lg opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '450ms'}}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className={`text-center text-xl md:text-3xl font-semibold text-text-primary leading-relaxed opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '600ms' }}>
              <strong>{section.content}</strong>
            </p>
          </div>
        )
      default:
        return section.content.map((p: any, index: number) => (
          <p 
            key={index} 
            dangerouslySetInnerHTML={{ __html: p }} 
            className={`text-text-secondary text-base md:text-lg text-center leading-relaxed max-w-3xl mx-auto mb-2 last:mb-0 ${baseTransition} ${getTransition(isVisible)}`}
            style={{ transitionDelay: `${100 + index * 100}ms` }}
            />
        ));
    }
  };

  return (
    <div className="font-sans overflow-x-hidden">
       <div className="fixed top-0 left-0 p-4 z-50">
        <img
          src="https://static.wixstatic.com/media/1f17f3_1e2b54d2fd894dd997c6cbc18e940576~mv2.png"
          alt="UP! Company Logo"
          className="w-10 md:w-12"
        />
      </div>
      <main className="px-4 py-6 md:py-10">
        <Header />
        <div className="mt-16 md:mt-24 space-y-16 md:space-y-24">
          {sectionsData.map((section) => (
              <SectionCard key={section.id} id={section.id} title={section.title}>
                {(isVisible) => renderSectionContent(section, isVisible)}
              </SectionCard>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default App;