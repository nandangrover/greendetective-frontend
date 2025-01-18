import { Leaf } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Leaf className="h-8 w-8 text-primary" />
      <span className="text-xl font-semibold text-primary">GreenDetective</span>
    </div>
  )
}

