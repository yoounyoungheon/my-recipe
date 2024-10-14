'use client'
import { lusitana } from "@/app/fonts/fonts"
import { Card, CardContent, CardFooter } from "@/app/ui/component/molecule/card/card";
import Form from "@/app/ui/component/molecule/form/form-index";

export default function Page(){
  
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
          <div className="space-y-2">
            <Form.TextInput label="Tag" id="tag" placeholder="" />
          </div>
          <div className="space-y-2">
            <Form.TextInput label="Ingredient" id="ingredient" placeholder="" />
          </div>
          <div className="space-y-2">
            <Form.TextInput label="Process" id="process" placeholder="" />
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