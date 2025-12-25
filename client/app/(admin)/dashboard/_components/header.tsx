import { Button } from "@/components/ui/button"
import OpenDialog from "./open-dialog"
import { useState } from "react";

interface ShortHeaderProps {
    title: string
    btnText: string
}
function ShortHeader({title, btnText}: ShortHeaderProps) {
     
  const [isCreateProductPopUpOpen, setIsCreateProductPopUpOpen] = useState(false);

  return (
    <div className='w-full lg:h-15  h-14 px-2 md:px-4 flex justify-between items-center border-b'>
          <OpenDialog
        isCreateProductPopUpOpen={isCreateProductPopUpOpen}
        setIsCreateProductPopUpOpen={setIsCreateProductPopUpOpen}
      />
        <div>
            <h1 className='text-3xl font-bold'>{title}</h1>
        </div>

        <div>
            <Button onClick={()=> setIsCreateProductPopUpOpen(true)}>{btnText}</Button>
        </div>
      
    </div>
  )
}

export default ShortHeader