import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'

const CourseHero = () => {
    return (
        <div className="px-16 py-5">
            <Card>
                <CardHeader>
                    <CardTitle class="text-4xl w-6/10 font-extrabold pb-5">Docker and Kubernetes for beginners | DevOps journey</CardTitle>
                    <CardDescription class="text-xl w-6/10">Docker & Kubernetes Masterclass: Build, Deploy, & Scale on AWS, Azure, & GCP.</CardDescription>
                </CardHeader>
                {/* <CardContent>
                    <p>Card Content</p>
                </CardContent>*/}
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> 
            </Card>
        </div>
    )
}
export default CourseHero