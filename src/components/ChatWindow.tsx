import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Reorder, useDragControls } from 'framer-motion';
import { Settings, X, Mic, Send, Maximize2, Minimize2 } from 'lucide-react';
import { useWorkspaceStore } from '../store/workspaceStore';
import { cn } from '../lib/utils';
import { useSendButton } from '../hooks/useSendButton';
import { useParticles } from '../hooks/useParticles';

interface ChatWindowProps {
  id: string;
  model: string;
  apiKey: string;
  isPinned: boolean;
  isExpanded: boolean;
}

export const ChatWindow = ({ id, model, isPinned, isExpanded }: ChatWindowProps) => {
  const { removeChatWindow, togglePinWindow, toggleExpandWindow } = useWorkspaceStore();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(model);
  const [isCompact, setIsCompact] = useState(false);
  const { showParticles, particleContainer } = useParticles();
  const { clickCount, handleSendClick } = useSendButton(showParticles);
  const dragControls = useDragControls();
  
  const handleDoubleClick = () => {
    setIsCompact(!isCompact);
  };

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsEditing(false);
  };

  return (
    <Reorder.Item
      value={id}
      dragListener={false}
      dragControls={dragControls}
    >
      <motion.div
        className={cn(
          "relative backdrop-blur-[20px] rounded-xl overflow-hidden flex flex-col",
          "border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
          "bg-gradient-to-b from-white/15 to-white/10",
          isCompact ? "h-auto" : isExpanded ? "fixed inset-4 z-50" : "h-full",
          isPinned && "border-yellow-500/30",
          "transition-all duration-300 ease-in-out"
        )}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onDoubleClick={handleDoubleClick}
        drag={!isPinned}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
      >
        <div 
          className="p-4 border-b border-white/20 flex items-center justify-between bg-white/5 backdrop-blur-xl cursor-move"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <motion.button
                onClick={() => removeChatWindow(id)}
                className="w-3 h-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 hover:bg-red-500/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
              <motion.button
                onClick={() => togglePinWindow(id)}
                className={cn(
                  "w-3 h-3 rounded-full backdrop-blur-xl border border-white/40 transition-colors",
                  isPinned ? "bg-yellow-500/50" : "bg-white/20 hover:bg-yellow-500/50"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
              <motion.button
                onClick={() => toggleExpandWindow(id)}
                className={cn(
                  "w-3 h-3 rounded-full backdrop-blur-xl border border-white/40 transition-colors",
                  isExpanded ? "bg-green-500/50" : "bg-white/20 hover:bg-green-500/50"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleChange}
                className="bg-transparent text-white/80 text-sm font-medium ml-2 border-b border-white/20 focus:outline-none"
                autoFocus
              />
            ) : (
              <span
                onClick={handleTitleClick}
                className="text-white/80 text-sm font-medium ml-2 cursor-pointer hover:text-white transition-colors"
              >
                {title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleExpandWindow(id)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {!isCompact && (
          <>
            <div className="flex-1 p-4 overflow-auto">
              <div className="space-y-4">
                {/* Chat messages will go here */}
              </div>
            </div>

            <div className="p-4 border-t border-white/20 bg-white/5">
              <div className="relative flex gap-2">
                <input
                  type="text"
                  className={cn(
                    "flex-1 bg-white/10 rounded-xl px-4 py-3",
                    "text-white placeholder-white/40",
                    "border border-white/20",
                    "focus:outline-none focus:border-white/30",
                    "backdrop-blur-xl shadow-inner"
                  )}
                  placeholder="Type your message..."
                />
                <motion.button
                  className={cn(
                    "p-3 rounded-xl bg-white/10 backdrop-blur-xl",
                    "border border-white/20 text-white/80",
                    "hover:bg-white/15 transition-colors"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mic className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className={cn(
                    "p-3 rounded-xl",
                    "bg-gradient-to-r from-indigo-500 to-purple-500",
                    "text-white shadow-lg",
                    "border border-white/20",
                    "hover:from-indigo-400 hover:to-purple-400",
                    "relative overflow-hidden"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendClick}
                >
                  <Send className="w-5 h-5" />
                  {particleContainer}
                </motion.button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </Reorder.Item>
  );
};