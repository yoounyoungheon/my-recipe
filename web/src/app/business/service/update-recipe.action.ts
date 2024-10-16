import { recipeKeyType, RecipeType } from "@/app/storage/type";
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { getSession } from "next-auth/react";

export async function updateRecipe(prevState: FormState, formData: FormData, recipe: RecipeType):Promise<FormState>{
  const session = await getSession();
  const user = session?.user?.email;
  
  // user recipes update
  console.log(recipe);
  const id = `${user}recipes`
  const title = recipe.title;
  const recipes:recipeKeyType[] | null = JSON.parse(localStorage.getItem(id) as string);

  const newVersion = recipes?.length==0?1:updateVersion(recipes as recipeKeyType[], title);
  const oldTags = recipe.tags;
  const oldIngredients = recipe.ingredients;
  const oldProcess = recipe.process;

  if(!recipes || !recipe){
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: '로컬스토리지에 문제가 생겼습니다. 새로운 계정으로 로그인해주세요.'
    }
  } else if(recipes.length>=1){
    if(title in recipes.map((obj)=>{return obj.title})){}
  }

  recipes.push({title: title, version: newVersion});
  localStorage.setItem(id, JSON.stringify(recipes))

  // update recipe in db
  const body= {
    email: user,
    title: title,
    tags: [...oldTags, ...formData.getAll('tag') as string[]],
    ingredients: [...oldIngredients, ...formData.getAll('ingredient') as string[]],
    process: [...oldProcess, ...formData.getAll('process') as string[]],
    version: newVersion,
    updatedAt: new Date(),
  };
  localStorage.setItem(JSON.stringify({title: title, version: newVersion, user: user}) as string, JSON.stringify(body))
  
  return {
    isSuccess: true,
    isFailure: false,
    validationError: {},
    message: '레시피가 추가되었습니다.'
  }
}

function updateVersion(lst: recipeKeyType[], title: string): number {
  const filteredLst = lst.filter(obj => obj.title === title);
  const versions = filteredLst.map(obj => obj.version);
  return Math.max(...versions, 0) + 1;
}