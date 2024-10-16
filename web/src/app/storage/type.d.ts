export interface RecipeType{
    email: string;
    ingredients: string[];
    process: string[];
    tags: string[];
    title: string;
    updatedAt: Date;
    version: number;
  }

  export interface recipeKeyType{
    title: string;
    version: number;
  }