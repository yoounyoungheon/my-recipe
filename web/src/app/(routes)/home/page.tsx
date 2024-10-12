import { lusitana } from "@/app/fonts/fonts"
import { Card, CardContent, CardFooter } from "@/app/ui/component/molecule/card/card";

export default function Page(){
  const numbers: number[] = [1,2,3,4,5,6,7,8,8,10];
  const gridCards: JSX.Element[] = numbers.map((number)=>(
    <>
    <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
          <p>My recipe{number}.</p>
          </div>
  
        </CardContent>
        <CardFooter>
          <p>This is recipe card footer area</p>
        </CardFooter>
      </Card>
    </>
  ))
  return (
    <main>
      {/* <div className="pt-6"></div> */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`} >
        Recipe List
      </h1>
      <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-4">
        {gridCards}
      </div>
    </main>
  )
}