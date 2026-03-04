import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card';
import RatingDisplay from '@/features/courses/components/RatingDisplay';
import { Globe, Clock9 } from 'lucide-react';

const CourseHero = () => {
  return (
    <div className="py-5">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Course Thumbnail */}
        <div className="w-full pb-component">
          <img
            src="https://ik.imagekit.io/sheryians/courses_gif/undefined-maxresdefault_5-AHh9_1Y.jpg"
            alt="Course Thumbnail"
            className="w-full aspect-video rounded-lg object-cover"
          />
        </div>

        {/* Title and Description */}
        <div className="space-y-2 pb-3">
          <h1 className="heading-2 leading-tight">
            Docker and Kubernetes for beginners | DevOps journey
          </h1>
          <p className="body-large text-muted-foreground">
            Docker & Kubernetes Masterclass: Build, Deploy, & Scale on AWS, Azure, & GCP.
          </p>
        </div>

        {/* Rating, Language, and Duration */}
        <div className="flex flex-wrap items-center gap-4 body-default">
          <div className="w-full">
            <RatingDisplay rating={4.8} />
          </div>
          <span className="flex items-center gap-2">
            <Globe className="icon-sm text-primary" />
            <span className="text-muted-foreground">English</span>
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="flex items-center gap-2">
            <Clock9 className="icon-sm text-primary" />
            <span className="text-muted-foreground">8 Hours</span>
          </span>
        </div>
      </div>

      {/* Desktop Layout - Original Structure */}
      <div className="hidden lg:block">
        <Card className="h-60">
          <CardHeader>
            <CardTitle className="heading-1 w-6/10 pb-2">
              Docker and Kubernetes for beginners | DevOps journey
            </CardTitle>
            <CardDescription className="body-large w-6/10">
              Docker & Kubernetes Masterclass: Build, Deploy, & Scale on AWS, Azure, & GCP.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-6 mt-2 2xl:mt-1">
            <RatingDisplay rating={4.8} />
            <span className="text-muted-foreground text-xl">|</span>
            <span className="flex items-center gap-2">
              <Globe className="icon-md text-primary" />
              <span>English</span>
            </span>
            <span className="text-muted-foreground text-xl">|</span>
            <span className="flex items-center gap-2">
              <Clock9 className="icon-md text-primary" />
              <span>8 Hours</span>
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CourseHero;
