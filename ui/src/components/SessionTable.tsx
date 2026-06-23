import { Code2 } from 'lucide-react'
import { type ProtocolData } from '../types'
import { Empty } from './Empty'

function displayStatus(status: string) {
  if (status === 'IN_PROGRESS') return 'Active'
  if (status === 'BLOCKED') return 'Paused'
  if (status === 'STABLE') return 'Completed'
  return status
}

export function SessionTable({ data, agents = false }: { data: ProtocolData; agents?: boolean }) {
  const rows = agents
    ? data.agents.map(a => [a.agent, a.actor, a.scope, a.activity, displayStatus(a.status)])
    : data.sessions.map(s => [s.agent, '—', s.topic, s.checkpoint || s.started, s.status])
  if (!rows.length) return <Empty>{agents ? 'No agent handoffs found.' : 'No active sessions registered.'}</Empty>
  return <div className="table"><table><thead><tr><th>Agent ID</th><th>Actor</th><th>Scope</th><th>Last activity</th><th>Status</th></tr></thead><tbody>{rows.map((s, i) => <tr key={`${s[0]}-${i}`}><td><Code2 />{s[0]}</td><td>{s[1]}</td><td title={s[2]}>{s[2]}</td><td>{s[3]}</td><td><em className={String(s[4]).toLowerCase()}><i />{s[4]}</em></td></tr>)}</tbody></table></div>
}
