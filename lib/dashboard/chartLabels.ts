export function wrapSectionLabel(name: string, maxLen = 16): string | string[] {
  if (name.length <= maxLen) return name;

  const words = name.split(' ');
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxLen && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines.length > 1 ? lines : name;
}

export function wrapSectionLabelMultiline(name: string, maxLen = 16): string {
  const wrapped = wrapSectionLabel(name, maxLen);
  return Array.isArray(wrapped) ? wrapped.join('\n') : wrapped;
}
