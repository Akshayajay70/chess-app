import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { BackgroundIcons } from '../../../components/BackgroundIcons';
import { FloatingIndicators } from '../../../components/FloatingIndicators';
import { Chessboard } from '../../../components/Chessboard';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
      <BackgroundIcons />
      <Navbar />

      <main className="relative min-h-screen flex items-center justify-center px-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
          {/* Left Column - Content */}
          <div className="flex items-center">
            <HeroSection />
          </div>

          {/* Right Column - Interactive Chess Board */}
          <div className="flex items-center justify-center">
            <Chessboard />
          </div>
        </div>
      </main>

      <FloatingIndicators />
    </div>
  );
} 