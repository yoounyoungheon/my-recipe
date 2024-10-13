'use client'
import MainLogo from "./ui/component/atom/main-logo";
import { Card, CardContent, CardFooter } from "./ui/component/molecule/card/card";
import Form from "./ui/component/molecule/form/form-index";

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col justify-center items-center text-center">
          <MainLogo className="text-black"/>
        </div>
        <Card>
          {/* <Form id='sign-in' action={} failMessageControl={'alert'}>
          </Form> */}
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
        </Card>
      </div>
    </main>
  );
}
