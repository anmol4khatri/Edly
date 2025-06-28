import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
import RatingDisplay from './RatingDisplay'
import { Globe } from 'lucide-react';
import { Clock9 } from 'lucide-react';

const CourseHero = () => {
    return (
        <div className="py-5">
            <Card className="h-60">
                <CardHeader>
                    <CardTitle className="text-4xl w-6/10 font-extrabold pb-5">Docker and Kubernetes for beginners | DevOps journey</CardTitle>
                    <CardDescription className="text-xl w-6/10">Docker & Kubernetes Masterclass: Build, Deploy, & Scale on AWS, Azure, & GCP.</CardDescription>
                </CardHeader>
                <CardFooter className="flex gap-5">
                    <RatingDisplay rating={4.8} />
                    <span className='text-muted-foreground text-xl'> | </span>
                    <span className="flex gap-2">
                        <Globe/>
                        <p>English</p>
                    </span>
                    <span className='text-muted-foreground text-xl'> | </span>
                    <span className="flex gap-2">
                        <Clock9 />
                        <p>8 Hours</p>
                    </span>
                </CardFooter> 
            </Card>
        </div>
    )
}
export default CourseHero