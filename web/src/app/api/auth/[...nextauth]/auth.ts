import NextAuth from 'next-auth'
import github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from "next-auth/providers/credentials"

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    // define Credentials, Google, GitHub provider
    Credentials({
      credentials: {email:{}, password:{}},
      authorize: async (credentials) => {
        let user = null;
        user = {id: credentials.email, password: credentials.password}
        return user
      }
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRETE,
      authorization: {
        params: {
          prompt: 'consent'
        }
      }
    }),
    github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRETE,
      authorization: {
        params: {
          prompt: 'consent' 
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
        return !!profile?.email ? true: false;
      } else if (account?.provider === 'credentials'){
        return true;
      }
      return true
    },
    session: async ({ session }) => {
      return session;
    }
  }
})