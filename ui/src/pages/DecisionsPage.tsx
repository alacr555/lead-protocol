import { useState } from 'react'
import { type ProtocolData } from '../types'
import { Panel } from '../components/Panel'
import { Timeline } from '../components/Timeline'

export function DecisionsPage({ data }: { data: ProtocolData }) {
  const [query, setQuery] = useState('')
  const [agent, setAgent] = useState('')
  const [status, setStatus] = useState('')
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')
  const agents = [...new Set(data.decisions.map(decision => decision.agent))].sort()
  const statuses = [...new Set(data.decisions.map(decision => decision.status))].sort()
  const filtered = data.decisions.filter(decision => {
    const searchable = [decision.id, decision.decision, decision.rationale, decision.agent, decision.status].join(' ').toLocaleLowerCase('pt-BR')
    return (!normalizedQuery || searchable.includes(normalizedQuery)) && (!agent || decision.agent === agent) && (!status || decision.status === status)
  })

  return <Panel title="Decision timeline" path=".agents/decisions.jsonl">
    <div className="filters">
      <input aria-label="Search decisions" placeholder="Search decisions..." value={query} onChange={event => setQuery(event.target.value)} />
      <select aria-label="Filter by agent" value={agent} onChange={event => setAgent(event.target.value)}><option value="">All agents</option>{agents.map(item => <option key={item} value={item}>{item}</option>)}</select>
      <select aria-label="Filter by status" value={status} onChange={event => setStatus(event.target.value)}><option value="">All statuses</option>{statuses.map(item => <option key={item} value={item}>{item}</option>)}</select>
    </div>
    <div className="filter-result">{filtered.length} {filtered.length === 1 ? 'decision found' : 'decisions found'}</div>
    <Timeline decisions={filtered} />
    {filtered[0] && <pre className="json">{JSON.stringify(filtered[0], null, 2)}</pre>}
  </Panel>
}
