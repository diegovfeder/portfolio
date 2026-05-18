import createDOMPurify, { type DOMPurify, type WindowLike } from 'dompurify'
import { JSDOM } from 'jsdom'

let serverPurifier: DOMPurify | undefined

const getServerPurifier = () => {
  serverPurifier ??= createDOMPurify(
    new JSDOM('').window as unknown as WindowLike,
  )

  return serverPurifier
}

export const sanitizeHtmlOnServer = (html: string) => {
  return getServerPurifier().sanitize(html)
}
