'use client'
import { useRouter } from "next/navigation";

export function useDeleteRecipe(email: string, title: string){
  const router = useRouter();
  const deleteRecipe = () => {
  if (!email || !title) return;
    const allKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const storageKey = localStorage.key(i);
      if (storageKey) {
        allKeys.push(storageKey);
      }
    }

    allKeys.forEach((storageKey) => {
      const value = localStorage.getItem(storageKey);
      if (value) {
        try {
          const parsedValue = JSON.parse(value);
          if (parsedValue.title === title && parsedValue.email === email) {
            localStorage.removeItem(storageKey);
          }
        } catch (error) {
          console.error("Error parsing localStorage item:", error);
        }
      }
    });

    const userRecipes = JSON.parse(localStorage.getItem(`${email}recipes`));
    const updatedRecipes = userRecipes.filter(
      (r: { title: string; version: number }) => r.title !== title
    );
    localStorage.setItem(`${email}recipes`, JSON.stringify(updatedRecipes));

    router.push("/home");
  };

  return deleteRecipe;
}
