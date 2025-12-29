import { toast } from 'sonner';

export const plainText = (e: HTMLElement) => {
  return e.innerText.replace(/\s+/g, ' ').trim();
};
export const CountWords = (text: string) => {
  return text.length === 0 ? 0 : text.split(' ').length;
};

export const handleEditabble = (
  e: React.FormEvent<HTMLParagraphElement>,
  length: number
) => {
  const el = e.currentTarget;
  const text = plainText(el);
  const words = CountWords(text);

  if (words > length) {
    e.preventDefault();
    el.innerText = text.split(' ').splice(0, length).join(' ');

    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);

    toast.error(`You reached your maximum ${length} words.`);
  }
};

export const GetDate = (isoDate: string | Date) => {
  return new Date(isoDate).toLocaleString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
};
