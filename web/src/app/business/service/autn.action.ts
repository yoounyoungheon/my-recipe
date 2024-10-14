import { SignInFormSchema, SignInRequsetBody } from "./auth.validation";

export interface FormState {
  isSuccess: boolean;
  isFailure: boolean;
  message: string | null;
  validationError: Record<string, string[] | undefined>;
}

export function athentication(prevState: FormState, formData: FormData):FormState{
  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if(!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: validatedFields.error.flatten().fieldErrors,
      message: '유효하지 않은 입력입니다. 다시 입력해주세요.'
    }
  };

  const body: SignInRequsetBody = {
    ...validatedFields.data
  };

  try{
    const pw = localStorage.getItem(body.email);
    if(!pw){
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: `로컬 스토리지에서 해당 아이디를 찾을 수 없습니다.`
      }
    }
    if(pw === body.password){
      console.log(`로그인에 성공했습니다. email: ${body.email}`)
      return {
        isSuccess: true,
        isFailure: false,
        validationError: {},
        message: `로그인에 성공했습니다. email: ${body.email}`
      }
    }else{
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: `비밀번호를 다시 입력하세요.`
      }
    }
  }catch(error){
    throw error;
  }
}
