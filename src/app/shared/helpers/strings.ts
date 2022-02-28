export function unescapeHtml(str: string) {
  const encodings = [
    '&quot;',
    '&#39;',
    '&#x3A;',
    '&#x3A;',
    '&lt;',
    '&gt;',
    '&amp;'
  ];
  let unscape = String(str)
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x3A;/g, ':')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  if (!encodings.some((encoding) => unscape.includes(encoding))) {
    return unscape;
  }
  return unescapeHtml(unscape);
}
