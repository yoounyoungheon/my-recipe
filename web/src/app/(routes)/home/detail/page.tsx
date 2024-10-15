'use client'
import { recipeKeyType } from "@/app/storage/type";
import { lusitana } from "@/app/fonts/fonts"
import { RecipeType } from "@/app/storage/type";
import { Card, CardContent, CardFooter } from "@/app/ui/component/molecule/card/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AchromaticButton from "@/app/ui/component/atom/achromatic-button";

interface UpdateInfo{
  version: number;
  updatedAt: Date;
}
export default function Page(){
  const email = 'yh@naver.com';
  const params = useSearchParams();
  const key = params.get('title');

  const [recipe, setRecipe] = useState<RecipeType>({
    title:'',
    email:'',
    ingredients: [],
    process: [],
    tags: [],
    updatedAt: new Date(),
    version: 0
  });
  const [versionInfoList, setVersionInfoList] = useState<UpdateInfo[]>([]);
  const [version, setVersion] = useState<number>(1);

  useEffect(()=>{
    const allKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const storageKey = localStorage.key(i);
      if (storageKey) {
        allKeys.push(storageKey);
      }
    }

    const res: RecipeType[] = allKeys
      .map((storageKey) => {
        const value = localStorage.getItem(storageKey);
        try {
          return JSON.parse(value as string);
        } catch (error) {
          return null;
        }
      })
      .filter((parsedValue) => parsedValue !== null)
      .filter((obj) => {
        const object = obj as recipeKeyType;
        return object.title === key;
      });
    const myrecipes = res.filter((obj)=>{return obj.email === email})

    const versionInfos: UpdateInfo[] = myrecipes.map((obj)=>{
      const node:UpdateInfo = {version: obj.version, updatedAt: obj.updatedAt}
      return node});
    setVersionInfoList(versionInfos.sort((a, b)=> a.version - b.version ))

    const presentRecipe = myrecipes.filter((obj)=>{return obj.version == version})[0];
    setRecipe(presentRecipe);
  }, [key, version]);

  const handleUpdatedVersion = (version: number)=>{setVersion(version)}

  const ViewVersion: JSX.Element[] = versionInfoList.map((obj, index)=>{
    return (
    <div key={index}>
      <div>
      버전 정보: {obj.version}, updatedAt: {String(obj.updatedAt)}
      </div>
      <AchromaticButton className="bg-emerald-300" type="button" onClick={()=>{handleUpdatedVersion(obj.version)}}>go to this version</AchromaticButton>
    </div>
    
    )
  })
  
  return (
    <main>
      {/* <div className="pt-6"></div> */}
      <h1 className={`${lusitana.className} text-center mb-4 text-xl md:text-2xl`} >
        Recipe
      </h1>
      <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-4">
      <Card>
        <CardContent className="space-y-4 pt-6 text-center">
          {recipe.title}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 pt-6 text-center">
          {recipe.process}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 pt-6 text-center">
          {recipe.tags}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 pt-6 text-center">
          {recipe.ingredients}
        </CardContent>
      </Card>
      <div>{ViewVersion}</div>
      </div>
    </main>
  )
}