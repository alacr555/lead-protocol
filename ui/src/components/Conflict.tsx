import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { type ProtocolData, type View } from '../types'

export function Conflict({ data, go }: { data: ProtocolData; go?: (v: View) => void }) {
  if (!data.conflicts.length) return <div className="ok-banner"><CheckCircle2 /><div><b>No conflicts detected</b><span>There are no overlapping scopes in active sessions.</span></div></div>
  const conflict = data.conflicts[0]
  return <div className="warning"><AlertTriangle /><div><b>Warning: conflict in scope "{conflict.topic}"</b><span>Agents involved: {conflict.agents.join(', ')}.</span></div>{go && <button onClick={() => go('Active Sessions')}>View details</button>}</div>
}
