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
          <div className="flex-grow flex items-center gap-1.5 px-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out flex-1 ${index <= activeStepIndex ? 'bg-accent-gold' : 'bg-white/10'}`}
              />
            ))}
          </div>
          <div className="flex-shrink-0 text-right pr-2 w-32">
            <p className="font-poppins font-semibold text-sm text-text-primary leading-tight truncate">{activeStep.title}</p>
            <p className="text-xs text-text-secondary leading-tight">Etapa {activeStepIndex + 1} de {steps.length}</p>
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
        return (
          <div className="relative mt-12">
            {/* The vertical line */}
            <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-white/10" aria-hidden="true"></div>

            {section.timelineItems.map((item, index) => (
              <div key={index} className="relative flex justify-center mb-12 last:mb-0">
                <div className={`w-1/2 flex ${index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                   <div 
                      className={`w-full max-w-sm bg-card/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl ${baseTransition} ${getTransition(isVisible)}`}
                      style={{ transitionDelay: `${index * 150}ms`}}
                    >
                    <p className="text-sm font-semibold text-accent-blue">{item.phase}</p>
                    <h3 className="font-poppins text-lg text-text-primary font-semibold mt-1">{item.title}</h3>
                    <p className="text-text-secondary mt-2 text-sm">{item.description}</p>
                  </div>
                </div>
                {/* The circle on the timeline */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-card border-2 border-accent-blue"></div>
              </div>
            ))}
          </div>
        );
      case 'grid': {
        let animationCounter = 0;
        const delayIncrement = 75;
        const baseDelay = 150;

        return (
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {section.columns.map((col, colIndex) => (
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
              className={`bg-gradient-to-br from-accent-blue/20 to-accent-gold/20 border border-accent-gold/30 p-10 rounded-3xl mt-4 shadow-2xl shadow-accent-gold/20`}
            >
             <div className="flex justify-center items-center gap-6 md:gap-10 mb-8">
              {/* Attract Icon */}
              <div className={`w-14 h-14 md:w-16 md:h-16 bg-card/50 rounded-full flex items-center justify-center border-2 border-accent-blue/50 shadow-lg opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '150ms'}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              {/* Engage Icon */}
              <div className={`w-14 h-14 md:w-16 md:h-16 bg-card/50 rounded-full flex items-center justify-center border-2 border-accent-gold/50 shadow-lg opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '300ms'}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              {/* Convert Icon */}
              <div className={`w-14 h-14 md:w-16 md:h-16 bg-card/50 rounded-full flex items-center justify-center border-2 border-accent-blue/50 shadow-lg opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '450ms'}}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className={`text-center text-2xl md:text-3xl font-semibold text-text-primary leading-relaxed opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '600ms' }}>
              <strong>{section.content}</strong>
            </p>
          </div>
        )
      default:
        return section.content.map((p, index) => (
          <p 
            key={index} 
            dangerouslySetInnerHTML={{ __html: p }} 
            className={`text-text-secondary text-lg text-center leading-relaxed max-w-3xl mx-auto mb-2 last:mb-0 ${baseTransition} ${getTransition(isVisible)}`}
            style={{ transitionDelay: `${100 + index * 100}ms` }}
            />
        ));
    }
  };

  return (
    <div className="font-sans">
       <div className="fixed top-0 left-0 p-4 z-50">
        <img
          src="https://static.wixstatic.com/media/1f17f3_1e2b54d2fd894dd997c6cbc18e940576~mv2.png"
          alt="UP! Company Logo"
          className="w-12"
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