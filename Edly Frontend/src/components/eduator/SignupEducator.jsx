import { CreateAccountForm } from '@/components/create-account-form';
import Timeline from './Timeline';

const SignupEducator = () => {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen dark bg-background text-foreground">
      {/* Left div */}
      <div className="hidden lg:block bg-card">
        <Timeline step={1} />
      </div>

      {/* Right div */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <a href="#" className="w-30">
          <img src="/edly.png" alt="logo" />
        </a>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <CreateAccountForm role={'educator'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupEducator;
