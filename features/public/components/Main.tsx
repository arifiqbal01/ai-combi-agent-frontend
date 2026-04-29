type Props = {
  children: React.ReactNode
  className?: string
}

export function Main({ children, className }: Props) {
  return (
    <main className="flex-1">
      <div className={`mx-auto max-w-5xl px-1 py-2 ${className || ''}`}>
        {children}
      </div>
    </main>
  )
}