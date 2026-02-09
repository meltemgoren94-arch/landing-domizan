import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Countdown values: 10, 5, 1 hours then 60 seconds
const countdownSteps = [
    { value: "10", unit: "Saat", color: "text-red-600" },
    { value: "5", unit: "Saat", color: "text-orange-600" },
    { value: "1", unit: "Saat", color: "text-amber-500" },
    { value: "60", unit: "Saniye", color: "text-blue-600" },
];

interface CountdownTimerProps {
    className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ className = "" }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isPaused) return;

        const isLastStep = currentIndex >= countdownSteps.length - 1;

        // Timing: 600ms between steps, pause 4 seconds at end
        const baseDelay = 600;

        timeoutRef.current = setTimeout(() => {
            if (isLastStep) {
                // At 60 Saniye: pause for 4 seconds, then restart
                setIsPaused(true);
                setTimeout(() => {
                    setCurrentIndex(0);
                    setIsPaused(false);
                }, 4000);
            } else {
                setCurrentIndex((prev) => prev + 1);
            }
        }, baseDelay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, isPaused]);

    const currentStep = countdownSteps[currentIndex];

    return (
        <span className={`inline-flex items-center ${className}`}>
            {/* Countdown container - fixed width, transparent background */}
            <span className="inline-flex items-center justify-start w-[180px]">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`inline-flex items-center gap-1 font-extrabold text-[0.9em] ${currentStep.color}`}
                    >
                        <span className="text-inherit">{currentStep.value}</span>
                        <span className="text-inherit text-[0.85em]">{currentStep.unit}</span>
                    </motion.span>
                </AnimatePresence>
            </span>
        </span>
    );
};

export default CountdownTimer;
