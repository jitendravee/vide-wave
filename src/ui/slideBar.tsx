import React from "react";

interface SlideBarProps {
  className?: string;
}

export default function SlideBar({ className }: SlideBarProps) {
  return (
    <div className={`bg-red-500 ${className}`}>
      <h1>sildebar</h1>
    </div>
  );
}
