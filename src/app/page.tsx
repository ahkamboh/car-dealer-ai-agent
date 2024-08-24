// components/Spline3D.tsx
"use client";

import React, { useState, useRef, Suspense, lazy, useCallback } from 'react';

// Lazy load the Spline component
const LazySpline = lazy(() => import('@splinetool/react-spline'));


interface SplineInstance {
  setVariable: (variable: string, value: number) => void;
}

const Spline3D: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const splineRef = useRef<SplineInstance | null>(null); // Set type of splineRef to SplineInstance or null

  // Use useCallback to prevent unnecessary re-renders
  const setSplineVariable = useCallback((variable: string, value: number) => {
    if (splineRef.current) {
      try {
        splineRef.current.setVariable(variable, value);
      } catch (error) {
        console.error(`Variable "${variable}" was not found in the Spline file.`);
      }
    }
  }, []);

  const handleButton1Click = () => {
    setSplineVariable('black', 100);
    setSplineVariable('white', 0);
    setSplineVariable('silver', 0);
  };

  const handleButton2Click = () => {
    setSplineVariable('black', 0);
    setSplineVariable('white', 100);
    setSplineVariable('silver', 0);
  };

  const handleButton3Click = () => {
    setSplineVariable('black', 0);
    setSplineVariable('white', 0);
    setSplineVariable('silver', 100);
  };

  const handleLoad = (spline: SplineInstance) => {
    splineRef.current = spline;
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-screen">
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D model...</div>}>
        <LazySpline
          scene="https://prod.spline.design/vnmmUAZo2eWc2wnU/scene.splinecode"
          onLoad={handleLoad}
        />
      </Suspense>
      {!isLoading && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            onClick={handleButton1Click}
            aria-label="Black"
            className="w-10 h-10 bg-black rounded-full border-2 border-white"
          />
          <button
            onClick={handleButton2Click}
            aria-label="White"
            className="w-10 h-10 bg-white rounded-full border-2 border-gray-400"
          />
          <button
            onClick={handleButton3Click}
            aria-label="Silver"
            className="w-10 h-10 bg-gray-300 rounded-full border-2 border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default Spline3D;
