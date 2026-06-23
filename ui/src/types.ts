export type View = 'Dashboard' | 'Graph' | 'Agents' | 'Active Sessions' | 'Handoff' | 'Decisions' | 'Rules' | 'Validator'
export type GraphLayout = 'directed' | 'organic' | 'radial'
export type ProtocolData = {
  generatedAt: string
  metrics: { activeSessions: number; todayDecisions: number; protocolPercent: number; alerts: number }
  protocolValid: boolean
  sessions: { id: string; agent: string; started: string; topic: string; checkpoint: string; status: string }[]
  agents: { agent: string; actor: string; activity: string; status: string; scope: string }[]
  handoff: null | { actor: string; agent: string; path: string; timestamp: string; status: string; lastAction: string; pendingStep: string; blockers: string; openThreads: string; updated: string; raw: string }
  decisions: { timestamp: string; time: string; id: string; decision: string; rationale: string; agent: string; files: string[]; status: string }[]
  files: { path: string; exists: boolean; status: string; updated: string }[]
  conflicts: { topic: string; agents: string[] }[]
  rules: { name: string; precedence: number; exists: boolean; modules?: string[] }[]
  validator: { passed: number; errors: number; checks: { path: string; exists: boolean; status: string; updated: string }[] }
}
