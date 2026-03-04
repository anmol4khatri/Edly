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

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`icon-md stroke-0 ${i < rating ? 'star-filled' : 'star-empty'}`} />
  ));
};

export default function Component() {
  const [courseReviews] = useState(sampleCourseReviews);

  return (
    <>
      {/* Desktop Masonry Grid */}
      <div className="hidden md:block py-4 md:py-6 w-full lg:w-8/12 mb-section">
        <div className="mb-element">
          <h2 className="heading-2 mb-element">Recent Reviews</h2>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {courseReviews.map((courseReview, index) => (
            <Card key={index} className="break-inside-avoid mb-element">
              <CardHeader>
                <CardTitle>
                  {courseReview.name}
                  <span className="text-muted-foreground font-medium ml-2 body-small">
                    {courseReview.time}
                  </span>
                </CardTitle>
                <div className="flex mt-1 items-center gap-2">
                  <div className="flex">{renderStars(courseReview.rating)}</div>
                  <Badge variant="secondary">{courseReview.rating}/5</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground body-default">{courseReview.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mobile Feed Layout */}
      <div className="md:hidden pb-section">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border card-padding z-10">
            <h2 className="heading-3">Recent Reviews</h2>
          </div>

          {/* Reviews Feed */}
          <div className="divide-y divide-border">
            {courseReviews.map((courseReview) => (
              <Card key={courseReview.id} className="bg-transparent border-none rounded-none">
                <CardContent className="card-padding">
                  <div className="flex flex-col gap-2">
                    {/* User Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{courseReview.name}</span>
                        <span className="text-muted-foreground body-small">
                          {courseReview.time}
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(courseReview.rating)}</div>
                      <Badge variant="secondary" className="body-small">
                        {courseReview.rating}/5
                      </Badge>
                    </div>

                    {/* Review Content */}
                    <p className="body-default mt-1">{courseReview.content}</p>
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
