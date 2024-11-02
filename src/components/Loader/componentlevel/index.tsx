"use client";

import { PulseLoader } from "react-spinners";

interface ComponentLevelLoaderProps {
  text: string;
  color: string;
  loading: boolean;
  size?: string; // Make size optional
}


export default function ComponentLevelLoader({ text, color, loading, size }: ComponentLevelLoaderProps) {
  return (
    <span className="flex gap-1 items-center">
      {text}
      <PulseLoader
        color={color}
        loading={loading}
        size={size || 10}
        data-testid="loader"
      />
    </span>
  );
}
