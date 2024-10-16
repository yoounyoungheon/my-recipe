'use client'
import { useRouter } from "next/navigation";
import MainLogo from "./ui/component/atom/main-logo";
import { Card, CardContent, CardFooter } from "./ui/component/molecule/card/card";
import Form from "./ui/component/molecule/form/form-index";
import { GithubLogo, GoogleLogo } from "./utils/public/logoes";
import { signInWithGithub, signInWithGoogle } from "@/app/api/auth/[...nextauth]/auth.action";
import { authentication } from "./api/auth/[...nextauth]/auth.client.action";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col justify-center items-center text-center">
          <MainLogo className="text-black"/>
        </div>
        {/* 일반 로그인 */}
        <Card>
          <Form id='sign-in'
            action={authentication}
            onSuccess={()=>{
            router.push('/home')}}
            failMessageControl={'alert'}
          >
            <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Form.TextInput label="Email" id="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
              <Form.PasswordInput label="Password" id="password" placeholder="" />
            </div>
            </CardContent>
            <CardFooter>
              <Form.SubmitButton label="Sign in" position="center" className="w-full" />
            </CardFooter>
          </Form>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2 lg: grid-cols-4">
          {/* 소셜 로그인 */}
          <Form id='sign-in for github' action={signInWithGithub} failMessageControl={'alert'}>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <GithubLogo/>
            </CardContent>
            <CardFooter>
              <Form.SubmitButton label="Sign In for github" position='center' className="w-full" />
            </CardFooter>
          </Card>
          </Form>

          <Form id='sign-in for google' action={signInWithGoogle} failMessageControl={'alert'}>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <GoogleLogo/>
            </CardContent>
            <CardFooter>
              <Form.SubmitButton label="Sign In for google" position = 'center' className="w-full" />
            </CardFooter>
          </Card>
          </Form>
        </div>
      </div>
    </main>
  );
}
