export function InboxColumn({ children }: { children: ReactNode }) {
  return (
    <div className="
      rounded-2xl
      border border-border-subtle
      shadow-sm
      bg-bg-surface
      h-full
      min-h-0
    ">
      {children}
    </div>
  )
}