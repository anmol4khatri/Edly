import { OnboardingForm } from '@/components/onboarding-form-template';
import Timeline from './Timeline';

const OnboardingPage = () => {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen dark bg-background text-foreground">
      {/* Left div */}
      <div className="hidden lg:block bg-card sticky top-0 h-screen">
        <Timeline step={2} />
      </div>

      {/* Right div */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <a href="#" className="w-30">
          <img src="/edly.png" alt="logo" />
        </a>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <OnboardingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
