export const ALLOWED_ATTACHMENT_MIME_TYPES =
  Object.freeze([
    // Images
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/gif',

    // Documents
    'application/pdf',
    'text/plain',

    // Audio
    'audio/mpeg',   // mp3
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
    'audio/webm',
    'audio/mp4',
    'audio/x-m4a',

    // Video
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ] as const)