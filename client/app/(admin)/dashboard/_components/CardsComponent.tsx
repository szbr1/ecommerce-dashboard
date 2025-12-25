import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Props {
    Analysis: {
        name: string,
        count: number
    }[],
    cols?: boolean
}
function CardsComponent({Analysis, cols}: Props) {
  return (
    <div className={cn("grid gap-2 lg:gap-5 grid-cols-2" ,cols && "lg:grid-cols-4")}>
            {Analysis.map((item, index) => (
              <Card key={index} >
                <CardHeader>
                  <CardTitle className=''>{item.name}</CardTitle>
                  <CardDescription>{item.count}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
  )
}

export default CardsComponent