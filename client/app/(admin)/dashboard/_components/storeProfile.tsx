import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { handleEditabble,} from '@/utils/StoreUtils';
import { FormDataInteface, PreviewImagesInteface } from '@/utils/types';
import { Pen } from 'lucide-react';
import React, { SetStateAction, useRef, useState } from 'react';

interface StoreProfileProps {
  store: { name: string; description: string; imageUrl: string };
  setFormData: React.Dispatch<SetStateAction<FormDataInteface>>;
  setImagesPreview: React.Dispatch<SetStateAction<PreviewImagesInteface>>;
  imagesPreviews: PreviewImagesInteface;
}

function StoreProfile({
  store,
  setFormData,
  imagesPreviews,
  setImagesPreview,
}: StoreProfileProps) {
  const [isNameEditable, setisNameEditable] = useState(false);
  const [isDescriptionEditable, setisDescriptionEditable] = useState(false);
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setisNameEditable(false);
      setisDescriptionEditable(false);
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
          src={`${imagesPreviews.avatar.length > 0 ? imagesPreviews.avatar : store.imageUrl}`}
          alt=""
          height={50}
          width={50}
          className="size-full object-cover rounded-full"
        />
        <input
          type="file"
          accept="image/*"
          ref={avatarRef}
          hidden
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              const blob = URL.createObjectURL(file);
              setImagesPreview(prev => ({...prev, avatar: blob}))
              setFormData(prev => ({...prev, avatar: file}))
            }
          }}
        />

        <Button
          className={cn('size-7 p-1 cursor-pointer absolute bottom-2 right-3')}
          onClick={() => {
            avatarRef.current?.click();
          }}
        >
          <Pen size={20} className="bg-amber-500 p-1 rounded-full text-black" />
        </Button>
      </div>

      <div className="flex gap-2 flex-col">
        <div className="flex items-center gap-3">
          <h1
            onKeyDown={handleKeyDown}
            onBlur={e => setFormData((prev)=> ({...prev, name: e.target.innerText}))}
            contentEditable={isNameEditable}
            onInput={(e)=> handleEditabble(e , 10)}
            onPaste={handlePaste}
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
            onInput={(e)=> handleEditabble(e, 200)}
            onBlur={e => setFormData(prev => ({...prev, description: e.target.innerText}))}
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
