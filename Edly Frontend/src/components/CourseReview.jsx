'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { useState } from 'react';

const sampleCourseReviews = [
  {
    id: '1',
    name: 'Shraddha Kapoor',
    time: '6h',
    rating: 4,
    content:
      "Best investment I've made for my career! The hands-on projects and real-world examples make all the difference. Already building my own apps! 🔥",
  },
  {
    id: '2',
    name: 'Arjun Mehta',
    time: '2d',
    rating: 5,
    content:
      'Absolutely incredible course! The instructor breaks down complex concepts into digestible pieces. I went from zero to building full-stack applications in just 3 months. The community support is amazing too!',
  },
  {
    id: '3',
    name: 'Priya Singh',
    time: '1w',
    rating: 5,
    content: 'Game changer! 💯',
  },
  {
    id: '4',
    name: 'Rahul Sharma',
    time: '3d',
    rating: 4,
    content:
      "The practical approach is what sets this apart from other courses. You're not just watching videos - you're actually building real projects that you can showcase in your portfolio.",
  },
  {
    id: '5',
    name: 'Ananya Gupta',
    time: '5h',
    rating: 5,
    content:
      'I was skeptical at first, but this course exceeded all my expectations. The step-by-step guidance and the way complex topics are explained makes learning enjoyable. Highly recommend to anyone looking to break into tech!',
  },
  {
    id: '6',
    name: 'Vikram Patel',
    time: '1d',
    rating: 3,
    content:
      'Good content overall, but could use more advanced topics. Great for beginners though!',
  },
  {
    id: '7',
    name: 'Sneha Reddy',
    time: '4d',
    rating: 5,
    content:
      'This course literally changed my life! I landed my first developer job within 2 months of completing it. The career guidance and interview prep sections are invaluable. Thank you so much! 🙏✨',
  },
  {
    id: '8',
    name: 'Karan Joshi',
    time: '12h',
    rating: 4,
    content:
      'Solid course with great examples. The projects are challenging but doable with the provided guidance.',
  },
  {
    id: '9',
    name: 'Meera Nair',
    time: '2w',
    rating: 5,
    content:
      "Perfect blend of theory and practice! The instructor's teaching style is engaging and the course structure is well thought out. I especially loved the deployment section - seeing your projects go live is such a rush!",
  },
];

export default function Component() {
  const [courseReviews, setCourseReviews] = useState(sampleCourseReviews);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`size-5 stroke-0 ${i < rating ? 'fill-amber-400' : 'fill-muted-foreground'}`}
      />
    ));
  };

  const renderMobileStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-600 text-gray-600'}`}
      />
    ));
  };

  return (
    <>
      {/* Desktop Masonry Grid */}
      <div className="hidden md:block px-2 py-6 w-8/12 mb-10">
        {/* Header */}
        <div className="mb-4 max-sm:hidden">
          <h1 className="text-2xl font-bold text-white mb-2">Recent Reviews</h1>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {courseReviews.map((courseReview, index) => (
            <Card key={index} className="break-inside-avoid mb-4">
              <CardHeader>
                <CardTitle className="text-white">
                  {courseReview.name}{' '}
                  <span className="text-muted-foreground font-medium ml-1">
                    {courseReview.time}
                  </span>
                </CardTitle>
                <div className="flex mt-1 items-center">
                  {renderStars(courseReview.rating)}
                  <Badge className="bg-gray-700 mx-2 text-white">{courseReview.rating}/5</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{courseReview.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mobile Feed Layout */}
      <div className="md:hidden bg-transparent min-h-screen pb-10">
        <div className="max-w-2xl mx-20 max-sm:w-full max-sm:mx-0">
          {/* Header */}
          <div className="sticky top-0 backdrop-blur-md border-b border-gray-800 p-4">
            <h1 className="text-xl font-bold text-white">Recent Reviews</h1>
          </div>

          {/* Reviews Feed */}
          <div className="divide-y divide-gray-800">
            {courseReviews.map((courseReview) => (
              <Card
                key={courseReview.id}
                className="bg-black border-gray-800 rounded-none border-x-0 border-t-0"
              >
                <CardContent className="p-4">
                  <div className="flex">
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* User Info & Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <span className="font-bold text-white hover:underline cursor-pointer">
                              {courseReview.name}
                            </span>
                          </div>
                          <span className="text-gray-400">{courseReview.time}</span>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex space-x-0.5">
                          {renderMobileStars(courseReview.rating)}
                        </div>
                        <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                          {courseReview.rating}/5
                        </Badge>
                      </div>

                      {/* Review Content */}
                      <div className="mt-3">
                        <p className="text-white text-[15px] leading-5">{courseReview.content}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
