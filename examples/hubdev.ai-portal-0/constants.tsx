import { ProjectData } from './types';

export const PROJECTS: ProjectData[] = [
  {
    id: 'untrusted',
    name: 'Untrusted<T>',
    exe: 'AILANG.EXE', // Renaming visually in UI, but keeping ID ref
    description: 'Boringly explicit, strongly typed language with proof hooks.',
    longDescription: 'A language that is boringly explicit, strongly typed, and comes with built-in ways to state intent and prove properties. The syntax is simple, but the semantics are AI-friendly.',
    github: 'https://github.com/HubDev-AI/untrusted-compiler',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBfhHez3cbUzyxUJpmuos4yoswLiGuqnQoaz8OPnJc9L7qKC4gFbLGv2OLPKLeQcC8h-qy55wCqIpARuQmh-eX52sku_yno2Jsm0LSVnHcZzF9jAY0SZ2o9l5sRdf6xnwKpRXewfk_y4Y8UHpa8dluEkX0aGNL8Mz6OCkKHB0eoUcy43MRpOG51N9LaDkHehIU7q1NxAk7vRqlCe9EVCUeAW1DkUw6YrOmbxVXo6aDO_UTg4xfcC7N9r1SAcMkLHvI-CdmHLIGUaI',
    accent: 'cyan',
    status: 'OPTIMIZING...',
    features: [
      'Core: Code = Intent + Constraints',
      'Types: Removes Ambiguity',
      'Security: Capability-based Access'
    ],
    techStack: [
      { label: 'TOOLING', value: 'sec4Audit' },
      { label: 'CLI', value: 'sec4' },
      { label: 'EXT', value: '.ut' }
    ],
    commandPreview: '> sec4 audit ./main.ut',
    codeSnippet: `fn transfer(from: AccountId, to: AccountId, amount: Money)
  effects { db.read, db.write }
  requires { amount > 0, balance(from) >= amount }
  ensures  { balance(from) == old(balance(from)) - amount
             balance(to)   == old(balance(to))   + amount }
  returns Result<Unit, TransferError>
{ ... }`
  },
  {
    id: 'mkly',
    name: 'mkly',
    exe: 'MILKLY.DAT',
    description: 'Token-efficient markup language for structured content.',
    longDescription: 'Define blocks, apply kits, and compile to HTML. mkly documents use 55-60% fewer tokens than equivalent HTML.',
    github: 'https://github.com/HubDev-AI/mkly',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp6tNwglyD97fxSPAjvJA63RPcsPvoH_2ylMUMNU9pyyZXjRS1X4iyUnIBSLuiVUflYYVOAvcEixmPQoEQk1tJ7r0_OK26uD4tQmMwOroLfEQGBwAIpC8JjgJnz8nmGRYDWu7KN_81q3ylQv53vKn-jhqKGceEEx5C9ki3922z__SyYntnW7wDyEdrzCmIDgF-cL3G6Px2bzC0ZZSiY61clRZEV8HwGYkZC0HUigw62330Gciim8hHMq5INgY6H0TQJ8-d7T_IwK8',
    accent: 'purple',
    status: 'IDLE',
    features: [
      'Blocks: Flat, self-contained units',
      'Kits: Reusable block collections',
      'Plugins: Transform compile pipeline'
    ],
    techStack: [
      { label: 'TYPE', value: 'Markup' },
      { label: 'EFFICIENCY', value: '+60%' },
      { label: 'KIT', value: 'Core/Docs' }
    ],
    commandPreview: '> mkly build ./docs',
    codeSnippet: `## Why mkly?

> **Token Efficiency:** mkly documents use 
55-60% fewer tokens than equivalent HTML.

- **Blocks** — Flat, self-contained.
- **Kits** — Reusable collections.
- **Plugins** — Transform pipeline.`
  }
];
