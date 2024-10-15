'use client'
import { recipeKeyType } from "@/app/business/service/add-recipe.action";
import { lusitana } from "@/app/fonts/fonts"
import { RecipeType } from "@/app/storage/type";
import { Card, CardContent, CardFooter } from "@/app/ui/component/molecule/card/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const defaultVersion = 1;

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
    const presentRecipe = myrecipes.filter((obj)=>{return obj.version == defaultVersion})[0];
    setRecipe(presentRecipe);
  }, [key]);
  console.log(recipe);
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
      </div>
    </main>
  )
}