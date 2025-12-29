import { cn } from '@/lib/utils';
import React from 'react';
import Dropzone from 'react-dropzone';
import { IoCloudDownloadOutline } from 'react-icons/io5';

interface Props {
  setFiles: (files: File[]) => void;
  convertFileIntoUrl: (files: File[]) => void;
}
function DropzoneComponent({ setFiles, convertFileIntoUrl }: Props) {
  return (
    <Dropzone
      onDrop={acceptedFiles => {
        setFiles(acceptedFiles);
        convertFileIntoUrl(acceptedFiles);
      }}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <section {...getRootProps()}>
          <input {...getInputProps()} />
          <div className=" py-4">
            <div className="flex justify-center items-center py-8">
              <IoCloudDownloadOutline
                className={cn(
                  'size-20 animate-bounce ',
                  isDragActive && 'opacity-40 animate-none'
                )}
              />
            </div>
            <h1 className="text-center">Drop Product Images</h1>
          </div>
        </section>
      )}
    </Dropzone>
  );
}

export default DropzoneComponent;
