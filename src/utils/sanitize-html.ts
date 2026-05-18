import DOMPurify from 'dompurify'

export const sanitizeHtml = async (html: string) => {
  return DOMPurify.sanitize(html)
}
