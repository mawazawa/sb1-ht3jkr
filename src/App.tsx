import React from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import ReactFlow, { Background } from 'reactflow';
import { useWorkspaceStore } from './store/workspaceStore';
import { VoiceClipPro } from './components/VoiceClipPro';
import { ChatWindow } from './components/ChatWindow';
import 'reactflow/dist/style.css';

function App() {
  const { chatWindows, isFuryMode } = useWorkspaceStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover opacity-10" />
      
      <motion.div
        className={`relative h-screen ${
          isFuryMode ? 'overflow-hidden' : 'grid grid-cols-3 gap-4 p-4'
        }`}
        animate={isFuryMode ? { scale: 1.1 } : { scale: 1 }}
      >
        <Reorder.Group
          axis="y"
          values={chatWindows.map(w => w.id)}
          onReorder={() => {}}
          className={isFuryMode ? '' : 'grid grid-cols-3 gap-4'}
        >
          <AnimatePresence>
            {chatWindows.map((window) => (
              <ChatWindow
                key={window.id}
                id={window.id}
                model={window.model}
                apiKey={window.apiKey}
                isPinned={window.isPinned}
                isExpanded={window.isExpanded}
              />
            ))}
          </AnimatePresence>
        </Reorder.Group>

        {isFuryMode && (
          <ReactFlow
            className="absolute inset-0 -z-10"
            nodes={[]}
            edges={[]}
            fitView
          >
            <Background
              color="#fff"
              style={{ backgroundColor: 'transparent' }}
            />
          </ReactFlow>
        )}
      </motion.div>

      <VoiceClipPro />
    </div>
  );
}

export default App;