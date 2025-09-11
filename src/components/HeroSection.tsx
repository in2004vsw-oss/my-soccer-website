import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { manOfTheMatchHistory, type ManOfTheMatch } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % manOfTheMatchHistory.length);
    }, 10000); // 8초로 변경 (기존 5초에서 증가)

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % manOfTheMatchHistory.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + manOfTheMatchHistory.length) % manOfTheMatchHistory.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="relative h-full">
            <ImageWithFallback
              src={manOfTheMatchHistory[currentSlide].image}
              alt={`${manOfTheMatchHistory[currentSlide].player.name} - Man of the Match`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16 lg:pl-24">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-white z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 mb-6"
          >
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-xl tracking-wider uppercase text-yellow-400 font-medium">
              이주의 MVP
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-4"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2">
              {manOfTheMatchHistory[currentSlide].player.name.split(' ')[0]}
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-300">
              {manOfTheMatchHistory[currentSlide].player.name.split(' ')[1]}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-blue-400 text-lg font-medium">
                {manOfTheMatchHistory[currentSlide].week}
              </span>
            </div>
            <p className="text-xl text-gray-200 leading-relaxed max-w-xl">
              {manOfTheMatchHistory[currentSlide].description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {manOfTheMatchHistory[currentSlide].player.goals}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">골</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {manOfTheMatchHistory[currentSlide].player.assists}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">어시스트</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {manOfTheMatchHistory[currentSlide].player.matches}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">경기</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors border border-white/20 hover:border-white/40"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors border border-white/20 hover:border-white/40"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {manOfTheMatchHistory.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Club Branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-8 left-8 z-20"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
          퀀스
        </h3>
        <p className="text-sm text-gray-300 uppercase tracking-wider">
          2025 시즌
        </p>
      </motion.div>
    </div>
  );
}