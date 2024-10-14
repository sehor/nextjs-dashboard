import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    console.log('Fetched user:', user.rows[0]); // 保留这个日志
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('Authorizing with credentials:', credentials); // 保留这个日志

        const parsedCredentials = z
          .object({ 
            email: z.string(), // 保持相对宽松的邮箱验证
            password: z.string().min(6) 
          })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) {
            console.log('User not found'); // 保留这个日志
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
 
          console.log('Passwords match:', passwordsMatch); // 保留这个日志

          if (passwordsMatch) {
            // 返回不包含密码的用户对象
            return { id: user.id, name: user.name, email: user.email };
          }
        } else {
          console.log('Invalid credentials format:', parsedCredentials.error); // 添加错误详情
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
});
