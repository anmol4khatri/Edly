import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { IndianRupee } from 'lucide-react';
import { Clock9 } from 'lucide-react';
import { FolderKey } from 'lucide-react';
import { Download } from 'lucide-react';
import { ChartLine } from 'lucide-react';
import { Infinity } from 'lucide-react';
import { Trophy } from 'lucide-react';

const CourseBanner = () => {
	return (
		<Card className='max-w-md pt-0'>
			<CardContent className='px-0'>
				<img
					src='https://ik.imagekit.io/sheryians/courses_gif/undefined-maxresdefault_5-AHh9_1Y.jpg'
					alt='Banner'
					className='aspect-video h-60 rounded-t-xl object-cover'
				/>
			</CardContent>
			<CardHeader>
				<span className="flex text-3xl pb-3">
					<IndianRupee className="size-7" strokeWidth={3} />
					<CardTitle>5999</CardTitle>
				</span>
				<Button size={"lg"} className="text-lg font-bold">Enroll Now</Button>
			</CardHeader>
			<CardFooter className='gap-3 max-sm:flex-col max-sm:items-stretch'>
				<div>
					<div className="flex gap-2 text-lg pb-2">
						<Clock9 className="p-0.5"/>
						<p>19 hours high quality content</p>
					</div>
					<div className="flex gap-2 text-lg  pb-2">
						<FolderKey className="p-0.5"/>
						<p>More than 18 Quizes</p>
					</div>
					<div className="flex gap-2 text-lg pb-2">
						<Download className="p-0.5"/>
						<p>13 downloadable resources</p>
					</div>
					<div className="flex gap-2 text-lg pb-2">
						<ChartLine className="p-0.5"/>
						<p>Industry grade project</p>
					</div>
					<div className="flex gap-2 text-lg pb-2">
						<Infinity className="p-0.5"/>
						<p>Life time access</p>
					</div>
					<div className="flex gap-2 text-lg pb-2">
						<Trophy className="p-0.5"/>
						<p>Certificate of completion</p>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}

export default CourseBanner
