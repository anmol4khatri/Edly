import { LoginForm } from '@/features/auth/components/login-form';

const LoginStudent = () => {
  return (
    <div className="flex flex-col gap-4 page-padding min-h-screen bg-background text-foreground">
      <a href="#" className="w-30">
        <img src="/edly.png" alt="logo" />
      </a>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <LoginForm role={'student'} />
        </div>
      </div>
    </div>
  );
};

export default LoginStudent;
