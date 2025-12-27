import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

function CardRowSectionComponent() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 p-2 gap-3 px-4'>

    <Card>
         <CardHeader>
             <h2>Total Orders</h2>
         </CardHeader>
         <CardContent>
            <h5 className='text-xl md:text-2xl lg:text-4xl '>
                30
            </h5>
         </CardContent>
    </Card>

    <Card>
         <CardHeader>
             <h2>Complete Orders</h2>
         </CardHeader>
         <CardContent>
            <h5 className='text-xl md:text-2xl lg:text-4xl '>
                17
            </h5>
         </CardContent>
    </Card>

    <Card>
         <CardHeader>
             <h2>Failed Orders</h2>
         </CardHeader>
         <CardContent>
            <h5 className='text-xl md:text-2xl lg:text-4xl '>
                6
            </h5>
         </CardContent>
    </Card>

    <Card>
         <CardHeader>
             <h2>Return Orders</h2>
         </CardHeader>
         <CardContent>
            <h5 className='text-xl md:text-2xl lg:text-4xl '>
                7
            </h5>
         </CardContent>
    </Card>
    </div>
  )
}

export default CardRowSectionComponent