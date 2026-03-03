import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  IndianRupee,
  Clock,
  HelpCircle,
  Download,
  Briefcase,
  Infinity as InfinityIcon,
  Award,
} from 'lucide-react';

const courseFeatures = [
  { icon: Clock, text: '19 hours high quality content' },
  { icon: HelpCircle, text: 'More than 18 Quizes' },
  { icon: Download, text: '13 downloadable resources' },
  { icon: Briefcase, text: 'Industry grade project' },
  { icon: InfinityIcon, text: 'Life time access' },
  { icon: Award, text: 'Certificate of completion' },
];

const CourseBanner = () => {
  return (
    <Card className="max-w-md pt-0 max-sm:bg-transparent max-sm:shadow-none max-sm:border-none">
      {/* Desktop: Show full banner with thumbnail */}
      <div className="hidden lg:block">
        <CardContent className="px-0">
          <img
            src="https://ik.imagekit.io/sheryians/courses_gif/undefined-maxresdefault_5-AHh9_1Y.jpg"
            alt="Banner"
            className="aspect-video h-60 rounded-t-lg object-cover"
          />
        </CardContent>
      </div>

      {/* Desktop: Original Card Header and Footer */}
      <div className="hidden lg:block">
        <CardHeader>
          <span className="flex items-center text-3xl font-semibold pb-3">
            <IndianRupee className="icon-lg" strokeWidth={3} />
            <CardTitle>5999</CardTitle>
          </span>
          <Button size="lg" className="text-lg font-semibold">
            Enroll Now
          </Button>
        </CardHeader>
        <CardFooter className="max-sm:flex-col max-sm:items-stretch">
          <div className="space-y-3">
            <h3 className="heading-4 pt-4">This course includes:</h3>
            {courseFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <feature.icon className="icon-md flex-shrink-0 text-primary" />
                <span className="text-muted-foreground body-default">{feature.text}</span>
              </div>
            ))}
          </div>
        </CardFooter>
      </div>

      {/* Mobile: CourseIncludes-style layout */}
      <div className="block lg:hidden space-y-6">
        {/* Price and Enroll Button */}
        <div className="space-y-3">
          <span className="flex items-center heading-2">
            <IndianRupee className="icon-lg" strokeWidth={3} />
            <span>5999</span>
          </span>
          <Button size="lg" className="text-lg font-semibold w-full">
            Enroll Now
          </Button>
        </div>

        {/* Course Includes Section */}
        <div className="space-y-4">
          <h3 className="heading-3">This course includes:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {courseFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <feature.icon className="icon-md flex-shrink-0 text-primary" />
                <span className="text-muted-foreground body-small">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseBanner;
