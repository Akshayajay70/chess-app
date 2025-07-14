import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="space-y-10 lg:pt-20 flex flex-col justify-center h-full">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold">
          Master Chess with
          <span className="text-game-purple block mt-2">AI-Powered Training</span>
        </h1>
        <p className="text-xl text-slate-400">
          Challenge Stockfish 3000 and discover your true potential
        </p>
      </div>

      {/* Features List */}
      <div className="space-y-6">
        <FeatureItem
          icon="M12 2L8 6h8L12 2zM9 6v6h6V6H9zm-1 7v2h8v-2H8zm-1 3v2h10v-2H7z"
          title="Advanced AI Opponent"
          description="Train against world-class chess engine"
        />
        <FeatureItem
          icon="M12 2v20M2 12h20"
          title="Real-time Analysis"
          description="Get instant feedback on your moves"
        />
        <FeatureItem
          icon="M17 3H7v4h10V3zM15 7v3h4l-2 11H7L5 10h4V7"
          title="Skill Rating System"
          description="Track your progress and ranking"
        />
      </div>

      {/* CTA Button */}
      <div className="pt-4">
        <Link
          to="#"
          className="bg-game-purple hover:bg-opacity-90 px-8 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
        >
          Play Now
        </Link>

      </div>
    </div>
  );
}

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d={icon} />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-slate-400">{description}</p>
      </div>
    </div>
  );
} 