import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useState } from "react"

const mockReviews = [
	{
		id: "1",
		user: {
			name: "Sarah Chen",
		},
		rating: 5,
		content:
			"Just completed the Advanced React course and I'm blown away! The instructor's teaching style is incredible and the projects are so practical. Already applying what I learned at work. 🚀",
		timestamp: "2h",
	},
	{
		id: "2",
		user: {
			name: "Marcus Johnson",
		},
		rating: 4,
		content:
			"Great course overall! The content is well-structured and easy to follow. Only wish there were more advanced topics covered, but definitely worth the investment.",
		timestamp: "4h",
	},
	{
		id: "3",
		user: {
			name: "Emily Rodriguez",
		},
		rating: 5,
		content:
			"This course changed my career trajectory! From zero to landing my first developer job in 6 months. The community support is amazing too. Thank you! 💙",
		timestamp: "6h",
	},
	{
		id: "4",
		user: {
			name: "Alex Thompson",
		},
		rating: 4,
		content:
			"Solid course with good examples. The instructor explains complex concepts in a simple way. Would recommend to anyone starting their coding journey.",
		timestamp: "8h",
	},
	{
		id: "5",
		user: {
			name: "Priya Patel",
		},
		rating: 5,
		content:
			"Best investment I've made for my career! The hands-on projects and real-world examples make all the difference. Already building my own apps! 🔥",
		timestamp: "12h",
	},
]

const CourseReview = () => {
	const [reviews, setReviews] = useState(mockReviews)

	const renderStars = (rating) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-600 text-gray-600"}`}
			/>
		))
	}

	return (
		<div className="bg-transparent min-h-screen pb-10">
			<div className="max-w-2xl mx-20 max-sm:w-full max-sm:mx-0">
				{/* Header */}
				<div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4">
					<h1 className="text-xl font-bold text-white">Recent Reviews</h1>
				</div>

				{/* Reviews Feed */}
				<div className="divide-y divide-gray-800">
					{reviews.map((review) => (
						<Card key={review.id} className="bg-black border-gray-800 rounded-none border-x-0 border-t-0">
							<CardContent className="p-4">
								<div className="flex">
									{/* Content */}
									<div className="flex-1 min-w-0">
										{/* User Info & Rating */}
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-2">
												<div className="flex items-center space-x-1">
													<span className="font-bold text-white hover:underline cursor-pointer">
														{review.user.name}
													</span>
												</div>
												<span className="text-gray-400">{review.timestamp}</span>
											</div>
										</div>

										{/* Rating */}
										<div className="flex items-center space-x-2 mt-1">
											<div className="flex space-x-0.5">{renderStars(review.rating)}</div>
											<Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
												{review.rating}/5
											</Badge>
										</div>

										{/* Review Content */}
										<div className="mt-3">
											<p className="text-white text-[15px] leading-5">{review.content}</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}

export default CourseReview;