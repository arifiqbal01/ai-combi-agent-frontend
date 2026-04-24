import { Message } from '@/features/inbox/domain/message'

/*
 Detect if content already contains HTML.
 If yes → trust backend and do nothing.
*/

function containsHtml(body:string):boolean{

 return /<[^>]+>/i.test(body)

}

/*
 Convert plain text URLs into safe anchors.
 Does NOT run on HTML.
 Language agnostic (structure based).
*/

function linkifyPlainText(body: string): string {
  return body.replace(
    /(https?:\/\/[^\s"<>()]+)/gi,
    (url) => {
      try {
        const parsed = new URL(url)

        // 👉 show clean domain only
        const label = parsed.hostname.replace(/^www\./, '')

        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`
      } catch {
        return url // fallback if URL parsing fails
      }
    }
  )
}

/*
 Normalize spacing only for text emails.
 Preserves message meaning.
*/

function normalizeTextSpacing(body:string):string{

 body = body.replace(
  /\r\n/g,
  '\n'
 )

 body = body.replace(
  /\n{3,}/g,
  '\n\n'
 )

 return body.replace(
  /\n/g,
  '<br/>'
 )

}

/*
 Safe rendering enhancement.
 NOT normalization (backend owns normalization).
*/

export function enhanceMessageBody(
 body:string
):string{

 if(!body)
  return body

 /*
  If HTML exists:
  Trust backend formatting.
 */

 if(containsHtml(body))
  return body

 let enhanced = body

 enhanced =
  linkifyPlainText(enhanced)

 enhanced =
  normalizeTextSpacing(enhanced)

 return enhanced.trim()

}

/*
 Message enhancer (domain safe)
*/

export function enhanceMessage(
 message:Message
):Message{

 if(!message.bodyHtml)
  return message

 return{

  ...message,

  bodyHtml:
   enhanceMessageBody(
    message.bodyHtml
   )

 }

}