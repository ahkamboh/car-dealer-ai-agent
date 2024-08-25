import React from 'react';

interface CustomCircularProgressProps {
  size: number;
  strokeWidth: number;
  completed: number;
  pending: number;
}

const CustomCircularProgress: React.FC<CustomCircularProgressProps> = ({ size, strokeWidth, completed, pending }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const offset = (val: number) => circumference - (val / 100) * circumference;

  return (
    <svg height={size} width={size}>
      <circle
        stroke="lightgrey"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        style={{ strokeDashoffset: 0 }}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="blue"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        style={{ strokeDashoffset: offset(pending) }}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="green"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        style={{ strokeDashoffset: offset(completed) }}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
    </svg>
  );
};

export default CustomCircularProgress;
