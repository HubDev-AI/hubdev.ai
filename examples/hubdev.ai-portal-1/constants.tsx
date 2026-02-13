import React from 'react';
import { ProjectData } from './types';

export const PROJECTS: ProjectData[] = [
  {
    id: 'untrusted',
    name: 'Untrusted<T>',
    exe: 'SEC4_AUDIT.EXE',
    description: 'Boringly explicit, strongly typed language with proof hooks.',
    github: 'https://github.com/HubDev-AI/untrusted-compiler',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBfhHez3cbUzyxUJpmuos4yoswLiGuqnQoaz8OPnJc9L7qKC4gFbLGv2OLPKLeQcC8h-qy55wCqIpARuQmh-eX52sku_yno2Jsm0LSVnHcZzF9jAY0SZ2o9l5sRdf6xnwKpRXewfk_y4Y8UHpa8dluEkX0aGNL8Mz6OCkKHB0eoUcy43MRpOG51N9LaDkHehIU7q1NxAk7vRqlCe9EVCUeAW1DkUw6YrOmbxVXo6aDO_UTg4xfcC7N9r1SAcMkLHvI-CdmHLIGUaI',
    accent: 'cyan',
    status: 'COMPILING...',
    techStack: [
      { label: 'TOOLING', value: 'sec4Audit' },
      { label: 'CLI', value: 'sec4' },
      { label: 'EXT', value: '.ut' }
    ],
    commandPreview: '> sec4 audit ./main.ut --strict',
    overview: "A language that is 'boringly explicit,' strongly typed, and comes with built-in ways to state intent and prove properties. The real 'AI-friendliness' is in the semantics and tooling.",
    specs: [
      {
        title: "1) Core Idea: Code = Intent + Constraints",
        content: "'Effects' tells exactly what the function is allowed to do. 'Requires/Ensures' makes the intended behavior machine-checkable.",
        code: `fn transfer(from: AccountId, to: AccountId, amount: Money)
  effects { db.read, db.write }
  requires { amount > 0, balance(from) >= amount }
  ensures  { balance(from) == old(balance(from)) - amount
             balance(to)   == old(balance(to))   + amount }
  returns Result<Unit, TransferError>
{ ... }`
      },
      {
        title: "2) Types that Remove Ambiguity",
        content: "Units + domain types by default. Now the AI can't 'accidentally' pass a string where Email is required.",
        code: `type Money = decimal<2> tagged("USD")
type Email = string refined(matches_email)
type Maybe<T> = Some(T) | None`
      },
      {
        title: "3) Explicit Data Flow",
        content: "Immutable-by-default, mutation is marked. This prevents accidental side effects.",
        code: `let user = load_user(id)
let updated = user.with_email(new_email)
mut cache.put(id, updated) // mutation requires 'mut'`
      },
      {
        title: "4) Exhaustiveness Everywhere",
        content: "Pattern matching forces you to handle all cases. Less 'oops we forgot the edge case'.",
        code: `match result {
  Ok(value)      => value
  Err(NotFound)  => default
  Err(Permission)=> fail("no access")
}`
      },
      {
        title: "5) Built-in Property Tests",
        content: "Properties live next to the code. Instead of 'write some tests,' the language nudges: 'state invariants.'",
        code: `property "transfer conserves total money" {
  for_all from, to, amount where from != to {
    let before = balance(from) + balance(to)
    transfer(from, to, amount)
    assert(balance(from) + balance(to) == before)
  }
}`
      },
      {
        title: "6) Modules with Sealed Boundaries",
        content: "No 'reach into anything' by default. You import capabilities. Helps AI understand what can touch what.",
        code: `module Payments exports { transfer }
capability DbRead
capability DbWrite
fn transfer(...) requires { DbRead, DbWrite } { ... }`
      },
      {
        title: "Tooling & Ecosystem",
        content: "Pinned dependencies, deterministic compilation, standardized formatter. Use sec4Audit as the tooling brand.",
        list: [
            "Language: Untrusted<T> (.ut)",
            "Compiler/CLI: sec4",
            "Policy: sec4 audit, sec4 explain",
            "Namespace: ut/std, ut/http, ut/sec"
        ]
      }
    ]
  },
  {
    id: 'mkly',
    name: 'mkly',
    exe: 'MKLY_BUILD.DAT',
    description: 'Token-efficient markup language for structured content.',
    github: 'https://github.com/HubDev-AI/mkly',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp6tNwglyD97fxSPAjvJA63RPcsPvoH_2ylMUMNU9pyyZXjRS1X4iyUnIBSLuiVUflYYVOAvcEixmPQoEQk1tJ7r0_OK26uD4tQmMwOroLfEQGBwAIpC8JjgJnz8nmGRYDWu7KN_81q3ylQv53vKn-jhqKGceEEx5C9ki3922z__SyYntnW7wDyEdrzCmIDgF-cL3G6Px2bzC0ZZSiY61clRZEV8HwGYkZC0HUigw62330Gciim8hHMq5INgY6H0TQJ8-d7T_IwK8',
    accent: 'purple',
    status: 'OPTIMIZED',
    techStack: [
      { label: 'TYPE', value: 'Markup' },
      { label: 'TOKENS', value: '-60%' },
      { label: 'KIT', value: 'Core/Docs' }
    ],
    commandPreview: '> mkly build ./docs --kit=docs',
    overview: "A token-efficient markup language for structured content. Define blocks, apply kits, and compile to HTML — from newsletters to documentation.",
    specs: [
      {
        title: "Why mkly?",
        content: "mkly documents use 55-60% fewer tokens than equivalent HTML. For AI-generated content, that means faster output, lower cost, and fewer hallucinated closing tags.",
        type: 'info'
      },
      {
        title: "Core Concepts",
        content: "mkly is built on three core ideas:",
        list: [
            "Blocks — Flat, self-contained content units. No nesting nightmares.",
            "Kits — Reusable block collections. The 'core' kit covers layout. The 'docs' kit adds callouts.",
            "Plugins — Transform the compile pipeline. Add syntax highlighting or image optimization."
        ]
      },
      {
        title: "Example Structure",
        content: "Simple, flat structure that compiles to rich HTML.",
        code: `# mkly
@kit core
@kit docs

[hero]
  title: "Welcome"
  image: "cover.jpg"

[text]
  content: "This is a block."`
      }
    ]
  }
];
