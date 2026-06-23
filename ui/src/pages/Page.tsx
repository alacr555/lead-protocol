import { AlertTriangle, CheckCircle2, ClipboardCheck, X } from 'lucide-react'
import GraphView from '../GraphView'
import { type ProtocolData, type View } from '../types'
import { Panel } from '../components/Panel'
import { SessionTable } from '../components/SessionTable'
import { Conflict } from '../components/Conflict'
import { Empty } from '../components/Empty'
import { DecisionsPage } from './DecisionsPage'

export function Page({ view, data, reload }: { view: Exclude<View, 'Dashboard'>; data: ProtocolData; reload: () => void }) {
  if (view === 'Graph') return <GraphView data={data} reload={reload} />
  if (view === 'Agents') return <Panel title="Agents found" path=".agents/local/*/*/handoff.md"><SessionTable data={data} agents /></Panel>
  if (view === 'Active Sessions') return <div className="stack"><Conflict data={data} /><Panel title="Concurrent sessions" path=".agents/sessions/active_sessions.md"><SessionTable data={data} /></Panel></div>
  if (view === 'Handoff') {
    const h = data.handoff
    return <Panel title="Current handoff" path={h?.path}>{h ? <><div className="editor"><div><small>ORIGINAL CONTENT</small><pre>{h.raw}</pre></div><div><small>OPERATIONAL SUMMARY</small><h2>{h.status}</h2><h3>Last action</h3><p>{h.lastAction}</p><h3>Next step</h3><p>{h.pendingStep}</p><h3>Blockers/Context</h3><p>{h.blockers}</p></div></div><footer><span>{h.timestamp} · {h.actor}/{h.agent}</span><button className="primary" onClick={reload}>Reload</button></footer></> : <Empty>No handoff found.</Empty>}</Panel>
  }
  if (view === 'Decisions') return <DecisionsPage data={data} />
  if (view === 'Rules') return <div className="cards">{data.rules.map(rule => <Panel title={rule.name} key={rule.name}><div className="rule">{rule.exists ? <CheckCircle2 /> : <AlertTriangle />}<b>Precedence {rule.precedence}</b><p>{rule.modules?.length ? `Active modules: ${rule.modules.join(', ')}` : rule.name === 'Active modules' ? 'No active modules declared.' : rule.exists ? 'File found.' : 'File missing.'}</p></div></Panel>)}</div>
  return <div className="stack"><Panel title="Validator" path="Operational structure integrity"><div className="summary"><div><ClipboardCheck /><strong>{data.validator.checks.length}</strong><span>Checks</span></div><div><CheckCircle2 /><strong>{data.validator.passed}</strong><span>Passed</span></div><div><X /><strong>{data.validator.errors}</strong><span>Errors</span></div></div><footer><span>Generated at {new Date(data.generatedAt).toLocaleString('en-US')}</span><button className="primary" onClick={reload}>Run again</button></footer></Panel><Panel title="Results"><div className="checks">{data.validator.checks.map(check => <div key={check.path}>{check.exists ? <CheckCircle2 /> : <X />}{check.path}<span>{check.status}</span></div>)}</div></Panel></div>
}
