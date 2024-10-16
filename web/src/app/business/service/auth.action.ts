import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { z } from "zod";

const SignInFormSchema = z.object({
  email: z.string(),
  password: z.string()
});

type SignInRequsetBody = z.infer<typeof SignInFormSchema>;

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

  const allUsers:(string | null)[] = [];
    for(let i=0; i<localStorage.length; i++){
        allUsers.push(localStorage.key(i))
    }
  console.log(allUsers);

  try{
    if(!allUsers.includes(body.email)){
      // 데이터 베이스에 회원이 없는 경우: 자동 회원가입
      localStorage.setItem(body.email, body.password);
      localStorage.setItem(`${body.email}recipes`, JSON.stringify([]));
      console.log(`${body.email}: 로컬 스토리지에 없는 회원이므로, 자동 회원가입 되었습니다.`)
      return {
        isSuccess: true,
        isFailure: false,
        validationError: {},
        message: '환영합니다. 해당 이메일과 비밀번호로 회원가입 되었습니다.'
      }
    } else{
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
    }
    
  }catch(error){
    throw error;
  }
}

interface LoginInfo{
  email: string;
  password: string;
}

export async function fetchUser():Promise<string>{
  const res = await (await fetch('http://localhost:3000/api/auth/session')).json();
  const email = res.email;
  return email;
}