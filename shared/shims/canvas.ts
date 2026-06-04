/**
 * Required for @react-pdf-viewer/pdfjs-dist on Next.js 16.
 *
 * Turbopack attempts to resolve the Node-only `canvas`
 * dependency during build analysis even though the PDF
 * viewer is client-only.
 *
 * This shim prevents build failures on Vercel.
 */
export {}