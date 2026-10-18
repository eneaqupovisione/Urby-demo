/* Table requests are composed client-side and handed to a chat link (or
   copied). Nothing is sent from this page. */

export const MAX_NAME = 80
export const MAX_NOTE = 500

// strips control characters (keeps \t, \n, \r) before text reaches the chat link
// eslint-disable-next-line no-control-regex
const clean = (s, max) => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max)

export function buildRequest({ people, date, time, name, note }) {
  const n = clean(name, MAX_NAME)
  if (!n) return null
  let msg = `Table for ${clean(people, 2)} · ${clean(date, 10)} at ${clean(time, 5)}\nName: ${n}`
  const a = clean(note, MAX_NOTE)
  if (a) msg += `\nNote: ${a}`
  return msg
}

/**
 * Only https templates containing {msg} are accepted, so a misconfigured env
 * value can never turn the button into a javascript: or http: link.
 */
export function buildBotUrl(template, msg) {
  if (!template || !msg) return ''
  let url
  try {
    url = new URL(template.replace('{msg}', encodeURIComponent(msg)))
  } catch {
    return ''
  }
  if (url.protocol !== 'https:' || !template.includes('{msg}')) return ''
  return url.href
}
