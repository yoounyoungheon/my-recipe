import { getSession } from "@/app/api/auth/[...nextauth]/auth.action";
import { recipeKeyType } from "@/app/storage/type";
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { useSession } from "next-auth/react";

export async function addRecipe(prevState: FormState, formData: FormData):Promise<FormState>{
  const session = await getSession();
  
  const user = session?.user?.email;
  // user recipes update
  const id = `${user}recipes`
  const recipes:recipeKeyType[] | null = JSON.parse(localStorage.getItem(id) as string);
  const newTitle = formData.get('title') as string
  const version = recipes?.length==0?1:updateVersion(recipes as recipeKeyType[], newTitle);
  if(!recipes){
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: '로컬스토리지에 문제가 생겼습니다. 새로운 계정으로 로그인해주세요.'
    }
  } else if(recipes.length>=1){
    if(newTitle in recipes.map((obj)=>{return obj.title})){}
  }
  recipes.push({title: newTitle, version: version});
  localStorage.setItem(id, JSON.stringify(recipes))

  // add recipe in db
  const body= {
    email: user,
    title: formData.get('title'),
    tags: formData.getAll('tag'),
    ingredients: formData.getAll('ingredient'),
    process: formData.getAll('process'),
    version: version,
    updatedAt: new Date(),
  };
  localStorage.setItem(JSON.stringify({title: newTitle, version: version, user: user}) as string, JSON.stringify(body))
  
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