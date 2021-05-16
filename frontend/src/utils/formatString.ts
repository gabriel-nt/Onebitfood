export function formatString(text: string, num: number) {
  if (text.length <= num) {
    return text;
  }

  return `${text.slice(0, num) }...`;
}