import { CircleCheckBig } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const highlights = [
  'Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.',
  'Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.',
  'Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.',
  'Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.',
  'Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.',
  'Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.',
];

const HighlightItem = ({ text, className = '' }) => (
  <div className={`flex gap-3 items-start ${className}`}>
    <CircleCheckBig className="icon-md mt-0.5 flex-shrink-0 text-primary" />
    <p className="body-default text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

const CourseHighlights = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleHighlights = isExpanded ? highlights : highlights.slice(0, 3);

  return (
    <div>
      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-4">
        <h3 className="heading-3">What you&apos;ll learn</h3>
        <div className="grid grid-cols-1 gap-4">
          {visibleHighlights.map((text, index) => (
            <HighlightItem key={index} text={text} />
          ))}
          {highlights.length > 3 && (
            <Button
              variant="link"
              className="pl-8 pt-0 justify-start"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </Button>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block py-5">
        <h3 className="heading-2 py-5">What you&apos;ll learn</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-full md:w-10/12 lg:w-8/12 bg-card p-6 rounded-lg">
          {highlights.map((text, index) => (
            <HighlightItem key={index} text={text} className="min-h-[80px]" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseHighlights;
