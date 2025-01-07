const TextSizeEnum = {
  'text-xs': 'text-xs',
  'text-sm': 'text-sm',
  'text-md': 'text-md',
  'text-lg': 'text-lg',
  'text-xl': 'text-xl',
  'text-2xl': 'text-2xl',
  'text-3xl': 'text-3xl',
  'text-4xl': 'text-4xl',
  'text-5xl': 'text-5xl',
  'text-6xl': 'text-6xl',
  'text-7xl': 'text-7xl',
  'text-8xl': 'text-8xl',
  'text-9xl': 'text-9xl',
}
export function Header({
  id,
  children,
  className,
  color,
  size = 'text-md'
}: {
  id?: string,
  children?: React.ReactNode,
  className?: string,
  color?: string,
  size?: keyof typeof TextSizeEnum
}) {

  return children ? (
    <header id={id} style={{ color: color }} className={`h-16 flex items-center justify-between border-b border-[var(--border-secondary)] ${className} ${TextSizeEnum[size]} `}>
      {children}
    </header>
  ) : null;
}

export default Header;
