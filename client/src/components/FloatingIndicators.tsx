interface FloatingIndicatorsProps {
  className?: string;
}

export function FloatingIndicators({ className = '' }: FloatingIndicatorsProps) {
  return (
    <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 opacity-30 ${className}`}>
      <div className="w-3 h-3 bg-game-purple rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse delay-700"></div>
    </div>
  );
} 