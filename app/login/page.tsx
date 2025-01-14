import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import Link from 'next/link';
import { RegisteredMessage } from './registered-message';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { registered?: string };
}) {
  const registered = searchParams.registered;

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <RegisteredMessage registered={registered} />
        <LoginForm />
        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
