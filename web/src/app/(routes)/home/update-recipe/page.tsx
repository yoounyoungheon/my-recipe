'use client'
import { updateRecipe } from "@/app/business/service/update-recipe.action";
import { lusitana } from "@/app/fonts/fonts"
import { RecipeType } from "@/app/storage/type";
import AchromaticButton from "@/app/ui/component/atom/achromatic-button";
import { Card, CardContent, CardFooter } from "@/app/ui/component/molecule/card/card";
import Form from "@/app/ui/component/molecule/form/form-index";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page(){
  const router = useRouter();
  const session = useSession();
  const email = session.data?.user?.email;
  
  const params = useSearchParams();
  const titleKey = params.get('title');
  const versionKey = params.get('version');

  const [tagCounts, setTagCounts] = useState([1]);
  const [ingredientCounts, setIngredientCounts] = useState([1]);
  const [processCounts, setProcessCounts] = useState([1]);

  const recipyKey = `{"title":"${titleKey}","version":${versionKey},"user":"${email}"}`;
  const [recipe, setRecipe] = useState<RecipeType>({
    title:'',
    email:'',
    ingredients: [],
    process: [],
    tags: [],
    updatedAt: new Date(),
    version: 0
  });

  useEffect(()=>{
    const recipe = JSON.parse(localStorage.getItem(recipyKey) as string);
    setRecipe(recipe);
  },[recipyKey]);

  const handleAddTagInput = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    const counts = [...tagCounts]
    let counter = counts.slice(-1)[0];
    counter+=1;
    counts.push(counter);
    setTagCounts(counts);
  }

  const handleDeleteTagInput = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    const counts = [...tagCounts]
    if(counts.length == 1){return}
    counts.pop();
    setTagCounts(counts)
  }

  const handleAddIngredientInput = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    const counts = [...ingredientCounts]
    let counter = counts.slice(-1)[0];
    counter+=1;
    counts.push(counter);
    setIngredientCounts(counts);
  }

  const handleDeleteIngredientInput = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    const counts = [...ingredientCounts]
    if(counts.length == 1){return}
    counts.pop();
    setIngredientCounts(counts)
  }

  const handleAddProcessInput = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    const counts = [...processCounts]
    let counter = counts.slice(-1)[0];
    counter+=1;
    counts.push(counter);
    setProcessCounts(counts);
  }

  const handleDeleteProcessInput = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    const counts = [...processCounts]
    if(counts.length == 1){return}
    counts.pop();
    setProcessCounts(counts)
  }

  const handleDeleteTag = (index: number) => {
    const updatedTags = recipe.tags.filter((_, i) => i !== index);
    setRecipe({ ...recipe, tags: updatedTags });
  };
  
  const handleDeleteIngredient = (index: number) => {
    const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };
  
  const handleDeleteProcess = (index: number) => {
    const updatedProcess = recipe.process.filter((_, i) => i !== index);
    setRecipe({ ...recipe, process: updatedProcess });
  };

  const TagInputs: JSX.Element[] = tagCounts.map((num) => (
    <Form.TextInput key={`tag-${num}`} label={`Additional Tag`} id={`tag`} placeholder="" />
  ));
  const TagView:JSX.Element[] = recipe.tags.map((obj, index)=>{
    return(
      <div key={index} className="flex justify-between items-center">
      {obj} <AchromaticButton type="button" onClick = {()=>handleDeleteTag(index)} className="text-black hover:text-white bg-white hover:bg-rose-400 shadow-white"> delete </AchromaticButton>
      </div>
    )
  })
  
  const IngredientInputs: JSX.Element[] = ingredientCounts.map((num) => (
    <Form.TextInput key={`ingredient-${num}`} label={`Additional Ingredient`} id={`ingredient`} placeholder="" />
  ));
  const IngredientView:JSX.Element[] = recipe.ingredients.map((obj, index)=>{
    return(
      <div key={index} className="flex justify-between items-center">
      {obj} <AchromaticButton type="button" onClick = {()=>handleDeleteIngredient(index)} className="text-black hover:text-white bg-white hover:bg-rose-400 shadow-white"> delete </AchromaticButton>
      </div>
    )
  })
  
  const ProcessInputs: JSX.Element[] = processCounts.map((num) => (
    <Form.TextInput key={`process-${num}`} label={`Additional Process`} id={`process`} placeholder="" />
  ));
  const ProcessView:JSX.Element[] = recipe.process.map((obj, index)=>{
    return(
      <div key={index} className="flex justify-between items-center">
      {obj} <AchromaticButton type="button" onClick = {()=>handleDeleteProcess(index)} className="text-black hover:text-white bg-white hover:bg-rose-400 shadow-white"> delete </AchromaticButton>
      </div>
    )
  })

  return (
    <main>
      {/* <div className="pt-6"></div> */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`} >
        Update Recipe: {titleKey} (version: {versionKey})
      </h1>
      <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-4">
      <Form 
          id='add-recipe' 
          action={(prevState, formData) => updateRecipe(prevState, formData, recipe)} 
          onSuccess={() => router.push(`/home/detail?title=${titleKey}`)} 
          failMessageControl="alert"
        >
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            {titleKey}
          </div>
          <div className="w-[100%] my-[1%] border-[1px] border-lightGray/30"></div>
          <div className="space-y-2">
            Tags<br/>
            {TagView}
            {TagInputs}
            <AchromaticButton className="bg-emerald-300" type='button' onClick={handleAddTagInput}>+</AchromaticButton>
            <span className="mx-2"></span>
            <AchromaticButton className="bg-emerald-300" type='button' onClick={handleDeleteTagInput}>-</AchromaticButton>
          </div>
          <div className="w-[100%] my-[1%] border-[1px] border-lightGray/30"></div>
          <div className="space-y-2">
            Ingredients<br/>
            {IngredientView}
            {IngredientInputs}
            <AchromaticButton className="bg-emerald-300" type='button' onClick={handleAddIngredientInput}>+</AchromaticButton>
            <span className="mx-2"></span>
            <AchromaticButton className="bg-emerald-300" type='button' onClick={handleDeleteIngredientInput}>-</AchromaticButton>
          </div>
          <div className="w-[100%] my-[1%] border-[1px] border-lightGray/30"></div>
          <div className="space-y-2">
            Process<br/>
            {ProcessView}
            {ProcessInputs}
            <AchromaticButton className="bg-emerald-300" type='button' onClick={handleAddProcessInput}>+</AchromaticButton>
            <span className="mx-2"></span>
            <AchromaticButton className="bg-emerald-300" type='button' onClick={handleDeleteProcessInput}>-</AchromaticButton>
          </div>
        </CardContent>
        <CardFooter>
          <Form.SubmitButton label="save" />
        </CardFooter>
      </Card>
      </Form>
      </div>
    </main>
  )
}