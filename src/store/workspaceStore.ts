import { create } from 'zustand';

export type ModelType = 
  | 'gpt-4-turbo-preview'
  | 'gpt-4-turbo-preview-mini'
  | 'claude-3-sonnet'
  | 'gemini-pro-1.5'
  | 'llama-3.2'
  | 'perplexity';

interface ChatWindow {
  id: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  model: ModelType;
  apiKey: string;
  isPinned: boolean;
  isExpanded: boolean;
}

interface WorkspaceState {
  chatWindows: ChatWindow[];
  isFuryMode: boolean;
  transcriptionApiKey: string;
  selectedModel: ModelType;
  addChatWindow: () => void;
  removeChatWindow: (id: string) => void;
  updateChatWindow: (id: string, updates: Partial<ChatWindow>) => void;
  toggleFuryMode: () => void;
  setTranscriptionApiKey: (key: string) => void;
  setSelectedModel: (model: ModelType) => void;
  togglePinWindow: (id: string) => void;
  toggleExpandWindow: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  chatWindows: [],
  isFuryMode: false,
  transcriptionApiKey: '',
  selectedModel: 'gpt-4-turbo-preview',
  addChatWindow: () =>
    set((state) => ({
      chatWindows: [
        ...state.chatWindows,
        {
          id: crypto.randomUUID(),
          position: { x: 0, y: 0 },
          size: { width: 400, height: 600 },
          model: state.selectedModel,
          apiKey: '',
          isPinned: false,
          isExpanded: false,
        },
      ],
    })),
  removeChatWindow: (id) =>
    set((state) => ({
      chatWindows: state.chatWindows.filter((window) => window.id !== id),
    })),
  updateChatWindow: (id, updates) =>
    set((state) => ({
      chatWindows: state.chatWindows.map((window) =>
        window.id === id ? { ...window, ...updates } : window
      ),
    })),
  toggleFuryMode: () =>
    set((state) => ({
      isFuryMode: !state.isFuryMode,
    })),
  setTranscriptionApiKey: (key) =>
    set(() => ({
      transcriptionApiKey: key,
    })),
  setSelectedModel: (model) =>
    set(() => ({
      selectedModel: model,
    })),
  togglePinWindow: (id) =>
    set((state) => ({
      chatWindows: state.chatWindows.map((window) =>
        window.id === id ? { ...window, isPinned: !window.isPinned } : window
      ),
    })),
  toggleExpandWindow: (id) =>
    set((state) => ({
      chatWindows: state.chatWindows.map((window) =>
        window.id === id ? { ...window, isExpanded: !window.isExpanded } : window
      ),
    })),
}));