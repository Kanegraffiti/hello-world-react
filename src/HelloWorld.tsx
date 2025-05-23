// src/HelloWorld.tsx
// This component displays "Hello World" with a rotating gradient background

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Gradient styles to rotate between
const gradients = [
  "from-[#9b87f5] to-[#6E59A5]",
  "from-[#8B5CF6] to-[#7E69AB]",
  "from-[#7E69AB] to-[#D6BCFA]",
  "from-[#D6BCFA] to-[#9b87f5]",
];

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

      {/* Central text */}
      <h1
        className="text-4xl md:text-6xl font-bold text-white tracking-tight relative z-10"
        style={{
          WebkitTextStrokeWidth: "2px",
          WebkitTextStrokeColor: "#301934", // Updated stroke color
          WebkitTextFillColor: "white",
          textShadow: "0 0 1px rgba(0,0,0,0.3)",
        }}
      >
        Hello World
      </h1>
    </div>
  );
};

export default HelloWorld;
