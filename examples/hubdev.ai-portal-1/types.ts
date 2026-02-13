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

export interface Size {
  width: number;
  height: number | string;
}

export interface DesktopWindow {
  id: string;
  type: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: Position;
  size: Size;
  content?: ReactNode;
  accentColor: 'cyan' | 'purple' | 'red' | 'yellow';
}

export interface ProjectSection {
  title: string;
  content: string | ReactNode; // Allow rich text/JSX
  code?: string;
  list?: string[];
  type?: 'feature' | 'warning' | 'info';
}

export interface ProjectData {
  id: string;
  name: string;
  exe: string;
  description: string;
  github: string;
  imageUrl: string;
  accent: 'cyan' | 'purple' | 'red';
  status: string;
  techStack: { label: string; value: string }[];
  commandPreview?: string;
  // New Rich Content Fields
  overview: string;
  specs: ProjectSection[];
}
