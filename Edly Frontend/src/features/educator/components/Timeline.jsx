import { Check, UserPlus, BookOpen } from 'lucide-react';

const Timeline = ({ step = 1 }) => {
  const timelineItems = [
    {
      id: 1,
      title: 'Create Account',
      description:
        'Set up your new account with your personal information and credentials. This is the first step to get started with our platform.',
      icon: <UserPlus className="icon-md" />,
    },
    {
      id: 2,
      title: 'Onboarding Process',
      description:
        'Complete the guided setup process to personalize your experience by building your own course platform.',
      icon: <BookOpen className="icon-md" />,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col container-padding py-20">
        {timelineItems.map((item, index) => {
          const isCompleted = step > item.id;
          const isLast = index === timelineItems.length - 1;

          return (
            <div key={item.id} className="flex items-start">
              <div className="group flex gap-x-6">
                <div className="relative">
                  {!isLast && (
                    <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
                  )}
                  <span
                    className={`relative z-10 grid h-10 w-10 place-items-center rounded-full ${
                      isCompleted
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {isCompleted ? <Check className="icon-md" /> : item.icon}
                  </span>
                </div>
                <div className="-translate-y-1.5 pb-8 text-muted-foreground">
                  <p className="heading-4">{item.title}</p>
                  <small className="mt-2 body-small">{item.description}</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
