import { ReactNode } from 'react';

export enum WindowType {
  PROJECT = 'PROJECT',
  TERMINAL = 'TERMINAL',
  DOCS = 'DOCS',
  SYSTEM = 'SYSTEM'
}

export interface Position {
  x: number;
  y: number;
}

export interface DesktopWindow {
  id: string;
  type: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: Position;
  content?: ReactNode;
  width?: number;
  height?: number;
  accentColor: 'cyan' | 'purple' | 'red' | 'yellow';
}

export interface ProjectData {
  id: string;
  name: string;
  exe: string;
  description: string;
  longDescription: string;
  github: string;
  features: string[];
  imageUrl: string;
  accent: 'cyan' | 'purple' | 'red';
  status: string;
  techStack: { label: string; value: string }[];
  commandPreview?: string;
  codeSnippet?: string;
}
