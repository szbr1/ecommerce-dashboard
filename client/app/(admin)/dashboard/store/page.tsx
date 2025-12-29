'use client';
import {
  useGetStoreQuery,
  useUpdateStoreMutation,
} from '@/(config)/api/storeApi';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pen } from 'lucide-react';
import { useRef, useState } from 'react';
import StoreProfile from '../_components/storeProfile';
import { FormDataInteface, PreviewImagesInteface } from '@/utils/types';
import { toast } from 'sonner';

function Page() {
  const { data: store, isLoading, isError } = useGetStoreQuery({});
  const [formData, setFormData] = useState<FormDataInteface>({
    name: '',
    description: '',
    avatarUrl: null,
    poster: null,
    brandshoot: null,
    brandshootProduct1: null,
    brandshootProduct2: null,
  });

  const [previewImages, setPreviewImages] = useState<PreviewImagesInteface>({
    brandshoot: '',
    brandshootProduct1: '',
    brandshootProduct2: '',
    poster: '',
    avatarUrl: '',
  });

  const brandshootRef = useRef<HTMLInputElement | null>(null);
  const brandshootProduct1Ref = useRef<HTMLInputElement | null>(null);
  const brandshootProduct2Ref = useRef<HTMLInputElement | null>(null);
  const posterRef = useRef<HTMLInputElement | null>(null);
  const [updateStore, { isLoading: isUpdating, isError: isUpdatingError }] =
    useUpdateStoreMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-5xl h-screen w-full ">
        <p>Loading...</p>
      </div>
    );
  } else if (isError) {
    return <div>Error</div>;
  }

  if (isUpdating)
    return <div className="flex justify-center items-center text-5xl h-screen w-full ">
      <p>Updating...</p>
    </div>;

 if (isUpdatingError)
   return <div className="flex justify-center items-center text-5xl h-screen w-full ">
      <p>Error While Updating</p>
    </div>;

  if (!store || store === undefined || store == null)
    return <div>Store Profile Not Founded</div>;

  const handleSaveChanges = async () => {
   const filterEmptyAndNull = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => {
        if (value === null) return false;
        if (typeof value === 'string' && value.length === 0) return false;
        return true;
      })
    );

  

    
 const fData = new FormData();

  Object.entries(filterEmptyAndNull).forEach(([key, value]) => {
    fData.append(key, value)
});
    // TODO API
    console.log(fData)
  await updateStore(fData).unwrap()
  toast.success("Profile Updated SuccessFully")
  };

  return (
    <div className=" p-2 md:p-3.5 lg:p-5 flex flex-col gap-6">
      {/* STORE POSTER  */}
      <div className="w-full h-30 md:h-40 lg:h-50 rounded-3xl overflow-hidden relative ">
        <input
          type="file"
          accept="image/*"
          hidden
          ref={posterRef}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              const blob = URL.createObjectURL(file);
              setPreviewImages(prev => ({ ...prev, poster: blob }));
              setFormData(prev => ({ ...prev, poster: file }));
            }
          }}
        />
        <img
          src={
            previewImages.poster
              ? previewImages.poster
              : store.profile.banner !== null
                ? store.profile.banner
                : '/avatar.png'
          }
          height={10}
          width={10}
          alt=""
          className="size-full object-cover"
        />
        <Button
          className={cn('size-10 p-1 cursor-pointer absolute bottom-2 right-3')}
          onClick={() => {
            posterRef.current?.click();
          }}
        >
          <Pen size={25} className="bg-amber-500 p-1 rounded-full text-black" />
        </Button>
      </div>

      <StoreProfile
        imagesPreviews={previewImages}
        setImagesPreview={setPreviewImages}
        setFormData={setFormData}
        store={store}
      />

      {/* BRAND SHOOT POSTER  */}
      <div className="w-full h-55 md:h-63 lg:h-87 rounded-md overflow-hidden relative ">
        <input
          type="file"
          accept="image/*"
          hidden
          ref={brandshootRef}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              const blob = URL.createObjectURL(file);
              setPreviewImages(prev => ({ ...prev, brandshoot: blob }));
              setFormData(prev => ({ ...prev, brandshoot: file }));
            }
          }}
        />
        <img
          src={
            previewImages.brandshoot
              ? previewImages.brandshoot
              : store.profile.brandshoot
                ? store.profile.brandshoot
                : '/brandshoot.png'
          }
          height={10}
          width={10}
          alt=""
          className="size-full"
          style={{
            objectFit: 'cover',
            objectPosition: '70% 23%',
          }}
        />
        <Button
          className={cn('size-10 p-1 cursor-pointer absolute bottom-2 right-3')}
          onClick={() => {
            brandshootRef.current?.click();
          }}
        >
          <Pen size={25} className="bg-amber-500 p-1 rounded-full text-black" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-5  w-full">
        <div className="h-60 md:h-73 lg:h-87.5 w-full relative rounded-lg overflow-hidden ">
          <input
            type="file"
            accept="image/*"
            hidden
            ref={brandshootProduct1Ref}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const blob = URL.createObjectURL(file);
                setPreviewImages(prev => ({
                  ...prev,
                  brandshootProduct1: blob,
                }));
                setFormData(prev => ({ ...prev, brandshootProduct1: file }));
              }
            }}
          />
          <img
            src={
              previewImages.brandshootProduct1
                ? previewImages.brandshootProduct1
                : store.profile.brandshootProduct1 !== null
                  ? store.profile.brandshoot
                  : '/mainproduct.png'
            }
            height={10}
            width={10}
            alt=""
            className="size-full object-cover"
          />

          <Button
            className={cn(
              'size-10 p-1 cursor-pointer absolute bottom-2 right-3'
            )}
            onClick={() => {
              brandshootProduct1Ref.current?.click();
            }}
          >
            <Pen
              size={25}
              className="bg-amber-500 p-1 rounded-full text-black"
            />
          </Button>
        </div>
        <div className=" h-60 md:h-73 lg:h-87.5 w-full relative rounded-lg overflow-hidden ">
          <input
            type="file"
            accept="image/*"
            hidden
            ref={brandshootProduct2Ref}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const blob = URL.createObjectURL(file);
                setPreviewImages(prev => ({
                  ...prev,
                  brandshootProduct2: blob,
                }));
                setFormData(prev => ({ ...prev, brandshootProduct2: file }));
              }
            }}
          />

          <img
            src={
              previewImages.brandshootProduct2
                ? previewImages.brandshootProduct2
                : store.profile.brandshootProduct2 !== null
                  ? store.profile.brandshootProduct2
                  : '/mainproduct2.png'
            }
            height={10}
            width={10}
            alt=""
            className="size-full object-cover"
          />
          <Button
            className={cn(
              'size-10 p-1 cursor-pointer absolute bottom-2 right-3'
            )}
            onClick={() => {
              brandshootProduct2Ref.current?.click();
            }}
          >
            <Pen
              size={25}
              className="bg-amber-500 p-1 rounded-full text-black"
            />
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-3 p-5 bg-zinc-900 rounded-md mx-3">
        <Button className="cursor-pointer" variant={'outline'}>
          Cancel
        </Button>
        <Button
          onClick={handleSaveChanges}
          className="w-40 py-4 cursor-pointer"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Page;
