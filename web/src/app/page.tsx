'use client'
import MainLogo from "./ui/component/atom/main-logo";
import { Card } from "./ui/component/molecule/card/card";

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col justify-center items-center text-center">
          <MainLogo className="text-black"/>
        </div>
        <Card>
          
        </Card>
      </div>
    </main>
  );
}
