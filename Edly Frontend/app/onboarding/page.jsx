import { OnboardingForm } from '@/components/onboarding-form-template';

export default function OnboardingPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left div - empty for now */}
      <div className="hidden lg:block bg-muted">{/* Left side content will go here */}</div>
      {/* Right div - contains the form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect width="3" height="8" x="13" y="2" rx="1.5" />
                <path d="M19 8.5V10h1.5A1.5 1.5 0 0 1 22 11.5v1A1.5 1.5 0 0 1 20.5 14H19v1.5a1.5 1.5 0 0 1-1.5 1.5H16" />
                <rect width="3" height="8" x="8" y="14" rx="1.5" />
                <path d="M5 15.5V14H3.5A1.5 1.5 0 0 1 2 12.5v-1A1.5 1.5 0 0 1 3.5 10H5V8.5A1.5 1.5 0 0 1 6.5 7H8" />
              </svg>
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <OnboardingForm />
          </div>
        </div>
      </div>
    </div>
  );
}
