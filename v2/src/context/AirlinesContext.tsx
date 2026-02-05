import { createContext } from 'react';
import type { AirlinesContextType } from '../types/context';

export const AirlinesContext = createContext<AirlinesContextType | null>(null);