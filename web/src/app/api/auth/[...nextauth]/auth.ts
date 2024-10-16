import NextAuth from 'next-auth'
import github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    // define Credentials, Google, GitHub provider
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
      } 
      return true
    },
    session: async ({ session }) => {
      return session;
    }
  }
})