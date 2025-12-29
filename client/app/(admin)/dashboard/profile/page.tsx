'use client';
import { useUpdateProfileMutation } from '@/(config)/api/usersApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { profile } from '@/constants/profile';
import { GetDate } from '@/utils/StoreUtils';
import { LogIn, PencilIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { toast } from 'sonner';

function Page() {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // Destructure isLoading for better UX
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Revoke old preview if it exists
      if (previewImage) URL.revokeObjectURL(previewImage);

      const newUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(newUrl);
      setFile(selectedFile);
    }
  };

  const handleSave = async () => {
    if (!file) {
      toast.error('Please select an image first');
      return;
    }

    const fData = new FormData();
    // Key "avatar" must match upload.single("avatar") in Express
    fData.append('avatar', file);

    try {
      await updateProfile(fData).unwrap();
      toast.success('Profile picture updated!');
      setFile(null); // Reset file state after success
    } catch (err) {
      toast.error('Failed to update profile');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center w-full py-8">
      <div className="p-3 rounded-md md:border flex gap-3 flex-col lg:w-3/5 py-12 px-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="size-20 rounded-full relative">
              <Image
                src={previewImage || profile.imageUrl || `/avatar.png`}
                height={80}
                width={80}
                alt="Profile"
                className="size-full object-cover rounded-full border"
              />
              <button
                onClick={() => imageRef.current?.click()}
                className="absolute rounded-full p-1 bg-black text-white dark:bg-white dark:text-black flex justify-center items-center cursor-pointer size-6 bottom-0 right-0"
              >
                <PencilIcon className="size-3" />
              </button>
              <input
                type="file"
                hidden
                accept="image/*"
                ref={imageRef}
                onChange={handleFileChange}
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{profile.name}</h1>
              <p className="opacity-50 text-sm">{profile.email}</p>
            </div>
          </div>

          {/* ADDED SAVE BUTTON */}
          {file && (
            <Button onClick={handleSave} disabled={isLoading} size="sm">
              {isLoading ? (
                <Loader2 className="animate-spin size-4" />
              ) : (
                'Save Changes'
              )}
            </Button>
          )}
        </div>

        {/* ... Rest of your UI (Joined/Updated fields) ... */}
        <div className="flex flex-col gap-1 mt-6">
          <Label className="opacity-50 font-thin">You Joined</Label>
          <Input disabled value={GetDate(profile.createdAt)} />
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="text-sm opacity-70">Logout from your account</p>
          <Button variant="outline" className="gap-2">
            <LogIn className="size-4" /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
