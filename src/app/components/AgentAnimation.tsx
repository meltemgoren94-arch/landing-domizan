import React, { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FileText, MessageSquare, Folder, CheckCircle2, FileImage, FileCode } from "lucide-react";
import logoIcon from "@/assets/logo-icon-3d.png";

const CHAT_MESSAGES = [
  "Raporları analiz ediyorum...",
  "KDV beyannamesi hazırlandı.",
  "Mükellef dosyaları düzenlendi.",
  "Yeni mevzuat kontrol edildi.",
];

const DOCUMENTS = [
  { id: 1, type: "pdf", color: "bg-red-500" },
  { id: 2, type: "jpg", color: "bg-blue-500" },
  { id: 3, type: "xlsx", color: "bg-green-500" },
  { id: 4, type: "doc", color: "bg-indigo-500" },
];

export const AgentAnimation = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % CHAT_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[600px] h-[500px] flex items-center justify-center">
      {/* Central Agent Node */}
      <div className="relative z-20">
        <Motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center p-6 border border-blue-100"
        >
          <img src={logoIcon} alt="DOMiZAN" className="w-full h-full object-contain" />

          {/* Active Pulse */}
          <Motion.div
            className="absolute inset-0 rounded-[2.5rem] border-4 border-blue-400"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Motion.div>

        {/* Floating Chat Bubble */}
        <AnimatePresence mode="wait">
          <Motion.div
            key={msgIndex}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -80, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.9 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-semibold">{CHAT_MESSAGES[msgIndex]}</span>
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rotate-45" />
          </Motion.div>
        </AnimatePresence>
      </div>

      {/* Flying Thumbnails (Documents) */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {DOCUMENTS.map((doc, i) => (
          <Motion.div
            key={doc.id}
            initial={{ x: -200, y: 100, opacity: 0, rotate: -45 }}
            animate={{
              x: [null, 0, 200],
              y: [null, 0, -100],
              opacity: [0, 1, 0],
              rotate: [null, 0, 45],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            className={`absolute left-1/2 top-1/2 w-16 h-20 ${doc.color} rounded-xl shadow-lg flex flex-col items-center justify-center border-2 border-white/20 p-2 backdrop-blur-sm bg-opacity-80`}
          >
            <FileText className="w-8 h-8 text-white mb-1" />
            <div className="w-8 h-1 bg-white/30 rounded-full" />
            <div className="w-6 h-1 bg-white/30 rounded-full mt-1" />

            {/* Status Checkmark that appears as it hits center */}
            <Motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, delay: i * 1.5 + 1.5 }}
              className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
            </Motion.div>
          </Motion.div>
        ))}
      </div>

      {/* Target Folder Icons */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-30">
        <Folder className="w-12 h-12 text-blue-300" />
        <Folder className="w-12 h-12 text-blue-300" />
      </div>

      {/* Source Scan Line */}
      <div className="absolute left-10 top-0 bottom-0 w-1 flex items-center">
        <Motion.div
          className="w-full h-20 bg-gradient-to-b from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          animate={{ y: [0, 400, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-400/10 blur-[100px] rounded-full -z-10" />
    </div>
  );
};
