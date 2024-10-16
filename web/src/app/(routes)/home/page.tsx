'use client'
import { recipeKeyType } from "@/app/storage/type";
import { lusitana } from "@/app/fonts/fonts"
import { Card, CardContent, CardFooter } from "@/app/ui/component/molecule/card/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Page(){
  const session = useSession();
  const email = session.data?.user?.email;
  const key:string = `${email}recipes`;
  const [filterduplicated, setFilterDuplicated] = useState<string[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if(!storedData){
      localStorage.setItem(key, JSON.stringify([]));
      const newMemberData = localStorage.getItem(key);

      const response: recipeKeyType[] = JSON.parse(newMemberData as string);
      const titleList: string[] = response.map((obj) => obj.title);
      const uniqueTitles = titleList.filter((v, i) => titleList.indexOf(v) === i);
      setFilterDuplicated(uniqueTitles);

    }
    else if (storedData) {
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
  if(!email){
    return (<main> <Link href={'/'}>환영합니다. 더 나은 서비스를 위해 소셜 서비스로 로그인하세요 ! (로그인하기)</Link> </main>)
  }else {
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
}}