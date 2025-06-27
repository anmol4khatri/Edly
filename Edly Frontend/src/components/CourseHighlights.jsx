import { CircleCheckBig } from 'lucide-react';

const CourseHighlights = () => {
    return (
        <span className="px-10 py-10">
        <h3 className="text-3xl py-5 font-semibold">What you'll learn</h3>
        <div className="flex gap-10">
            <span className='flex flex-col gap-10'>
                <span className="flex gap-5 w-96 items-start">
                    <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
                    <p className="text-md leading-relaxed">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                </span>
                <span className="flex gap-5 w-96 items-start">
                    <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
                    <p className="text-md leading-relaxed">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                </span>
                <span className="flex gap-5 w-96 items-start">
                    <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
                    <p className="text-md leading-relaxed">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                </span>
            </span>
            <span className='flex flex-col gap-10'>
                <span className="flex gap-5 w-96 items-start">
                    <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
                    <p className="text-md leading-relaxed">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                </span>
                <span className="flex gap-5 w-96 items-start">
                    <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
                    <p className="text-md leading-relaxed">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                </span>
                <span className="flex gap-5 w-96 items-start">
                    <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
                    <p className="text-md leading-relaxed">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                </span>
            </span>
        </div>
        </span>
    )
}

export default CourseHighlights