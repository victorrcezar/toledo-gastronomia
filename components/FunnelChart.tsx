import React from 'react';
// Fix: Replaced non-existent 'FunnelStage' with the existing and equivalent 'Step' type.
import { Step as FunnelStage } from '../types';

interface FunnelChartProps {
  stages: FunnelStage[];
  isVisible: boolean;
}

const FunnelChart: React.FC<FunnelChartProps> = ({ stages, isVisible }) => {
  const baseTransition = 'transition-all duration-500 ease-out';
  const visibleClass = 'opacity-100 translate-y-0';
  const hiddenClass = 'opacity-0 translate-y-4';
  const getTransition = (visible: boolean) => (visible ? visibleClass : hiddenClass);

  return (
    <div className="mt-8">
      <div className="hidden lg:flex items-center justify-center gap-4">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.title}>
            <div 
              className={`flex-1 flex flex-col text-center text-white p-6 rounded-lg bg-gradient-to-br ${stage.color} shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-500 ${baseTransition} ${getTransition(isVisible)}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {stage.icon}
              <h3 className="font-poppins font-bold text-lg">{stage.title}</h3>
              <p className="text-sm text-blue-100/90 mt-1">{stage.description}</p>
            </div>
            {index < stages.length - 1 && (
              <svg 
                className={`w-8 h-8 text-slate-300 ${baseTransition} ${getTransition(isVisible)}`} 
                style={{ transitionDelay: `${200 + index * 150 + 75}ms` }} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="lg:hidden flex flex-col items-center gap-4">
        {stages.map((stage, index) => (
           <React.Fragment key={stage.title}>
            <div 
              className={`w-full max-w-md flex flex-col text-center text-white p-6 rounded-lg bg-gradient-to-br ${stage.color} shadow-lg ${baseTransition} ${getTransition(isVisible)}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {stage.icon}
              <h3 className="font-poppins font-bold text-lg">{stage.title}</h3>
              <p className="text-sm text-blue-100/90 mt-1">{stage.description}</p>
            </div>
            {index < stages.length - 1 && (
               <svg className="w-8 h-8 text-slate-400 animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FunnelChart;