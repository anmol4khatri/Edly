import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { useState } from 'react';

const reviewData = [
  { stars: 5, count: 629, percentage: 76 },
  { stars: 4, count: 116, percentage: 14 },
  { stars: 3, count: 50, percentage: 6 },
  { stars: 2, count: 24, percentage: 3 },
  { stars: 1, count: 8, percentage: 1 },
];

export default function CustomerReviews() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleStarClick = (starValue) => setRating(starValue);
  const handleStarHover = (starValue) => setHoveredRating(starValue);
  const handleStarLeave = () => setHoveredRating(0);

  const handleSubmitReview = () => {
    setIsDialogOpen(false);
    setRating(0);
    setReviewText('');
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setRating(0);
    setReviewText('');
  };

  return (
    <div className="w-full lg:w-8/12 py-5">
      {/* Header */}
      <div className="mb-4 max-sm:hidden">
        <h2 className="heading-2 mb-2">Course Reviews</h2>
        <p className="text-muted-foreground body-default">What our students are saying</p>
      </div>

      <div className="max-w-4xl">
        <Card className="max-sm:bg-transparent max-sm:border-none">
          <CardContent className="p-6 text-center">
            {/* Header Mobile */}
            <div className="mb-4 sm:hidden">
              <h2 className="heading-2 mb-2">Course Reviews</h2>
              <p className="text-muted-foreground body-default">What our students are saying</p>
            </div>

            <div className="sm:flex sm:gap-10">
              {/* Rating Display */}
              <div className="mb-6">
                <div className="text-5xl font-bold mb-2">4.7</div>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="icon-lg star-filled" />
                  ))}
                </div>
                <p className="text-muted-foreground body-small">Based on 827 reviews</p>
              </div>

              {/* Rating Breakdown */}
              <div className="mb-6 space-y-2 sm:flex-1">
                {reviewData.map((item) => (
                  <div key={item.stars} className="flex items-center gap-4">
                    <span className="text-muted-foreground body-small w-16 text-left">
                      {item.stars} stars
                    </span>
                    <div className="flex-1">
                      <Progress value={item.percentage} className="h-2.5 bg-muted" />
                    </div>
                    <span className="text-muted-foreground body-small w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Write Review Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" size="lg">
                  Write a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5 bg-card border-border">
                <DialogHeader className="contents space-y-0 text-left">
                  <DialogTitle className="border-b border-border px-6 py-4 body-default font-semibold">
                    Write a Review
                  </DialogTitle>
                </DialogHeader>
                <div className="px-6 py-4">
                  <form className="space-y-5">
                    <div className="space-y-4">
                      <fieldset className="space-y-4">
                        <legend className="heading-4">How would you rate this course?</legend>
                        <div className="flex gap-1 justify-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleStarClick(star)}
                              onMouseEnter={() => handleStarHover(star)}
                              onMouseLeave={handleStarLeave}
                              className="transition-transform duration-150 hover:scale-110"
                            >
                              <Star
                                className={`icon-xl transition-colors duration-150 ${
                                  star <= (hoveredRating || rating)
                                    ? 'star-filled'
                                    : 'text-muted-foreground hover:text-rating/70'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <div className="text-muted-foreground mt-2 flex justify-between body-small">
                        <span>Poor</span>
                        <span>Excellent</span>
                      </div>

                      <div className="space-y-2 mt-6">
                        <Label className="text-muted-foreground">
                          Why did you give this rating?
                        </Label>
                        <Textarea
                          id="feedback"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Share your experience with this course..."
                          aria-label="Write your review"
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button type="button" variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleSubmitReview}
                        disabled={!rating || !reviewText.trim()}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
