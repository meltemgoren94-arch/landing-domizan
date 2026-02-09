import { motion as Motion, AnimatePresence } from "framer-motion";
import React from "react";
import logoWide from "@/assets/logo-text-blue.png";
import logoIcon from "@/assets/logo-icon-gradient.png";

export const AnimatedLogo = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-8 p-12">
      {/* Background Decorative Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400 opacity-20"
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              scale: 0
            }}
            animate={{
              x: [
                Math.random() * 400 - 200,
                Math.random() * 400 - 200,
                Math.random() * 400 - 200
              ],
              y: [
                Math.random() * 400 - 200,
                Math.random() * 400 - 200,
                Math.random() * 400 - 200
              ],
              scale: [0, 1, 0.5, 1, 0],
              opacity: [0, 0.4, 0.2, 0.4, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* The Icon Animation */}
      <Motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <Motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
        >
          <img
            src={logoIcon}
            alt="DOMiZAN Icon"
            className="w-full h-full object-contain rounded-3xl"
          />
        </Motion.div>

        {/* Orbiting Ring (Agentic Feel) */}
        <Motion.div
          className="absolute -inset-4 border-2 border-blue-500/30 rounded-full border-dashed"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <Motion.div
          className="absolute -inset-8 border border-blue-400/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </Motion.div>

      {/* The Main Logo Text Animation */}
      <Motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="relative z-10"
      >
        <Motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src={logoWide}
            alt="DOMiZAN Logo"
            className="h-16 md:h-24 object-contain"
          />
        </Motion.div>

        {/* Glow Sweep Effect */}
        <Motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          animate={{ x: ['-200%', '200%'] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut"
          }}
        />
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-blue-200/60 font-medium tracking-[0.4em] uppercase text-sm md:text-base"
      >
        Agentic Desktop AI
      </Motion.div>
    </div>
  );
};
