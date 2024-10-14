import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLoginPage = nextUrl.pathname === '/login';
      const isOnRegisterPage = nextUrl.pathname === '/register';

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // 重定向未认证用户到登录页面
      } else if (isOnLoginPage || isOnRegisterPage) {
        if (isLoggedIn) return Response.redirect(new URL('/dashboard', nextUrl));
        return true;
      }
      return true;
    },
  },
  providers: [], // 暂时保持空数组
} satisfies NextAuthConfig;
