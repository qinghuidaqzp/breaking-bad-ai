export interface Character {
  id: string;
  name: string;
  alias?: string;
  image: string;
  description: string;
  themeColor: string;
  systemInstruction: string;
  quote: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export enum ViewState {
  HOME = 'HOME',
  CHAT = 'CHAT',
  GALLERY = 'GALLERY'
}