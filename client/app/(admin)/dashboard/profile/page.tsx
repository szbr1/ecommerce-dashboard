'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { profile } from '@/constants/profile';
import { GetDate } from '@/utils/StoreUtils';
import { LogIn, PencilIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface FormDataInteface {
  name: string,
  profilePicture: File | null
}
function Page() {
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [previewImage, setPreviewImage] = useState("")
  const [formData, setFormData] = useState<FormDataInteface>({
    name: "",
    profilePicture: null
  })

  console.log(formData)
  return (
    <div className="flex justify-center w-full py-8">
      {/* PROFILE CONTAINER  */}
      <div className=" p-3 rounded-md md:border flex gap-3 flex-col lg:w-3/5 py-12 px-7">
        {/* TITLES  */}
        <div className="flex items-center gap-5">
          <div className="size-20 rounded-full  relative">
            <Image
              src={previewImage.length>0 ? previewImage : profile.imageUrl || `/avatar.png`}
              height={10}
              width={10}
              alt=""
              className="size-full object-cover rounded-full"

            />
            <button onClick={()=> imageRef.current?.click()} className='absolute rounded-full p-1 dark:bg-white bg-black text-white dark:text-black flex justify-center items-center cursor-pointer size-6 bottom-0 right-0'>< PencilIcon className='size-3'/></button>
            <input type="file" hidden accept='image/*' ref={imageRef} onChange={e => {
              const file = e.target.files?.[0];
              if(file){
                const convertIntoUrl = URL.createObjectURL(file);
                setPreviewImage(convertIntoUrl)
                setFormData(prev => ({...prev, profilePicture: file}))
              }
            }} />
          </div>
          <div className="flex flex-col justify-center gap-2  md:gap-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl">{profile.name}</h1>
            <p className="opacity-50 text-sm">{profile.email}</p>
          </div>
        </div>

       {/* CREATED AT  */}
        <div className="flex flex-col gap-1 mt-6">
          <Label className="opacity-50 font-thin">You Joined</Label>
          <Input value={GetDate(profile.createdAt)} />
        </div>

        {/* UPDATED AT  */}
        <div className="flex flex-col gap-1 ">
          <Label className="opacity-50 font-thin">Last Updated</Label>
          <Input value={GetDate(profile.updatedAt)} />
        </div>

        {/* LOGOUT  */}
        <div className="flex justify-between items-center">
          <h1 className="font-light text-[15px] opacity-70">
            You can login again with the same email.
          </h1>
          {/* TODO  */}
          <Button variant={'outline'} className="cursor-pointer">
            <LogIn />
            Logout
          </Button>
        </div>

      </div>  
    </div>
  );
}

export default Page;
