import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CountWords, plainText } from '@/utils/StoreUtils';
import { Pen } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';

function StoreProfile({
  store,
}: {
  store: { name: string; description: string; imageUrl: string };
}) {
  const [isNameEditable, setisNameEditable] = useState(false);
  const [isDescriptionEditable, setisDescriptionEditable] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useState('');
  console.log(text);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setisNameEditable(false);
      setisDescriptionEditable(false);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLParagraphElement>) => {
    const MAX_WORDS = 20;
    const el = e.currentTarget;
    const PlainText = plainText(el);
    const words = CountWords(PlainText);

    if (words > MAX_WORDS) {
      el.innerText = PlainText.split(' ').splice(0, MAX_WORDS).join(' ');

      
      const range = document.createRange();
      const sel = window.getSelection();

      range.selectNodeContents(el); // limit range to the element
      range.collapse(false); // place cursor at the end

      sel?.removeAllRanges(); // clear existing selection
      sel?.addRange(range); // apply new cursor position

      toast.error('You reached the maximum 100 words length');
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="flex gap-5">
      <div className="size-20 md:size-26 lg:size-32 shrink-0 relative rounded-full  border p-1">
        <img
          src={`${imagePreview.length > 0 ? imagePreview : store.imageUrl}`}
          alt=""
          height={50}
          width={50}
          className="size-full object-cover rounded-full"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          hidden
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              const blob = URL.createObjectURL(file);
              setImagePreview(blob);
            }
          }}
        />

        <Button
          className={cn('size-7 p-1 cursor-pointer absolute bottom-2 right-3')}
          onClick={() => {
            fileInput.current?.click();
          }}
        >
          <Pen size={20} className="bg-amber-500 p-1 rounded-full text-black" />
        </Button>
      </div>

      <div className="flex gap-2 flex-col">
        <div className="flex items-center gap-3">
          <h1
            onKeyDown={handleKeyDown}
            onBlur={e => setText(e.target.innerText)}
            contentEditable={isNameEditable}
            className="text-xl md:text-2xl lg:text-3xl border-none outline-none focus:border-none focus:outline-none font-semibold"
          >
            {store.name}
          </h1>
          <Button
            className={cn(
              'size-7 p-1 cursor-pointer',
              isNameEditable && 'hidden'
            )}
            onClick={() => setisNameEditable(true)}
          >
            <Pen
              size={20}
              className="bg-amber-500 p-1 rounded-full text-black"
            />
          </Button>
        </div>
        <div className="flex gap-2">
          <p
            contentEditable={isDescriptionEditable}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            onBlur={e => setText(e.target.innerText)}
            className="text-xs md:sm text-gray-300  max-w-45 md:max-w-50 lg:max-w-90 focus:outline-none"
          >
            {store.description}
          </p>
          <Button
            className={cn(
              'size-7 p-1 cursor-pointer',
              isDescriptionEditable && 'hidden'
            )}
            onClick={() => setisDescriptionEditable(true)}
          >
            <Pen
              size={20}
              className="bg-amber-500 p-1 rounded-full text-black"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StoreProfile;
