import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  minimal?: boolean
}

export function Logo({ minimal = false }: LogoProps) {
  return (
    <Link href="/" className="hover:opacity-90 transition-opacity">
      <div className="flex items-center space-x-1">
        <Image 
          src="/images/logo.png"
          alt="Green Detective Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        {!minimal && (
          <div className="flex items-baseline">
            <span className="text-xl font-light tracking-tight text-white/90">Green</span>
            <span className="text-xl font-bold tracking-wide text-white">Detective</span>
          </div>
        )}
      </div>
    </Link>
  )
}
