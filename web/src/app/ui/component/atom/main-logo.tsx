import { lusitana } from "@/app/fonts/fonts"
import { cn } from "@/app/utils/style"

export default function MainLogo({className}: {className?: string}){
  return (
    <div className={cn(`${lusitana.className} flex items-center ml:justify-start leading-none min-w-[200px] md:min-w-[202px] md:justify-center`, className)}>
      <p className={`ml-2 text-[28px] md:text-[30px] lg:text-[30px]`}>
          My Recipe
      </p>
    </div>
  )
}