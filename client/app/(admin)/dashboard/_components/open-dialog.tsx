import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

import DropzoneComponent from './dropzpone';
import { Select, SelectTrigger } from '@/components/ui/select';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from '@/components/ui/select';
import { useCreateProductMutation } from '@/(config)/api/productsApi';

interface FormDataKeys {
  title: string;
  stock: string;
  description: string;
  imagesUrl: File[];
  category: string;
  price: string,
  quantity: string
  size: string
}

interface Props {
  isCreateProductPopUpOpen: boolean
  setIsCreateProductPopUpOpen: (state: boolean) => void
}

function OpenDialog({isCreateProductPopUpOpen, setIsCreateProductPopUpOpen}:Props) {
 
  const [createProduct, {isError, isLoading}] = useCreateProductMutation()
  const [blobPreview, setBlobPreview] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormDataKeys>({
    title: '',
    description: '',
    imagesUrl: [],
    stock: '',
    quantity: "",
    price: "",
    category: '',
    size: ''
  });
  const convertFileIntoUrl = (files: File[]) => {
    const previews = files.map(file => URL.createObjectURL(file));
    setBlobPreview(previews);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const printAllTheData = async() => {
    setFormData(prev => ({ ...prev, imagesUrl: files }));
    console.log('---formdata:', formData);

    // TOASTS AREA
    if (
      formData &&
      (!formData.description || !formData.title || !formData.stock)
    ) {
      toast.error('Please fill all the required fields');
      return;
    }
    if (formData && (!formData.imagesUrl || !(formData.imagesUrl.length > 0))) {
      toast.error('At least one image is required.');
      return;
    }
    if (formData && (!formData.category || !(formData.category.length > 0))) {
      toast.error('Please Select Any One Category');
    }
    // ---

    const fData = new FormData()
    fData.append("title", formData.title);
    fData.append("description", formData.description);
    fData.append("stock", formData.stock);
    fData.append("price", formData.price)
    fData.append('quantity', formData.quantity);
    fData.append('size', formData.size)
    fData.append('category', formData.category)

    files.forEach(file => {
      fData.append("imagesUrl", file)
    })

    console.log(fData);
    // 4. Send to RTK Query
  try {
    await createProduct(fData).unwrap();
    toast.success('Product created successfully!');
  } catch (err) {
    toast.error('Failed to create product');
    console.error(err);
  }
  };

  

  return (
    <Dialog open={isCreateProductPopUpOpen} onOpenChange={()=> setIsCreateProductPopUpOpen(false)}>
      <DialogContent className="overflow-y-scroll h-[calc(100vh-100px)]">
        <FieldSet>
          <FieldLegend> Create Product </FieldLegend>
          <FieldDescription>Create your product with ease</FieldDescription>

          {/* // IMAGES PREVIEW SECTION */}
          {blobPreview && (
            <div className="flex gap-2 ">
              {blobPreview.map(i => (
                <div className="relative" key={i}>
                  <Card className="p-0 w-20 h-20 overflow-hidden ">
                    <Image
                      src={i}
                      height={1}
                      width={2}
                      alt=""
                      className="size-full object-cover"
                    />

                    {/* CROSS ICON TO REMOVE SELECTED IMAGES  */}
                    <X
                      onClick={() =>
                        setBlobPreview(item => item.filter(v => v != i))
                      }
                      className="bg-white rounded-full absolute cursor-pointer -top-2 -right-1 p-0.5  rouned-sm size-5 text-black"
                    />
                  </Card>
                </div>
              ))}
            </div>
          )}

          <FieldGroup>
            
            {/* // PRODUCT TITLE */}
            <Field>
              <FieldLabel>Product Title</FieldLabel>
              <Input onChange={handleChange} name="title" autoComplete="off" />
            </Field>

            {/* // PRODUCT DESCRIPTON */}
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                name="description"
                placeholder="Write down your proudcts details here."
              />
            </Field>

            {/* // PRODUCT QUANTITY */}
            <Field className="grid grid-cols-3 gap-3 items-center">
               <div>
                <FieldLabel>Quantity</FieldLabel>
                <Input
                  placeholder="Price"
                  onChange={handleChange}
                  name="price"
                  min={1}
                  defaultValue={1}
                  type="number"
                />
              </div>
              <div>
                <FieldLabel>Quantity</FieldLabel>
                <Input
                  placeholder="minimum 10"
                  onChange={handleChange}
                  name="stock"
                  min={10}
                  defaultValue={10}
                  type="number"
                />
              </div>
              <div>
                <FieldLabel>Category</FieldLabel>
                <Select
                  onValueChange={value =>
                    setFormData(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>

                  <SelectContent>
                    {/* TODO  */}
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                    {/* ----  */}
                  </SelectContent>
                </Select>
              </div>
            </Field>

            {/* // PRODUCT SIZES */}
            <Field>
              <FieldLabel>Size</FieldLabel>
              <Input
                onChange={handleChange}
                name="size"
                placeholder="S,M,L,XL"
                type="text"
              />
              <FieldDescription>
                Please list available sizes as comma-separated values (no
                spaces). Example formats: S,M,L,XL | XL,3X | SMALL,LARGE
              </FieldDescription>
            </Field>

            {/* // DROP AND SELECT IMAGES */}
            <DropzoneComponent
              convertFileIntoUrl={convertFileIntoUrl}
              setFiles={setFiles}
            />
            <Button disabled={isLoading}  onClick={printAllTheData}>{isLoading ? "Loading...": "Submit"}</Button>
          </FieldGroup>
        </FieldSet>
      </DialogContent>
    </Dialog>
  );
}

export default OpenDialog;
