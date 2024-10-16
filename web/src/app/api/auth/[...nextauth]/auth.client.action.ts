import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { z } from "zod";
const SignInFormSchema = z.object({
  email: z.string().email(), // 이메일 형식 확인
  password: z.string().min(6) // 비밀번호 최소 길이 확인
});

type SignInRequestBody = z.infer<typeof SignInFormSchema>;

export async function authentication(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  // 유효성 검사 실패 시 반환
  if (!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: validatedFields.error.flatten().fieldErrors,
      message: '유효하지 않은 입력입니다. 다시 입력해주세요.'
    };
  }

  const body: SignInRequestBody = {
    ...validatedFields.data
  };

  // 모든 사용자 목록 가져오기
  const allUsers: (string | null)[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    allUsers.push(localStorage.key(i));
  }
  console.log(allUsers);

  try {
    if (!allUsers.includes(body.email)) {
      // 데이터 베이스에 회원이 없는 경우: 자동 회원가입
      localStorage.setItem(body.email, body.password);
      localStorage.setItem(`${body.email}recipes`, JSON.stringify([]));
      console.log(`${body.email}: 로컬 스토리지에 없는 회원이므로, 자동 회원가입 되었습니다.`);
      return {
        isSuccess: true,
        isFailure: false,
        validationError: {},
        message: '환영합니다. 해당 이메일과 비밀번호로 회원가입 되었습니다.'
      };
    } else {
      const storedPassword = localStorage.getItem(body.email);
      if (!storedPassword) {
        return {
          isSuccess: false,
          isFailure: true,
          validationError: {},
          message: `로컬 스토리지에서 해당 아이디를 찾을 수 없습니다.`
        };
      }
      if (storedPassword === body.password) {
        return {
          isSuccess: true,
          isFailure: false,
          validationError: {},
          message: `로그인에 성공했습니다. email: ${body.email}`
        };
      } else {
        return {
          isSuccess: false,
          isFailure: true,
          validationError: {},
          message: `비밀번호를 다시 입력하세요.`
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: `알 수 없는 오류가 발생했습니다.`
    };
  }
}
