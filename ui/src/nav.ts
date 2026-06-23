import { Activity, Bot, ClipboardCheck, FileCode2, GitCommitHorizontal, Handshake, LayoutDashboard, Network } from 'lucide-react'
import { type View } from './types'

export const viewLabels: Record<View, string> = { Dashboard: 'Overview', Graph: 'Graph', Agents: 'Agents', 'Active Sessions': 'Sessions', Handoff: 'Handoff', Decisions: 'Decisions', Rules: 'Rules', Validator: 'Validator' }
export const viewSlugs: Record<View, string> = { Dashboard: 'dashboard', Graph: 'graph', Agents: 'agents', 'Active Sessions': 'sessions', Handoff: 'handoff', Decisions: 'decisions', Rules: 'rules', Validator: 'validator' }
export const initialView = (): View => (Object.keys(viewSlugs) as View[]).find(view => viewSlugs[view] === window.location.hash.slice(1)) ?? 'Dashboard'
export const initialSidebar = (): boolean => new URLSearchParams(window.location.search).get('sidebar') === 'collapsed' || window.localStorage.getItem('lead-protocol-sidebar') === 'collapsed'
export const nav: { view: View; icon: typeof LayoutDashboard }[] = [
  { view: 'Dashboard', icon: LayoutDashboard }, { view: 'Graph', icon: Network }, { view: 'Agents', icon: Bot },
  { view: 'Active Sessions', icon: Activity }, { view: 'Handoff', icon: Handshake },
  { view: 'Decisions', icon: GitCommitHorizontal }, { view: 'Rules', icon: FileCode2 },
  { view: 'Validator', icon: ClipboardCheck },
]
