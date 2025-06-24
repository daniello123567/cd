import {create} from 'zustand'
import {type mode } from './types'

const mode = create<mode>((set)=>({
  isDarkMode:false,
  setIsDarkMode:()=>set((state)=>({isDarkMode:!state.isDarkMode}))
}));

export {mode};
