/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import { FormState } from '@/app/ui/component/molecule/form/form-root'
import { auth, signIn, signOut } from '@/app/api/auth/[...nextauth]/auth'

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
export const signOutWithForm = async () => {
  await signOut();
}
export {
  auth as getSession,
}