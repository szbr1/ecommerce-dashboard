import { useDeleteProductMutation } from '@/(config)/api/productsApi';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { CgSpinner } from 'react-icons/cg';

interface ProductGridColProps {
  title: string;
  imagesUrl?: string[];
  price: number;
  stock: number;
  size?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

function ProductGridCol({ products }: { products: ProductGridColProps[] }) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async (productId: number) => {
    const res = await deleteProduct({ productId });
    console.log('success');
    console.log(res.data);
  };

  return (
    <div className="rounded-lg border shadow-sm p-2 lg:p-4">
      <div className="flex flex-col gap-3">
        {products.map(product => (
          <div
            key={product.id}
            className="h-20 lg:h-20 py-2 px-2 lg:px-4 rounded-md border w-full flex justify-between items-center"
          >
            <div className="flex gap-2">
              <div className="lg:w-15 lg:h-full flex justify-center items-center mt-0.75">
                <Image
                  src={product?.imagesUrl?.[0] ?? '/avatar.png'}
                  height={40}
                  width={40}
                  alt=""
                  className="size-full rounded-sm object-cover"
                />
              </div>
              <div className="grid grid-cols-2  ml-2  gap-4 ">
                <div className=" w-20 md:w-50 ">
                  <p className=" text-sm md:text-lg font-semibold md:font-semibold truncate w-full ">
                    {product.title}
                  </p>
                  <p className="text-sm">{product.price} $</p>
                </div>
                <div>
                  <p className="text-sm ml-2">
                    Stock:{' '}
                    <span className="font-semibold text-amber-600">
                      {product.stock}
                    </span>
                  </p>
                  <div className="lg:flex hidden  ">
                    {product.size &&
                      product.size.split(',').map(size => (
                        <Button
                          key={size}
                          variant={'outline'}
                          className=" text-xs ml-1"
                        >
                          {size}
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col text-sm ">
              <p className="">{product.createdAt?.split('T')[0]}</p>
              <p className="">{product.updatedAt?.split('T')[0]}</p>
            </div>

            <div>
              <Button
                onClick={() => handleDelete(product.id)}
                variant={'outline'}
                className="cursor-pointer ml-1"
              >
                {isLoading ? (
                  <CgSpinner />
                ) : (
                  <Trash2 className="text-red-600" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGridCol;
