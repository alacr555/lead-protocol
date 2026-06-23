import { type ElementType } from 'react'

export function Metric({ icon: Icon, label, value, tone, onClick }: { icon: ElementType; label: string; value: string; tone: string; onClick: () => void }) {
  return <article className="metric"><div className={tone}><Icon /></div><span>{label}<strong>{value}</strong><button onClick={onClick}>View details</button></span></article>
}
