import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ImageCompareSlider = ({ cleanImageSrc, dirtyImageSrc, imageName }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // Initial position in percentage
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      let position = (x / width) * 100;
      position = Math.max(0, Math.min(100, position)); // Clamp between 0 and 100
      setSliderPosition(position);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      style={{ cursor: 'ew-resize' }}
    >
      {/* Dirty Image (left side) */}
      <img
        src={dirtyImageSrc}
        alt="Dirty"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />

      {/* Clean Image (right side) */}
      <img
        src={cleanImageSrc}
        alt="Clean"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      />

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 bg-white w-1 flex items-center justify-center"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
          <FiChevronLeft className="text-gray-800" />
          <FiChevronRight className="text-gray-800" />
        </div>
      </div>

    
    
    </div>
  );
};

export default ImageCompareSlider;
