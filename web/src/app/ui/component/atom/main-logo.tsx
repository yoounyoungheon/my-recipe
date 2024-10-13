import { lusitana } from "@/app/fonts/fonts"

export default function MainLogo(){
  return (
    <div className={`flex items-center ml:justify-start leading-none text-white min-w-[200px] md:min-w-[202px] md:justify-center`}>
      <p className={`${lusitana.className} ml-2 text-[28px] font-medium md:text-[35px] lg:text-[35px]`}>
          My Recipe
      </p>
    </div>
  )
}