'use server'
import { FormState } from '@/app/ui/component/molecule/form/form-root'
import { auth, signIn, signOut } from '@/app/api/auth/[...nextauth]/auth'
import { z } from "zod";

const SignInFormSchema = z.object({
  email: z.string(),
  password: z.string()
});

type SignInRequsetBody = z.infer<typeof SignInFormSchema>;

export async function signInWithCredentials(prevState: FormState, formData: FormData):Promise<FormState>{
  await signIn('Credentials', {
    email: formData.get('email') || '',
    password: formData.get('password') || '',
    redirectTo: '/home'
  })

  return {
    isSuccess: true,
    isFailure: false,
    message: 'successfully login',
    validationError: {}
  }
}
export async function signInWithGoogle(prevState: FormState, formData: FormData){
  await signIn('google', { redirectTo: '/home'  })
  return {
    isSuccess: true,
    isFailure: false,
    message: 'successfully login',
    validationError: {}
  }
}

export async function signInWithGithub(prevState: FormState, formData: FormData){
    await signIn('github', { redirectTo: '/home'  })
    return {
      isSuccess: true,
      isFailure: false,
      message: 'successfully login',
      validationError: {}
    }
  }
export const signOutWithForm = async (formData: FormData) => {
  await signOut()
}
export {
  auth as getSession,
}