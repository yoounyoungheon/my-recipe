'use client'
import { lusitana } from "@/app/fonts/fonts"
import AchromaticButton from "@/app/ui/component/atom/achromatic-button";
import { Card, CardContent, CardFooter } from "@/app/ui/component/molecule/card/card";
import Form from "@/app/ui/component/molecule/form/form-index";
import { useState } from "react";

export default function Page(){
  const [tagCounts, setTagCounts] = useState([1]);
  const [ingredientCounts, setIngredientCounts] = useState([1]);
  const [processCounts, setProcessCounts] = useState([1]);

  const handleAddTagInput = () =>{
    const counts = [...tagCounts]
    let counter = counts.slice(-1)[0];
    counter+=1;
    counts.push(counter);
    setTagCounts(counts);
  }

  // const handleDeleteTagInput = () =>{
  //   const counts = [...tagCounts]
    
  // }

  const handleAddIngredientInput = () =>{
    const counts = [...ingredientCounts]
    let counter = counts.slice(-1)[0];
    counter+=1;
    counts.push(counter);
    setIngredientCounts(counts);
  }

  const handleAddProcessInput = () =>{
    const counts = [...processCounts]
    let counter = counts.slice(-1)[0];
    counter+=1;
    counts.push(counter);
    setProcessCounts(counts);
  }


  const TagInputs: JSX.Element[] = tagCounts.map((num)=>{
    return (<><Form.TextInput label={`Tag ${num}`} id={`tag${num}`} placeholder=""/></>)
  })

  const IngredientInputs: JSX.Element[] = ingredientCounts.map((num)=>{
    return (<><Form.TextInput label={`Ingredient ${num}`} id={`ingredient${num}`} placeholder=""/></>)
  })

  const ProcessInputs: JSX.Element[] = processCounts.map((num)=>{
    return (<><Form.TextInput label={`Process ${num}`} id={`process${num}`} placeholder=""/></>)
  })


  return (
    <main>
      {/* <div className="pt-6"></div> */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`} >
        Add Recipe
      </h1>
      <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-4">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Form.TextInput label="Title" id="title" placeholder="" />
          </div>
          <div className="w-[100%] my-[1%] border-[1px] border-lightGray/30"></div>
          <div className="space-y-2">
            {TagInputs}
            <AchromaticButton className="bg-emerald-300" onClick={handleAddTagInput}>+</AchromaticButton>
          </div>
          <div className="w-[100%] my-[1%] border-[1px] border-lightGray/30"></div>
          <div className="space-y-2">
            {IngredientInputs}
            <AchromaticButton className="bg-emerald-300" onClick={handleAddIngredientInput}>+</AchromaticButton>
          </div>
          <div className="w-[100%] my-[1%] border-[1px] border-lightGray/30"></div>
          <div className="space-y-2">
            {ProcessInputs}
            <AchromaticButton className="bg-emerald-300" onClick={handleAddProcessInput}>+</AchromaticButton>
          </div>
        </CardContent>
        <CardFooter>
          <Form.SubmitButton label="save" />
        </CardFooter>
      </Card>
      </div>
    </main>
  )
}