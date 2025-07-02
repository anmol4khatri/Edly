import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { useState } from "react"

export default function CustomerReviews() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [reviewText, setReviewText] = useState("")

    const handleStarClick = (starValue) => {
        setRating(starValue)
    }

    const handleStarHover = (starValue) => {
        setHoveredRating(starValue)
    }

    const handleStarLeave = () => {
        setHoveredRating(0)
    }

    const handleSubmitReview = () => {
        // Handle review submission logic
        console.log({ rating, reviewText })
        setIsDialogOpen(false)
        setRating(0)
        setReviewText("")
    }

    const handleCancel = () => {
        setIsDialogOpen(false)
        setRating(0)
        setReviewText("")
    }

    const reviewData = [
        { stars: 5, count: 629, percentage: 76 },
        { stars: 4, count: 116, percentage: 14 },
        { stars: 3, count: 50, percentage: 6 },
        { stars: 2, count: 24, percentage: 3 },
        { stars: 1, count: 8, percentage: 1 },
    ]

    return (
        <div className="w-8/12 px-2 max-sm:w-full max-sm:px-0">
            <div className="max-w-4xl">
                <Card className="max-sm:bg-transparent max-sm:border-none ">
                    <CardContent className="p-4 text-center">
                        {/* Header */}
                        <div className="mb-4">
                            <h1 className="text-3xl font-bold text-white mb-2">Course Reviews</h1>
                            <p className="text-slate-400">What our students are saying</p>
                        </div>

                        <div className="min-sm:flex min-sm:gap-10">
                            {/* Rating Display */}
                        <div className="mb-4">
                            <div className="text-5xl font-bold text-white mb-2">4.7</div>

                            {/* Stars */}
                            <div className="flex justify-center gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <p className="text-slate-400">Based on 827 reviews</p>
                        </div>

                            {/* Rating Breakdown */}
                            <div className="mb-6 space-y-2 min-sm:w-2xl">
                                {reviewData.map((item) => (
                                    <div key={item.stars} className="flex items-center gap-4">
                                        <div className="text-slate-300 font-medium w-16 text-left">{item.stars} stars</div>
                                        <div className="flex-1">
                                            <Progress
                                                value={item.percentage}
                                                className="h-3 bg-slate-700"
                                                style={{
                                                    "--progress-background": "rgb(51 65 85)",
                                                    "--progress-foreground": "rgb(139 92 246)",
                                                }}
                                            />
                                        </div>
                                        <div className="text-slate-300 font-medium w-12 text-right">{item.count}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Write Review Button */}
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="w-full bg-primary text-white font-semibold py-4 text-lg rounded-xl"
                                    size="lg"
                                >
                                    Write a Review
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5 bg-[#17181C] border-black border-2 text-white">
                                <DialogHeader className="contents space-y-0 text-left">
                                    <DialogTitle className="border-b border-slate-600 px-6 py-4 text-base text-white">Write a Review</DialogTitle>
                                </DialogHeader>
                                <div className="px-6 py-4">
                                    <form className="space-y-5">
                                        <div className="space-y-4">
                                            <div>
                                                <fieldset className="space-y-4">
                                                    <legend className="text-white text-lg leading-none font-semibold">
                                                        How would you rate this course?
                                                    </legend>
                                                    <div className="flex gap-1 justify-center">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() => handleStarClick(star)}
                                                                onMouseEnter={() => handleStarHover(star)}
                                                                onMouseLeave={handleStarLeave}
                                                                className="transition-all duration-150 hover:scale-110 transform"
                                                            >
                                                                <Star
                                                                    className={`w-10 h-10 transition-colors duration-150 ${star <= (hoveredRating || rating)
                                                                        ? "fill-yellow-400 text-yellow-400"
                                                                        : "text-slate-300 hover:text-yellow-300"
                                                                        }`}
                                                                />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </fieldset>
                                                <div className="text-slate-400 mt-2 flex justify-between text-xs">
                                                    <p>Poor</p>
                                                    <p>Excellent</p>
                                                </div>
                                            </div>
                                            <div className="*:not-first:mt-2 mt-7">
                                                <Label className="text-slate-300">Why did you give this rating?</Label>
                                                <Textarea
                                                    id="feedback"
                                                    value={reviewText}
                                                    onChange={(e) => setReviewText(e.target.value)}
                                                    placeholder="Share your experience with this course..."
                                                    aria-label="Write your review"
                                                    rows={4}
                                                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3">
                                            <Button type="button" variant="outline" onClick={handleCancel} className="px-6 bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                                                Cancel
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={handleSubmitReview}
                                                disabled={!rating || !reviewText.trim()}
                                                className="px-6 bg-primary text-white"
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
    )
}
