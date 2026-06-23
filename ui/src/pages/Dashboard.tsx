import { useState } from 'react'
import { AlertTriangle, ArrowRight, CircleDot, FileText, GitCommitHorizontal, Network, RefreshCw, ShieldCheck, Users } from 'lucide-react'
import { type ProtocolData, type View, type GraphLayout } from '../types'
import { Panel } from '../components/Panel'
import { Metric } from '../components/Metric'
import { SessionTable } from '../components/SessionTable'
import { Timeline } from '../components/Timeline'
import { Conflict } from '../components/Conflict'
import { Empty } from '../components/Empty'

export function Dashboard({ data, go, reload, openGraph }: { data: ProtocolData; go: (v: View) => void; reload: () => void; openGraph: (layout: GraphLayout) => void }) {
  const h = data.handoff
  const [graphLayout, setGraphLayout] = useState<GraphLayout>(() => {
    const value = new URLSearchParams(window.location.search).get('layout')
    return value === 'organic' || value === 'radial' ? value : 'directed'
  })
  return <>
    <div className="metrics"><Metric icon={Users} label="Active sessions" value={String(data.metrics.activeSessions)} tone="violet" onClick={() => go('Active Sessions')} /><Metric icon={GitCommitHorizontal} label="Decisions today" value={String(data.metrics.todayDecisions)} tone="blue" onClick={() => go('Decisions')} /><Metric icon={ShieldCheck} label="Integrity" value={`${data.metrics.protocolPercent}%`} tone="green" onClick={() => go('Validator')} /><Metric icon={AlertTriangle} label="Alerts" value={String(data.metrics.alerts)} tone="amber" onClick={() => go('Active Sessions')} /></div>
    <section className="graph-launcher"><div><span><Network /></span><p><b>Operational graph</b><small>Explore agents, decisions, files, and relationships using current data.</small></p></div><label>View<select value={graphLayout} onChange={event => setGraphLayout(event.target.value as GraphLayout)}><option value="directed">Directed</option><option value="organic">Organic</option><option value="radial">Radial</option></select></label><button className="primary" onClick={() => openGraph(graphLayout)}>Open graph <ArrowRight /></button></section>
    <div className="grid"><div className="stack"><Panel title="Latest handoff" path={h?.path ?? '.agents/local/*/*/handoff.md'}>{h ? <><div className="markdown"><b>Last action:</b><p>{h.lastAction}</p><b>Next step:</b><p>{h.pendingStep}</p><b>Blockers/Context:</b><p>{h.blockers}</p><b>Open threads:</b><p>{h.openThreads}</p></div><footer><span>Updated {h.updated} by {h.agent}</span><button className="primary" onClick={() => go('Handoff')}>Open handoff</button></footer></> : <Empty>No handoff found.</Empty>}</Panel><Panel title="Recent decisions" path=".agents/decisions.jsonl"><Timeline decisions={data.decisions} limit={8} /><button className="link" onClick={() => go('Decisions')}>View all decisions <ArrowRight /></button></Panel></div>
      <div className="stack"><Panel title="Active sessions" path=".agents/sessions/active_sessions.md"><SessionTable data={data} /><button className="link" onClick={() => go('Active Sessions')}>View all sessions <ArrowRight /></button></Panel><Panel title="Protocol files"><div className="files">{data.files.map(file => <div key={file.path}><FileText /><b>{file.path}</b><span>{file.updated}</span><em className={file.exists ? '' : 'missing'}><CircleDot /> {file.status}</em></div>)}</div><button className="link" onClick={() => go('Rules')}>View rules <ArrowRight /></button></Panel></div></div>
    <Conflict data={data} go={go} /><button className="validate" onClick={reload}><RefreshCw /> Refresh data now</button>
  </>
}
