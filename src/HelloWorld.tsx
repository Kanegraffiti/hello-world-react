// src/HelloWorld.tsx
// This component displays "Hello World" with animated hearts and a rotating gradient background

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

// Gradient styles to rotate between
const gradients = [
  "from-[#9b87f5] to-[#6E59A5]",
  "from-[#8B5CF6] to-[#7E69AB]",
  "from-[#7E69AB] to-[#D6BCFA]",
  "from-[#D6BCFA] to-[#9b87f5]",
];

// Generate decorative heart positions and animations
const hearts = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 0.6 + 0.4,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 5,
}));

const HelloWorld = () => {
  const [currentGradient, setCurrentGradient] = useState(0);

  // Rotate gradients every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background layers */}
      {gradients.map((gradient, index) => (
        <motion.div
          key={gradient}
          className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentGradient ? 1 : 0 }}
          transition={{ duration: 2 }}
        />
      ))}

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-white/60"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: heart.duration,
            delay: heart.delay,
            ease: "easeInOut",
          }}
        >
          <Heart size={10 + heart.size * 10} fill="white" />
        </motion.div>
      ))}

      {/* Central card with text */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="p-8 backdrop-blur-lg bg-white/10 border border-white/20 hover:scale-105 transition-transform duration-300 shadow-xl rounded-2xl">
          <h1
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
            style={{
              WebkitTextStrokeWidth: "2px",
              WebkitTextStrokeColor: "#1A1F2C",
              WebkitTextFillColor: "white",
              textShadow: "0 0 1px rgba(0,0,0,0.3)",
            }}
          >
            Hello World
          </h1>
        </div>
      </motion.div>
    </div>
  );
};

export default HelloWorld;
