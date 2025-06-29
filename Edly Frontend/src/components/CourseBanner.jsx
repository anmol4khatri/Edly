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
	const courseFeatures = [
		{ icon: Clock9, text: "19 hours high quality content" },
		{ icon: FolderKey, text: "More than 18 Quizes" },
		{ icon: Download, text: "13 downloadable resources" },
		{ icon: ChartLine, text: "Industry grade project" },
		{ icon: Infinity, text: "Life time access" },
		{ icon: Trophy, text: "Certificate of completion" }
	];

	return (
		<Card className='max-w-md pt-0 max-sm:bg-transparent max-sm:shadow-none max-sm:border-none'>
			{/* Desktop: Show full banner with thumbnail */}
			<div className="hidden lg:block">
				<CardContent className='px-0'>
					<img
						src='https://ik.imagekit.io/sheryians/courses_gif/undefined-maxresdefault_5-AHh9_1Y.jpg'
						alt='Banner'
						className='aspect-video h-60 rounded-t-xl object-cover'
					/>
				</CardContent>
			</div>

			{/* Desktop: Original Card Header and Footer */}
			<div className="hidden lg:block">
				<CardHeader>
					<span className="flex text-3xl pb-3">
						<IndianRupee className="size-7" strokeWidth={3} />
						<CardTitle>5999</CardTitle>
					</span>
					<Button size={"lg"} className="text-lg font-bold">Enroll Now</Button>
				</CardHeader>
				<CardFooter className='max-sm:flex-col max-sm:items-stretch'>
					<div>
						<h1 className='text-2xl font-bold pt-5 pb-3'>This course includes:</h1>
						<div className="flex gap-2 text-lg pb-2">
							<Clock9 className="p-0.5 text-primary" />
							<p className='text-[#a3a4a6]'>19 hours high quality content</p>
						</div>
						<div className="flex gap-2 text-lg  pb-2">
							<FolderKey className="p-0.5 text-primary" />
							<p  className='text-[#a3a4a6]'>More than 18 Quizes</p>
						</div>
						<div className="flex gap-2 text-lg pb-2">
							<Download className="p-0.5 text-primary" />
							<p  className='text-[#a3a4a6]'>13 downloadable resources</p>
						</div>
						<div className="flex gap-2 text-lg pb-2">
							<ChartLine className="p-0.5 text-primary" />
							<p  className='text-[#a3a4a6]'>Industry grade project</p>
						</div>
						<div className="flex gap-2 text-lg pb-2">
							<Infinity className="p-0.5 text-primary" />
							<p  className='text-[#a3a4a6]'>Life time access</p>
						</div>
						<div className="flex gap-2 text-lg pb-2">
							<Trophy className="p-0.5 text-primary" />
							<p  className='text-[#a3a4a6]'>Certificate of completion</p>
						</div>
					</div>
				</CardFooter>
			</div>

			{/* Mobile: CourseIncludes-style layout */}
			<div className="block lg:hidden space-y-6">
				{/* Price and Enroll Button */}
				<div className="space-y-2">
					<span className="flex text-2xl md:text-3xl font-bold">
						<IndianRupee className="size-7 md:size-7 pt-1" strokeWidth={3} />
						<span>5999</span>
					</span>
					<Button size={"lg"} className="text-lg font-bold w-full">Enroll Now</Button>
				</div>

				{/* Course Includes Section */}
				<div className="space-y-4">
					<h3 className="text-xl md:text-2xl font-semibold">This course includes:</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{courseFeatures.map((feature, index) => (
							<div key={index} className="flex items-center gap-3 text-sm md:text-base">
								<feature.icon className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
								<span className="text-muted-foreground">{feature.text}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	)
}

export default CourseBanner
