import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
import RatingDisplay from './RatingDisplay'
import { Globe } from 'lucide-react';
import { Clock9 } from 'lucide-react';

const CourseHero = () => {
    return (
        <div className="py-5">
            {/* Mobile Layout */}
            <div className="block lg:hidden">
                {/* Course Thumbnail */}
                <div className="w-full pb-6">
                    <img
                        src='https://ik.imagekit.io/sheryians/courses_gif/undefined-maxresdefault_5-AHh9_1Y.jpg'
                        alt='Course Thumbnail'
                        className='w-full aspect-video rounded-lg object-cover'
                    />
                </div>

                {/* Title and Description */}
                <div className="space-y-2 pb-3">
                    <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
                        Docker and Kubernetes for beginners | DevOps journey
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Docker & Kubernetes Masterclass: Build, Deploy, & Scale on AWS, Azure, & GCP.
                    </p>
                </div>

                {/* Rating, Language, and Duration */}
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                    <div className="w-full">
                        <RatingDisplay rating={4.8} />
                    </div>
                    <span className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-primary" />
                        <span className='text-muted-foreground'>English</span>
                    </span>
                    <span className='text-muted-foreground'>|</span>
                    <span className="flex items-center gap-2">
                        <Clock9 className="w-4 h-4 text-primary" />
                        <span className='text-muted-foreground'>8 Hours</span>
                    </span>
                </div>
            </div>

            {/* Desktop Layout - Original Structure */}
            <div className="hidden lg:block">
                <Card className="h-60">
                    <CardHeader>
                        <CardTitle className="text-4xl w-6/10 font-extrabold pb-2 2xl:pb-4">Docker and Kubernetes for beginners | DevOps journey</CardTitle>
                        <CardDescription className="text-xl w-6/10 2xl:pb-5">Docker & Kubernetes Masterclass: Build, Deploy, & Scale on AWS, Azure, & GCP.</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex gap-5 mt-6 2xl:-mt-6">
                        <RatingDisplay rating={4.8} />
                        <span className='text-muted-foreground text-xl'> | </span>
                        <span className="flex gap-2">
                            <Globe className='text-primary'/>
                            <p>English</p>
                        </span>
                        <span className='text-muted-foreground text-xl'> | </span>
                        <span className="flex gap-2">
                            <Clock9 className='text-primary'/>
                            <p>8 Hours</p>
                        </span>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default CourseHero