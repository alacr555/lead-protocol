import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle2, CircleDot, GitBranch, LockKeyhole, Menu, PanelLeftClose, PanelLeftOpen, RefreshCw, X } from 'lucide-react'
import { type ProtocolData, type View, type GraphLayout } from './types'
import { viewLabels, viewSlugs, nav, initialView, initialSidebar } from './nav'
import { Dashboard } from './pages/Dashboard'
import { Page } from './pages/Page'
import './graph-launcher.css'
import './sidebar-collapse.css'
import './graph-full-area.css'

export default function LiveApp() {
  const [view, setView] = useState<View>(initialView), [menu, setMenu] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(initialSidebar)
  const [data, setData] = useState<ProtocolData | null>(null), [error, setError] = useState(''), [loading, setLoading] = useState(true)
  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`./api/protocol?t=${Date.now()}`, { cache: 'no-store' })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error ?? `HTTP ${response.status}`)
      setData(payload as ProtocolData)
    } catch (reason) {
      setError(`Unable to load operational data: ${reason instanceof Error ? reason.message : 'unknown error'}`)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { void load() }, [])
  const go = (v: View) => { setView(v); setMenu(false); window.history.replaceState(null, '', `#${viewSlugs[v]}`); window.scrollTo(0, 0) }
  const openGraph = (layout: GraphLayout) => { const url = new URL(window.location.href); if (layout === 'directed') url.searchParams.delete('layout'); else url.searchParams.set('layout', layout); window.history.replaceState(null, '', url); go('Graph') }
  const toggleSidebar = () => setSidebarCollapsed(value => { const next = !value; const url = new URL(window.location.href); if (next) url.searchParams.set('sidebar', 'collapsed'); else url.searchParams.delete('sidebar'); window.history.replaceState(null, '', url); window.localStorage.setItem('lead-protocol-sidebar', next ? 'collapsed' : 'expanded'); return next })
  const actor = data?.handoff?.actor ?? 'local'
  return <div className={`app ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${view === 'Graph' ? 'graph-active' : ''}`}><aside className={menu ? 'open' : ''}><div className="brand"><b><GitBranch /></b><span><strong>Lead Protocol</strong><small>Console</small></span><button className="sidebar-toggle" aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={toggleSidebar}>{sidebarCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</button><button className="mobile-close" aria-label="Close menu" onClick={() => setMenu(false)}><X /></button></div><nav>{nav.map(({ view: target, icon: Icon }) => <button key={target} title={sidebarCollapsed ? viewLabels[target] : undefined} className={view === target ? 'active' : ''} onClick={() => go(target)}><Icon /><span>{viewLabels[target]}</span></button>)}</nav><div className="status"><small>PROTOCOL STATUS</small><b className={data?.protocolValid ? '' : 'invalid'}>{data?.protocolValid ? <CheckCircle2 /> : <AlertTriangle />}{data?.protocolValid ? 'Valid' : 'Has errors'}</b><p>Monitoring updated on demand.</p><button onClick={load} disabled={loading}>{loading ? 'Updating...' : 'Refresh now'}</button></div><footer><LockKeyhole /><span>Secure local environment</span></footer></aside>{menu && <button className="scrim" aria-label="Close menu" onClick={() => setMenu(false)} />}
    <main><header className="topbar"><div><button className="menu" aria-label="Open menu" onClick={() => setMenu(true)}><Menu /></button><span><h1>{viewLabels[view]}</h1><p>Operational view · {loading ? 'updating...' : 'synchronized'}</p></span></div><div className="profile"><span><CircleDot /> {loading ? 'Updating' : 'Synchronized'}</span><b>{actor.slice(0, 2).toUpperCase()}</b><strong>{actor}</strong></div></header><div className="content">{error ? <div className="warning"><AlertTriangle /><div><b>Failed to load data</b><span>{error}</span></div><button onClick={load}>Try again</button></div> : !data ? <div className="loading"><RefreshCw /> Loading operational data...</div> : view === 'Dashboard' ? <Dashboard data={data} go={go} reload={load} openGraph={openGraph} /> : <Page view={view} data={data} reload={load} />}</div></main>
  </div>
}
