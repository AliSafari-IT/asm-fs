import React, { useEffect } from 'react';

interface ChartContainerProps {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ children, containerRef, style }) => {

  useEffect(() => {
    const handleResize = () => {
      // Trigger a re-render or update the chart here if needed
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ ...style, width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

export default ChartContainer;
