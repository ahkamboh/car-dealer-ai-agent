// components/Spline3D.tsx
"use client";

import HyperText from '@/components/magicui/hyper-text';
import React, { useState, useRef, Suspense, lazy, useCallback } from 'react';
import { ChevronRight } from "lucide-react";
 
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import SparklesText from '@/components/magicui/sparkles-text';
// Lazy load the Spline component
const LazySpline = lazy(() => import('@splinetool/react-spline'));

interface SplineInstance {
  setVariable: (variable: string, value: number) => void;
}

const Spline3D: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const splineRef = useRef<SplineInstance | null>(null);

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
    <div className="relative w-full h-[calc(100vh-3.9rem)]">
        <div className="absolute left-1/2 text-center  top-[40%] -translate-x-1/2 -translate-y-1/2">
        <AnimatedGradientText className='cursor-pointer'>
        🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent poppins-light`,
          )}
        >
          Introducing Cortex
        </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
      <SparklesText text=" Fuel Car Dealership's with Cortex" className='text-3xl mt-5 poppins-bold ' />
      <p className='poppins-light'>Unlock deeper customer insights and elevate experiences  <br />with Cortex's AI-powered dashboard</p>
  </div>
      <nav className="max-w-4xl mx-auto relative top-8 bg-glass  rounded-full flex justify-between items-center p-2">
        <div className="scale-[.8]">
          <img src="/logo.svg" alt="" />
        </div>
        <div className="flex h-full justify-center items-center gap-2">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-[#b783eb] to-[#e81a9d] hover:bg-gradient-to-tr font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            Get Started
          </button>
        </div>
      </nav>
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D model...</div>}>
        <LazySpline
          scene="https://prod.spline.design/vnmmUAZo2eWc2wnU/scene.splinecode"
          onLoad={handleLoad}
        />
      </Suspense>
      {!isLoading && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-4">
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
            className="w-10 h-10 bg-[#505b68] rounded-full border-2 border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default Spline3D;