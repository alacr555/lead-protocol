import { type ProtocolData } from '../types'
import { Empty } from './Empty'

export function Timeline({ decisions, limit }: { decisions: ProtocolData['decisions']; limit?: number }) {
  if (!decisions.length) return <Empty>No decisions found.</Empty>
  const visibleDecisions = limit ? decisions.slice(0, limit) : decisions
  return <div className="timeline">{visibleDecisions.map(d => <div key={d.id}><i /><time>{d.time}</time><code>{d.id}</code><span title={d.rationale}>{d.decision}</span><em>{d.agent}</em></div>)}</div>
}
