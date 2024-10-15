'use client'
import { addRecipe } from "@/app/business/service/add-recipe.action";
import { lusitana } from "@/app/fonts/fonts"
import AchromaticButton from "@/app/ui/component/atom/achromatic-button";
import { Card, CardContent, CardFooter } from "@/app/ui/component/molecule/card/card";
import Form from "@/app/ui/component/molecule/form/form-index";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page(){
  const [tagCounts, setTagCounts] = useState([1]);
  const [ingredientCounts, setIngredientCounts] = useState([1]);
  const [processCounts, setProcessCounts] = useState([1]);
  const router = useRouter();

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


  const TagInputs: JSX.Element[] = tagCounts.map((num) => (
    <Form.TextInput key={`tag-${num}`} label={`Tag ${num}`} id={`tag`} placeholder="" />
  ));
  
  const IngredientInputs: JSX.Element[] = ingredientCounts.map((num) => (
    <Form.TextInput key={`ingredient-${num}`} label={`Ingredient ${num}`} id={`ingredient`} placeholder="" />
  ));
  
  const ProcessInputs: JSX.Element[] = processCounts.map((num) => (
    <Form.TextInput key={`process-${num}`} label={`Process ${num}`} id={`process`} placeholder="" />
  ));

  return (
    <main>
      {/* <div className="pt-6"></div> */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`} >
        Add Recipe
      </h1>
      <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-4">
      <Form id='add-recipe' action={addRecipe} onSuccess={()=>{router.push('/home')}} failMessageControl="alert">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Form.TextInput label="Title" id="title" placeholder="" />
          </div>
          <div className="w-[100%] my-[1%] border-[1px] border-lightGray/30"></div>
          <div className="space-y-2">
            {TagInputs}
            <AchromaticButton className="bg-emerald-300" type='button' onClick={handleAddTagInput}>+</AchromaticButton>
            <span className="mx-2"></span>
            <AchromaticButton className="bg-emerald-300" type='button' onClick={handleDeleteTagInput}>-</AchromaticButton>
          </div>
          <div className="w-[100%] my-[1%] border-[1px] border-lightGray/30"></div>
          <div className="space-y-2">
            {IngredientInputs}
            <AchromaticButton className="bg-emerald-300" type='button' onClick={handleAddIngredientInput}>+</AchromaticButton>
            <span className="mx-2"></span>
            <AchromaticButton className="bg-emerald-300" type='button' onClick={handleDeleteIngredientInput}>-</AchromaticButton>
          </div>
          <div className="w-[100%] my-[1%] border-[1px] border-lightGray/30"></div>
          <div className="space-y-2">
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