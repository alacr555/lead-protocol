import { type ReactNode } from 'react'

export function Panel({ title, path, children }: { title: string; path?: string; children: ReactNode }) {
  return <section className="panel"><header><h2>{title}</h2>{path && <small>{path}</small>}</header>{children}</section>
}
