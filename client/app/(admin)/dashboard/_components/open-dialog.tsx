import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCallback, useState } from 'react';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import Dropzone from 'react-dropzone';
import { cn } from '@/lib/utils';




function OpenDialog() {

    const [Files, setFiles] = useState<File[] | null>(null)

  return (
    <Dialog open={true}>
      <DialogContent className="overflow-y-scroll h-[calc(100vh-100px)]">
        <FieldSet>
          <FieldLegend> Create Product </FieldLegend>
          <FieldDescription>Create your product with ease</FieldDescription>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => (
              <Card key={i}>
                <CardContent>{i}</CardContent>
              </Card>
            ))}
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel>Product Name</FieldLabel>
              <Input id="name" autoComplete="off" />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea placeholder="Write down your proudcts details here." />
            </Field>
            <Field>
              <FieldLabel>Quantity</FieldLabel>
              <Input
                placeholder="minimum 10"
                min={10}
                defaultValue={10}
                type="number"
              />
            </Field>
            <Field>
              <FieldLabel>Size</FieldLabel>
              <Input placeholder="S,M,L,XL" type="text" />
              <FieldDescription>
                Please list available sizes as comma-separated values (no
                spaces). Example formats: S,M,L,XL | XL,3X | SMALL,LARGE
              </FieldDescription>
            </Field>

            <Card className="flex justify-center items-center p-0 px-0">
              <CardContent className='w-full'>
                <Dropzone onDrop={acceptedFiles => setFiles(acceptedFiles)}>
                  {({ getRootProps, getInputProps,isDragActive }) => (
                    <section {...getRootProps()}  >
                      <input {...getInputProps()} />
                      <div className=' py-4'>
                        <div className="flex justify-center items-center py-8">
                          <IoCloudDownloadOutline className={cn("size-20 animate-bounce ", isDragActive && "opacity-40 animate-none")} />
                        </div>
                        <h1 className='text-center'>Drop Product Images</h1>
                      </div>
                      
                    </section>
                  )}
                </Dropzone>
              </CardContent>
            </Card>
          </FieldGroup>
        </FieldSet>
      </DialogContent>
    </Dialog>
  );
}

export default OpenDialog;
