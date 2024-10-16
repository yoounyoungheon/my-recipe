import NextAuth, { User } from 'next-auth'
import github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    // Credentials, Google, GitHub 등의 인증 공급자를 지정합니다.
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRETE,
      authorization: {
        params: {
          prompt: 'consent' // 사용자에게 항상 동의 화면을 표시하도록 강제!
        }
      }
    }),
    github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRETE,
      authorization: {
        params: {
          prompt: 'consent' // 사용자에게 항상 동의 화면을 표시하도록 강제!
        }
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (account?.provider === 'github') {
        return profile?.email ? true : false;
      } else if (account?.provider === 'google') {
        return !!profile?.email_verified
      } 
      return true
    },
    session: async ({ session }) => {
      return session;
    }
  }
})