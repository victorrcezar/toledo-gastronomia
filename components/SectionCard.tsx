import React, { useState, useEffect, useRef } from 'react';

interface SectionCardProps {
  id: string;
  title: string;
  children: (isVisible: boolean) => React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ id, title, children }) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section 
      id={id}
      ref={ref}
      className="max-w-5xl mx-auto"
    >
      <h2 className={`font-poppins text-3xl md:text-4xl font-bold text-text-primary mb-4 md:mb-10 text-center transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {title}
      </h2>
      <div className="prose prose-slate max-w-none">
        {children(isVisible)}
      </div>
    </section>
  );
};

export default SectionCard;