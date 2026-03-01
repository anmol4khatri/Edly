import { CircleCheckBig } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useState } from 'react';

const CourseHighlights = () => {
  const [isExpended, setIsExpended] = useState(false);
  const handleReadMore = () => {
    setIsExpended(!isExpended);
  };

  return (
    <div>
      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-6">
        <h3 className="text-xl md:text-2xl font-semibold">What you'll learn</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-3 items-start">
            <CircleCheckBig className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Master Docker and Kubernetes for containerization and orchestration from basics to
              advanced Master Docker and Kubernetes for containerization and orchestration from
              basics to advanced.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <CircleCheckBig className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Master Docker and Kubernetes for containerization and orchestration from basics to
              advanced Master Docker and Kubernetes for containerization and orchestration from
              basics to advanced.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <CircleCheckBig className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Master Docker and Kubernetes for containerization and orchestration from basics to
              advanced Master Docker and Kubernetes for containerization and orchestration from
              basics to advanced.
            </p>
          </div>
          {isExpended && (
            <>
              <div className="flex gap-3 items-start">
                <CircleCheckBig className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                  Master Docker and Kubernetes for containerization and orchestration from basics to
                  advanced Master Docker and Kubernetes for containerization and orchestration from
                  basics to advanced.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <CircleCheckBig className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                  Master Docker and Kubernetes for containerization and orchestration from basics to
                  advanced Master Docker and Kubernetes for containerization and orchestration from
                  basics to advanced.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <CircleCheckBig className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                  Master Docker and Kubernetes for containerization and orchestration from basics to
                  advanced Master Docker and Kubernetes for containerization and orchestration from
                  basics to advanced.
                </p>
              </div>
            </>
          )}
          <div>
            <Button variant={'link'} className="pl-8 pt-0" onClick={handleReadMore}>
              {' '}
              {!isExpended ? 'Read More' : 'Collapse'}{' '}
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Responsive Two-Column Grid */}
      <div className="hidden lg:block px-0 py-5">
        <h3 className="text-3xl py-5 font-semibold">What you'll learn</h3>
        <div className="grid grid-cols-2 gap-x-10 gap-y-8 w-full md:w-10/12 lg:w-8/12 bg-card p-5 rounded">
          <div className="flex gap-5 items-start min-h-[80px]">
            <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-md leading-relaxed">
              Master Docker and Kubernetes for containerization and orchestration from basics to
              advanced Master Docker and Kubernetes for containerization and orchestration from
              basics to advanced.
            </p>
          </div>
          <div className="flex gap-5 items-start min-h-[80px]">
            <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-md leading-relaxed">
              Master Docker and Kubernetes for containerization and orchestration from basics to
              advanced Master Docker and Kubernetes for containerization and orchestration from
              basics to advanced.
            </p>
          </div>
          <div className="flex gap-5 items-start min-h-[80px]">
            <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-md leading-relaxed">
              Master Docker and Kubernetes for containerization and orchestration from basics to
              advanced Master Docker and Kubernetes for containerization and orchestration from
              basics to advanced.
            </p>
          </div>
          <div className="flex gap-5 items-start min-h-[80px]">
            <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-md leading-relaxed">
              Master Docker and Kubernetes for containerization and orchestration from basics to
              advanced Master Docker and Kubernetes for containerization and orchestration from
              basics to advanced.
            </p>
          </div>
          <div className="flex gap-5 items-start min-h-[80px]">
            <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-md leading-relaxed">
              Master Docker and Kubernetes for containerization and orchestration from basics to
              advanced Master Docker and Kubernetes for containerization and orchestration from
              basics to advanced.
            </p>
          </div>
          <div className="flex gap-5 items-start min-h-[80px]">
            <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-md leading-relaxed">
              Master Docker and Kubernetes for containerization and orchestration from basics to
              advanced Master Docker and Kubernetes for containerization and orchestration from
              basics to advanced.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHighlights;
