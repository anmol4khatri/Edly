import { Check, UserPlus, BookOpen } from "lucide-react"

const Timeline = ({ step = 1 }) => {
  const timelineItems = [
    {
      id: 1,
      title: "Create Account",
      description:
        "Set up your new account with your personal information and credentials. This is the first step to get started with our platform.",
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Onboarding Process",
      description:
        "Complete the guided setup process to personalize your experience by building your own course platform.",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col px-32 py-20">
        {timelineItems.map((item, index) => {
          const isCompleted = step > item.id
          const isLast = index === timelineItems.length - 1

          return (
            <div key={item.id} className="flex items-start">
              <div className="group flex gap-x-6">
                <div className="relative">
                  {!isLast && (
                    <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-slate-200"></div>
                  )}
                  <span
                    className={`relative z-10 grid h-10 w-10 place-items-center rounded-full ${
                      isCompleted ? "bg-green-500 text-white" : "bg-slate-200 text-slate-800"
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : item.icon}
                  </span>
                </div>
                <div className="-translate-y-1.5 pb-8 text-slate-600">
                  <p className="font-sans text-lg font-bold text-slate-800 antialiased dark:text-white">
                    {item.title}
                  </p>
                  <small className="mt-2 font-sans text-sm text-slate-400 antialiased">{item.description}</small>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Timeline;