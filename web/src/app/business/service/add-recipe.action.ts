import { FormState } from "@/app/ui/component/molecule/form/form-root";

interface recipeKeyType{
  title: string;
  version: number;
}

export function addRecipe(prevState: FormState, formData: FormData):FormState{
  const user = 'yh@naver.com'
  // user recipes update
  const id = `${user}recipes`
  const recipes:recipeKeyType[] = JSON.parse(localStorage.getItem(id) as string);
  const newTitle = formData.get('title') as string
  const version = recipes.length==0?1:updateVersion(recipes, newTitle);
  if(recipes.length>1){
    if(newTitle in recipes.map((obj)=>{return obj.title})){
        
    }
  }
  recipes.push({title: newTitle, version: version});
  localStorage.setItem(id, JSON.stringify(recipes))

  // add recipe in db
  const body = {
    email: user,
    title: formData.get('title'),
    tags: formData.getAll('tag'),
    ingredients: formData.getAll('ingredient'),
    process: formData.getAll('process'),
    version: version,
    updatedAt: new Date(),
  };
  localStorage.setItem(JSON.stringify({title: newTitle, version: version}) as string, JSON.stringify(body))
  
  return {
    isSuccess: true,
    isFailure: false,
    validationError: {},
    message: '레시피가 추가되었습니다.'
  }
}

function updateVersion(lst: recipeKeyType[], title: string): number{
    const filteredLst = lst.filter((obj)=>{return obj.title == title})
    const versions = filteredLst.map((obj)=>{
      return obj.version;
    })
  
    let max=0;
    for(const version of versions){
      if (version > max){max = version}
    }
    return max+1;
  }
  