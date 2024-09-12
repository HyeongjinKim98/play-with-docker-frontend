import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PromptState {
    lines: string[];
    commands: string[];
    index: number;
    pushLines: (lines: string[]) => void;
    pushCommand: (command: string) => void;
    clear: () => void;
    prevCommand: () => string;
    nextCommand: () => string;
    setIndexToTop: () => void;
}

export const PromptStore = create(
    persist<PromptState>(
        (set, get) => ({
            lines: [],
            commands: [],
            index: -1,
            pushLines: (lineInputs: string[]) => {
                set((state) => ({
                    lines: [...state.lines, ...lineInputs],
                }));
            },
            pushCommand: (command: string) => {
                set((state) => ({
                    commands: [...state.commands, command],
                }));
            },
            clear: () => {
                set(() => ({
                    lines: [],
                }));
            },
            prevCommand: () => {
                const { commands, index } = get();
                const newIndex = Math.max(0, index - 1); 
                set({ index: newIndex });
                return commands[newIndex] || '';
            },
            nextCommand: () => {
                const { commands, index } = get();
                const newIndex = Math.min(commands.length - 1, index + 1); 
                set({ index: newIndex });
                return commands[newIndex] || '';
            },
            setIndexToTop: () => {
                const {commands} = get();
                set(() => ({
                    index: commands.length
                }));
            },
        }),
        {
            name: 'prompt',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
