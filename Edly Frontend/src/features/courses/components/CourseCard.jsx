import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ price }) => {
  const navigate = useNavigate();

  return (
    <Card className="max-w-lg pt-0 gap-3 pb-component card-interactive">
      <CardContent className="px-0">
        <img
          src="https://ik.imagekit.io/sheryians/courses_gif/undefined-maxresdefault_5-AHh9_1Y.jpg"
          alt="Banner"
          className="aspect-video h-56 rounded-t-lg object-cover max-sm:w-full max-sm:h-auto"
        />
      </CardContent>
      <CardHeader className="px-3">
        <CardTitle className="heading-4">
          Ethereal Swirl Gradient Lorem ipsum dolor sit amet.
        </CardTitle>
        <CardDescription className="body-small">
          Smooth, flowing gradients blending rich reds and blues in an abstract swirl.
        </CardDescription>
      </CardHeader>
      <CardFooter
        className={`gap-3 px-3 ${price ? 'justify-between' : 'justify-end'} max-sm:flex max-sm:items-stretch`}
      >
        {price && (
          <span className="flex items-center text-2xl font-semibold">
            <IndianRupee className="icon-lg -mr-1" strokeWidth={3} />
            {price}
          </span>
        )}
        <Button onClick={() => navigate('/course')}>View Course</Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
