'use client'
import { recipeKeyType } from "@/app/storage/type";
import { lusitana } from "@/app/fonts/fonts"
import { RecipeType } from "@/app/storage/type";
import { Card, CardContent} from "@/app/ui/component/molecule/card/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AchromaticButton from "@/app/ui/component/atom/achromatic-button";
import { getRandomColor } from "@/app/utils/helper";
import { useSession } from "next-auth/react";
import { AutoCounter } from "@/app/ui/component/molecule/timer";

interface UpdateInfo{
  version: number;
  updatedAt: Date;
}
export default function Page(){
  const router = useRouter();
  const {data: session, status } = useSession();
  const email = session?.user?.email;
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
    if(status === 'loading'){return;}
    if(status === 'authenticated' && email){
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
            return error;
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
    }
  }, [email, key, status, version]);

  const handleUpdatedVersion = (version: number)=>{setVersion(version)}

  const ViewVersion: JSX.Element[] = versionInfoList.map((obj, index)=>{
    return (
    <div key={index} className="flex justify-between items-center pt-2">
      <div>
      버전 정보: {obj.version}, updatedAt: {String(obj.updatedAt)}
      </div>
      <AchromaticButton className="bg-emerald-300" type="button" onClick={()=>{handleUpdatedVersion(obj.version)}}>go to this version</AchromaticButton>
    </div>
    )
  })

  const ProcessView:JSX.Element[] = recipe.process.map((obj, index)=>{
    return (
    <div key={index} className="flex justify-between items-center pt-2">
    <p key={index}>step{index+1}: {obj} </p>
    <AutoCounter/>
    </div>
    )
  })
  
  return (
    <main>
      {/* <div className="pt-6"></div> */}
      <h1 className={`${lusitana.className} text-center mb-4 text-xl md:text-2xl`} >
        Recipe
      </h1>
      <div className="space-y-2 pt-3 text-center text-xl">
          <strong>{recipe.title}</strong>
      </div>
      <br/>
      <div className="space-y-10">
      <Card>
        <CardContent className="space-y-4 pt-6 text-left">
          {ProcessView}
        </CardContent>
      </Card>
      <Card className="w-full max-h-25">
        <CardContent className="space-y-4 pt-6 text-center">
          <div className="flex flex-wrap justify-center">
            {recipe.tags.map((tag, index) => (
              <div key={index} className="m-1 px-2 py-1 rounded-md text-sm text-neutral-100" style={{ backgroundColor: getRandomColor() }}>
                {tag}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-h-25">
        <CardContent className="space-y-4 pt-6 text-center">
        <div className="flex flex-wrap justify-center">
            {recipe.ingredients.map((tag, index) => (
              <div key={index} className="m-1 px-2 py-1 rounded-md text-sm text-black bg-white">
                {tag}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div>{ViewVersion}</div>
      <div className="flex justify-center space-x-4">
        <AchromaticButton onClick={()=>{router.push(`/home/update-recipe?title=${recipe.title}&version=${version}`)}}>수정</AchromaticButton>
        <AchromaticButton onClick={()=>{console.log()}}>삭제</AchromaticButton>
        <AchromaticButton onClick={()=>{router.push(`/home`)}}>목록으로</AchromaticButton></div>
      </div>
    </main>
  )
}