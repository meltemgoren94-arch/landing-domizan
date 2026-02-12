import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, MessageSquare } from "lucide-react";
import chatbotIcon from "@/assets/chatbot-icon.png";

interface ChatbotProps {
    onOpenLeadModal: () => void;
}

interface Message {
    id: string;
    type: "bot" | "user";
    text: string | React.ReactNode;
}

interface Question {
    id: string;
    text: string;
    answer: string | React.ReactNode;
}

const predefinedQuestions: Question[] = [
    {
        id: "1",
        text: "Domizan AI ne zaman kullanıma açılacak?",
        answer: "2026 Nisan ayında hizmetinizde olacağız."
    },
    {
        id: "2",
        text: "Verilerim güvende mi?",
        answer: "Evet, verileriniz tamamen sizin kontrolünüzdedir. 'Local First' mimarimiz sayesinde dosya içerikleri sunucuya gönderilmez, sadece kendi bilgisayarınızda işlenir ve saklanır. KVKK ve GDPR uyumluluğu ile tam güvenlik sağlar."
    },
    {
        id: "3",
        text: "Domizan nasıl kullanılır?",
        answer: (
            <span>
                Kullanım oldukça basittir. Detaylı akışı görmek için sunumumuza göz atabilirsiniz:{" "}
                <a
                    href="https://presentation.domizan.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-600"
                >
                    https://presentation.domizan.com/
                </a>
            </span>
        )
    },
    {
        id: "4",
        text: "Domizan'ı kim geliştirdi?",
        answer: (
            <span>
                Domizan, <strong>ACR Tech</strong> tarafından geliştirilmiştir. Detaylar için:{" "}
                <a
                    href="https://www.acrtech.com.tr/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-600"
                >
                    acrtech.com.tr
                </a>
            </span>
        )
    },
    {
        id: "5",
        text: "Domizan'ı nerede kullanabilirim?",
        answer: "Hem masaüstü uygulamanızda hem de Telegram entegrasyonu sayesinde cep telefonunuzda kullanabilirsiniz."
    }
];

export const Chatbot: React.FC<ChatbotProps> = ({ onOpenLeadModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            type: "bot",
            text: "Merhaba! 👋 Ben Domizan Asistan. Size nasıl yardımcı olabilirim?"
        }
    ]);
    const [askedQuestionIds, setAskedQuestionIds] = useState<string[]>([]);
    const [showTyping, setShowTyping] = useState(false);
    const [showBadge, setShowBadge] = useState(false);

    // Initial animation sequence
    useEffect(() => {
        // Start typing animation after 1.5s
        const typingTimer = setTimeout(() => {
            setShowTyping(true);
        }, 1500);

        // Stop typing and show badge after 5s total (3.5s of typing)
        const badgeTimer = setTimeout(() => {
            setShowTyping(false);
            setShowBadge(true);
        }, 5000);

        return () => {
            clearTimeout(typingTimer);
            clearTimeout(badgeTimer);
        };
    }, []);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setShowBadge(false);
            setShowTyping(false);
        }
    };

    const handleQuestionClick = (question: Question) => {
        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            type: "user",
            text: question.text
        };
        setMessages(prev => [...prev, userMsg]);
        setAskedQuestionIds(prev => [...prev, question.id]);

        // Simulate thinking delay
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                type: "bot",
                text: question.answer
            };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

    const handleDemoRequest = () => {
        const userMsg: Message = {
            id: Date.now().toString(),
            type: "user",
            text: "Domizan için demo talep ediyorum"
        };
        setMessages(prev => [...prev, userMsg]);

        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                type: "bot",
                text: "Tabii, harika bir karar! 🎉 Sizi demo listesine ekleyebilmemiz için lütfen formu doldurun."
            };
            setMessages(prev => [...prev, botMsg]);

            // Open the lead modal shortly after the bot replies
            setTimeout(() => {
                onOpenLeadModal();
            }, 800);
        }, 600);
    };

    // Filter questions that haven't been asked yet
    const remainingQuestions = predefinedQuestions.filter(q => !askedQuestionIds.includes(q.id));

    return (
        <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white border border-slate-200 w-[350px] sm:w-[380px] h-[600px] max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="bg-white p-4 border-b border-slate-100 flex items-center justify-between shadow-sm z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden bg-slate-100 border border-slate-200">
                                    <img src={chatbotIcon} alt="Bot" className="w-full h-full object-cover" />
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-sm">Domizan Asistan</h3>
                                    <span className="text-xs text-slate-500">Çevrimiçi</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id}
                                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className="flex gap-2 max-w-[85%]">
                                        {msg.type === "bot" && (
                                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white border border-slate-100 self-end mb-1">
                                                <img src={chatbotIcon} alt="Bot" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div
                                            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.type === "user"
                                                ? "bg-blue-600 text-white rounded-br-none"
                                                : "bg-white text-slate-700 rounded-bl-none border border-slate-100"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Suggested Questions (Show remaining ones) */}
                            {remainingQuestions.length > 0 && (
                                <div className="flex flex-col gap-2 mt-4 animate-fadeIn">
                                    <p className="text-xs text-slate-400 ml-1 mb-1 font-medium">Hızlı Sorular</p>
                                    {remainingQuestions.map((q) => (
                                        <button
                                            key={q.id}
                                            onClick={() => handleQuestionClick(q)}
                                            className="text-sm bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 px-4 py-3 rounded-xl transition-all text-left border border-slate-200 hover:border-blue-200 shadow-sm flex items-center justify-between group"
                                        >
                                            {q.text}
                                            <MessageSquare className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                                        </button>
                                    ))}
                                </div>
                            )}
                            {/* Demo Request button - always visible */}
                            <div className="flex flex-col gap-2 mt-4 animate-fadeIn">
                                <button
                                    onClick={handleDemoRequest}
                                    className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-3 rounded-xl transition-all text-left border border-blue-100 hover:border-blue-200 shadow-sm font-semibold flex items-center justify-between"
                                >
                                    🚀 Demo talep ediyorum
                                    <ChevronDown className="w-4 h-4 -rotate-90" />
                                </button>
                            </div>

                            <div ref={messagesEndRef} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Initial Typing Animation */}
            <AnimatePresence>
                {!isOpen && showTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="pointer-events-auto absolute bottom-20 right-0 bg-white px-4 py-2 rounded-2xl rounded-br-none shadow-lg border border-slate-100 flex items-center gap-1"
                    >
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggle}
                className="bg-white hover:bg-slate-50 text-slate-800 p-0 rounded-full shadow-lg shadow-slate-200/50 pointer-events-auto flex items-center justify-center transition-colors border border-slate-100 overflow-visible w-16 h-16 relative"
                aria-label="Chatbot'u aç/kapat"
            >
                {/* Notification Badge */}
                <AnimatePresence>
                    {!isOpen && showBadge && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 border-white z-10"
                        >
                            1
                        </motion.div>
                    )}
                </AnimatePresence>

                {isOpen ? (
                    <ChevronDown className="w-8 h-8 text-slate-400" />
                ) : (
                    <div className="w-full h-full rounded-full overflow-hidden">
                        <img src={chatbotIcon} alt="Chat" className="w-full h-full object-cover" />
                    </div>
                )}
            </motion.button>
        </div>
    );
};
