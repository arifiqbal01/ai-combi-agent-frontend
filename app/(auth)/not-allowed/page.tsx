export default function NotAllowedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-lg font-semibold">
          Access restricted
        </h1>
        <p className="text-sm text-muted">
          You need an invitation to access this platform.
        </p>
      </div>
    </div>
  )
}