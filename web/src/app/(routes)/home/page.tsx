'use client'
import { recipeKeyType } from "@/app/storage/type";
import { lusitana } from "@/app/fonts/fonts"
import { Card, CardContent, CardFooter } from "@/app/ui/component/molecule/card/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page(){
  const email:string = 'yh@naver.com';
  const key:string = `${email}recipes`;

  const [filterduplicated, setFilterDuplicated] = useState<string[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const response: recipeKeyType[] = JSON.parse(storedData);
      const titleList: string[] = response.map((obj) => obj.title);
      const uniqueTitles = titleList.filter((v, i) => titleList.indexOf(v) === i);
      setFilterDuplicated(uniqueTitles);
    }
  }, [key]);

  const gridCards: JSX.Element[] = filterduplicated.map((title, index)=>(
    <div key={index}>
    <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2 text-2xl">
          {title}
          </div>
        </CardContent>
        <CardFooter>
          <Link className='text-slate-700 hover:text-green-800'href={`/home/detail/?title=${title}`}>자세히 보기</Link>
        </CardFooter>
      </Card>
    </div>
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