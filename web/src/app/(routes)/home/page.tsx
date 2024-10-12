import { lusitana } from "@/app/fonts/fonts"

export default function Page(){
  
  return (
    <main>
      {/* <div className="pt-6"></div> */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`} >
        Recipe List
      </h1>
      <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-4">
        
      </div>
    </main>
  )
}