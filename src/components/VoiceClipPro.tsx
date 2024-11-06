import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, RocketIcon, Plus, Settings, Check } from 'lucide-react';
import { useWorkspaceStore, ModelType } from '../store/workspaceStore';
import { cn } from '../lib/utils';

const MODEL_OPTIONS: { value: ModelType; label: string; logo: string }[] = [
  {
    value: 'gpt-4-turbo-preview',
    label: 'GPT-4 Turbo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
  },
  {
    value: 'claude-3-sonnet',
    label: 'Claude 3 Sonnet',
    logo: 'https://www.anthropic.com/images/logo.svg'
  },
  {
    value: 'gemini-pro-1.5',
    label: 'Gemini Pro 1.5',
    logo: 'https://seeklogo.com/images/G/google-gemini-logo-A5787B2669-seeklogo.com.png'
  },
  {
    value: 'llama-3.2',
    label: 'Llama 3.2',
    logo: 'https://raw.githubusercontent.com/facebookresearch/llama/main/llama.png'
  },
  {
    value: 'perplexity',
    label: 'Perplexity',
    logo: 'https://www.perplexity.ai/favicon.ico'
  }
];

export const VoiceClipPro = () => {
  const { toggleFuryMode, addChatWindow, transcriptionApiKey, setTranscriptionApiKey, selectedModel, setSelectedModel } = useWorkspaceStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(transcriptionApiKey);

  return (
    <>
      <motion.div
        className={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2",
          "bg-black/40 backdrop-blur-2xl rounded-full p-4",
          "flex items-center gap-4",
          "border border-white/10",
          "shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        )}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <motion.button
          className={cn(
            "w-12 h-12 rounded-full",
            "bg-gradient-to-br from-indigo-600 to-indigo-700",
            "flex items-center justify-center text-white",
            "hover:from-indigo-500 hover:to-indigo-600",
            "transition-all duration-200 shadow-lg"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addChatWindow()}
        >
          <Plus className="w-6 h-6" />
        </motion.button>

        <div className="relative">
          <motion.button
            className={cn(
              "w-16 h-16 rounded-full",
              "bg-gradient-to-br from-rose-500 to-purple-600",
              "flex items-center justify-center text-white",
              "relative overflow-hidden group",
              "shadow-lg shadow-purple-500/20"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic className="w-8 h-8 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:opacity-0 transition-opacity" />
          </motion.button>
          
          <button
            onClick={() => setIsSettingsOpen(true)}
            className={cn(
              "absolute -bottom-1 left-1/2 -translate-x-1/2",
              "w-6 h-6 rounded-full",
              "bg-white/10 backdrop-blur-xl",
              "flex items-center justify-center",
              "border border-white/20",
              "hover:bg-white/20 transition-colors"
            )}
          >
            <Settings className="w-3 h-3 text-white/80" />
          </button>
        </div>

        <motion.button
          className={cn(
            "w-12 h-12 rounded-full",
            "bg-gradient-to-br from-orange-500 to-amber-600",
            "flex items-center justify-center text-white",
            "hover:from-orange-400 hover:to-amber-500",
            "transition-all duration-200 shadow-lg"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleFuryMode()}
        >
          <RocketIcon className="w-6 h-6" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSettingsOpen(false)}
          >
            <motion.div
              className={cn(
                "w-96 bg-black/40 backdrop-blur-2xl rounded-2xl p-6",
                "border border-white/10 shadow-2xl",
                "flex flex-col gap-6"
              )}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Voice Settings</h3>
                
                <div className="space-y-2">
                  <label className="text-sm text-white/60">Deepgram API Key</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                      className={cn(
                        "w-full bg-white/5 rounded-lg px-4 py-2",
                        "text-white placeholder-white/40",
                        "border border-white/10",
                        "focus:outline-none focus:border-white/20"
                      )}
                      placeholder="Enter your API key"
                    />
                    <button
                      onClick={() => setTranscriptionApiKey(tempApiKey)}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <Check className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/60">Model Selection</label>
                  <div className="grid grid-cols-2 gap-2">
                    {MODEL_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedModel(option.value)}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg",
                          "border transition-all duration-200",
                          selectedModel === option.value
                            ? "border-white/20 bg-white/10"
                            : "border-transparent hover:border-white/10"
                        )}
                      >
                        <img src={option.logo} alt={option.label} className="w-5 h-5" />
                        <span className="text-sm text-white/80">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};