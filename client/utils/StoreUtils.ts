export const plainText = (e: HTMLElement) => {
  return e.innerText.replace(/\s+/g, ' ').trim();
};
export const CountWords = (text: string) => {
  return text.length === 0 ? 0 : text.split(' ').length;
};
