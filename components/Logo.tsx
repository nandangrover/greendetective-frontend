import { Leaf } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Leaf className="h-8 w-8 text-white" />
      <div className="flex items-baseline">
        <span className="text-xl font-light tracking-tight text-white/90">Green</span>
        <span className="text-xl font-bold tracking-wide text-white">Detective</span>
      </div>
    </div>
  )
}

