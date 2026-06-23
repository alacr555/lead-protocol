import { type ReactNode } from 'react'
import { CircleDot } from 'lucide-react'

export function Empty({ children }: { children: ReactNode }) {
  return <div className="empty"><CircleDot />{children}</div>
}
