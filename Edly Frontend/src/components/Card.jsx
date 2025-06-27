import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
import { IndianRupee } from 'lucide-react';

const CourseCard = ({ price, action }) => {
	return (
		<Card className='max-w-lg pt-0'>
			<CardContent className='px-0'>
				<img
					src='https://ik.imagekit.io/sheryians/courses_gif/undefined-maxresdefault_5-AHh9_1Y.jpg'
					alt='Banner'
					className='aspect-video h-56 rounded-t-xl object-cover'
				/>
			</CardContent>
			<CardHeader>
				<CardTitle>Ethereal Swirl Gradient Lorem ipsum dolor sit amet.</CardTitle>
				<CardDescription>Smooth, flowing gradients blending rich reds and blues in an abstract swirl.</CardDescription>
			</CardHeader>
			<CardFooter className='gap-3 justify-between max-sm:flex-col max-sm:items-stretch'>
				{price && (
					<span className="flex text-xl">
						<IndianRupee className="size-7 py-1" />
						{price}
					</span>
				)}
				<Button>{action}</Button>
			</CardFooter>
		</Card>
	)
}

export default CourseCard;
