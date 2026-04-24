'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-lg font-semibold">
          Something went wrong
        </h2>

        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Try again
        </button>
      </div>
    </div>
  )
}