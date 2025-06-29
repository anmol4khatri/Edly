import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
import { IndianRupee } from 'lucide-react';

const CourseCard = ({ price }) => {

	const footerClasses = price
		? 'gap-3 justify-between max-sm:flex max-sm:items-stretch px-3'
		: 'gap-3 justify-end max-sm:flex-col max-sm:items-stretch px-3';

	return (
		<Card className='max-w-lg pt-0 gap-3 pb-4'>
			<CardContent className='px-0'>
				<img
					src='https://ik.imagekit.io/sheryians/courses_gif/undefined-maxresdefault_5-AHh9_1Y.jpg'
					alt='Banner'
					className='aspect-video h-56 rounded-t-xl object-cover max-sm:w-full max-sm:h-auto'
				/>
			</CardContent>
			<CardHeader className="px-3">
				<CardTitle className="text-xl">Ethereal Swirl Gradient Lorem ipsum dolor sit amet.</CardTitle>
				<CardDescription>Smooth, flowing gradients blending rich reds and blues in an abstract swirl.</CardDescription>
			</CardHeader>
			<CardFooter className={footerClasses} >
				{price && (
					<span className="flex text-2xl">
						<IndianRupee className="size-8 py-1 -mx-1.5" strokeWidth={3}/>
						{price}
					</span>
				)}
				<Button>View Course</Button>
			</CardFooter>
		</Card>
	)
}

export default CourseCard;
