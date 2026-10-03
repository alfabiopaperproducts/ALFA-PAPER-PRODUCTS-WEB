import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Leaf,
  ShieldCheck,
  Cog,
  Recycle,
} from 'lucide-react';

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}

const ecoFeatures: FeatureItem[] = [
  {
    icon: Leaf,
    title: 'Eco-Friendly Materials',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assured',
  },
  {
    icon: Cog,
    title: 'Modern Manufacturing',
  },
  {
    icon: Recycle,
    title: 'A Cleaner Greener Tomorrow',
  },
];

export const FactoryVideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(58); // Fallback to 58 seconds matching reference
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        resetControlsTimeout();
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  // Toggle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Handle Scrubbing
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * (videoRef.current.duration || duration);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Toggle Fullscreen
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.warn('Error attempting fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.warn('Error exiting fullscreen:', err);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Time and duration handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration) && videoRef.current.duration > 0) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  // Autohide controls during playback
  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card with Subtle Organic Curves */}
        <div className="relative rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-br from-white via-kraft-50/50 to-brand-50/25 border border-brand-100/80 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-14">
          
          {/* Decorative faint organic background leaf shapes */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-kraft-300/10 blur-2xl pointer-events-none" />

          {/* SVG Organic wave backdrop */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40 -z-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 600"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 300C250 200 450 400 700 320C950 240 1080 380 1200 340V600H0V300Z"
              fill="url(#organic-gradient)"
            />
            <defs>
              <linearGradient id="organic-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#1B5E20" stopOpacity="0.08" />
              </linearGradient>
            </defs>
          </svg>

          {/* Grid Layout: Left Content (7 cols) + Right Video (5 cols) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Eyebrow, Heading, Copy, 4 Eco Badges */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Eyebrow with decorative dash */}
                <div className="inline-flex items-center gap-3 mb-4 sm:mb-5">
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-brand-700 uppercase">
                    INSIDE ALFA
                  </span>
                  <span className="w-12 h-0.5 bg-brand-300 rounded-full inline-block" />
                </div>

                {/* Main Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight leading-[1.14]">
                  Where{' '}
                  <span className="block text-charcoal-900">Sustainability</span>
                  <span className="block text-brand-600 mt-0.5">Takes Shape</span>
                </h2>

                {/* Subtitle / Paragraph */}
                <p className="mt-5 text-sm sm:text-base lg:text-lg text-charcoal-600 font-normal leading-relaxed max-w-xl">
                  Take a closer look at our manufacturing process, where modern technology and responsible practices come together to create high-quality, biodegradable paper products.
                </p>
              </div>

              {/* Desktop 4-Feature Horizontal Row */}
              <div className="hidden md:grid grid-cols-4 gap-4 pt-8 lg:pt-10 mt-8 lg:mt-10 border-t border-brand-100/70">
                {ecoFeatures.map((feat, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    <div className="w-13 h-13 rounded-full bg-brand-50/80 border border-brand-200 text-brand-700 flex items-center justify-center mb-3 shadow-2xs group-hover:scale-105 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-all duration-300">
                      <feat.icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-bold text-charcoal-800 leading-snug">
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mobile 2x2 Feature Grid */}
              <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-brand-100/70 md:hidden">
                {ecoFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-brand-100/70 shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-full bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center flex-shrink-0">
                      <feat.icon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-bold text-charcoal-800 leading-tight">
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Portrait Video Player Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onClick={resetControlsTimeout}
                className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-none aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-charcoal-300/40 bg-charcoal-950 group select-none"
              >
                {/* HTML5 Video Element */}
                <video
                  ref={videoRef}
                  src="/Assets/Video/alfa-factory-video.mp4"
                  className="w-full h-full object-cover cursor-pointer"
                  playsInline
                  preload="metadata"
                  onClick={togglePlay}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleVideoEnded}
                />

                {/* Center Frosted Glass Play / Pause Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/35 backdrop-blur-md border border-white/60 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/50 active:scale-95 ${
                    isPlaying && !showControls
                      ? 'opacity-0 pointer-events-none scale-90'
                      : 'opacity-100 scale-100'
                  }`}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
                  ) : (
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                  )}
                </button>

                {/* Bottom Overlay Controls Bar */}
                <div
                  className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-3.5 sm:p-4 transition-opacity duration-300 z-10 ${
                    isPlaying && !showControls
                      ? 'opacity-0 pointer-events-none'
                      : 'opacity-100'
                  }`}
                >
                  {/* Progress / Scrubber Bar */}
                  <div
                    className="relative w-full h-1.5 bg-white/30 rounded-full mb-3 cursor-pointer group/bar transition-all hover:h-2"
                    onClick={handleScrub}
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-brand-400 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity"
                      style={{ left: `calc(${progressPercent}% - 6px)` }}
                    />
                  </div>

                  {/* Bottom Controls Row: Timestamp & Actions */}
                  <div className="flex items-center justify-between text-white text-xs font-semibold">
                    <div className="flex items-center gap-1.5 font-mono tracking-tight text-white/90">
                      <span>{formatTime(currentTime)}</span>
                      <span className="text-white/50">/</span>
                      <span className="text-white/80">{formatTime(duration)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="p-1.5 rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors text-white"
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="p-1.5 rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors text-white"
                        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                      >
                        {isFullscreen ? (
                          <Minimize className="w-4 h-4" />
                        ) : (
                          <Maximize className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
