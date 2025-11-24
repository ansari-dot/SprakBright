import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const stats = [
    { id: 1, number: 500, suffix: "+", label: "HAPPY CUSTOMERS" },
    { id: 2, number: 550, suffix: "+", label: "TOTAL PROJECT" },
    { id: 3, number: 120, suffix: "+", label: "CLEANING STAFF" },
    { id: 4, number: 100, suffix: "%", label: "SERVICE GUARANTEE" }
  ];

  return (
    <section 
      ref={statsRef} 
      className="bg-[#3a7bd5] relative py-20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.5 21h9M7.5 15h9M7.5 9h9M9 7.5v9M15 7.5v9'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "60px 60px"
      }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-12">
          {stats.map(({ id, number, suffix, label }) => (
            <div key={id}>
              <h3 className="text-white text-5xl md:text-6xl font-extrabold mb-1">
                {isVisible ? (
                  <CountUp
                    start={0}
                    end={number}
                    duration={2.5}
                    separator=","
                    suffix={suffix}
                  />
                ) : (
                  `${number}${suffix}`
                )}
              </h3>
              <p className="text-white uppercase font-bold text-lg tracking-wider">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;