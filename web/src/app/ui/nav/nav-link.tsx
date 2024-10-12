'use client';
import { HomeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { ForwardRefExoticComponent, SVGProps } from 'react';

interface navLinkType {
  name: string,
  href: string,
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>,
}

const links: navLinkType[] = [
  {name: 'Home', href: '/home', icon: HomeIcon},
  {name: 'Add Recipe', href: '/add-recipe', icon: DocumentDuplicateIcon},
]

export default function NavLinks(){
  const pathName = usePathname();
  return (
    <>
     {links.map((link)=>{
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex h-[48px] grow items-center
              justify-center gap-2 rounded-md 
              bg-white p-3 text-sm text-emerald-600
              font-medium
              hover:bg-emerald-100 hover:text-emerald-600
              md:flex-none md:justify-start
              md:p-2 md:px-3`,
              {'bg-emerald-100 text-emerald-800': pathName === link.href}
            )}>
                <LinkIcon className='w-6'/>
                <p className='hidden md:block'>{link.name}</p>
          </Link>
        )
     })}
    </>
  )
}