import { CircleCheckBig } from 'lucide-react';
import { Button } from "../components/ui/button";
import { useState } from "react";

const CourseHighlights = () => {

    const [isExpended, setIsExpended] = useState(false);
    const handleReadMore = () => {
        setIsExpended(!isExpended);
    }

    return (
        <div>
            {/* Mobile Layout */}
            <div className="block lg:hidden space-y-6">
                <h3 className="text-xl md:text-2xl font-semibold">What you'll learn</h3>
                <div className="grid grid-cols-1 gap-4">
                        <div className="flex gap-3 items-start">
                            <CircleCheckBig className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <CircleCheckBig className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <CircleCheckBig className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                        </div>
                       {isExpended && (<>
                        <div className="flex gap-3 items-start">
                            <CircleCheckBig className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <CircleCheckBig className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <CircleCheckBig className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                        </div>
                        </>)}
                        <div>
                            <Button variant={"link"} className="pl-8 pt-0" onClick={handleReadMore}> {!isExpended ? "Read More" : "Collapse"} </Button>
                        </div>
                </div>
            </div>

            {/* Desktop Layout - Original Structure */}
            <div className="hidden lg:block px-3 py-5">
                <h3 className="text-3xl py-5 font-semibold">What you'll learn</h3>
                <div className="flex gap-10">
                    <span className='flex flex-col gap-10'>
                        <span className="flex gap-5 w-96 items-start h-32">
                            <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="text-md leading-relaxed">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                        </span>
                        <span className="flex gap-5 w-96 items-start h-32">
                            <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="text-md leading-relaxed">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                        </span>
                        <span className="flex gap-5 w-96 items-start h-32">
                            <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="text-md leading-relaxed">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                        </span>
                    </span>
                    <span className='flex flex-col gap-10'>
                        <span className="flex gap-5 w-96 items-start h-32">
                            <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="text-md leading-relaxed">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                        </span>
                        <span className="flex gap-5 w-96 items-start h-32">
                            <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="text-md leading-relaxed">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                        </span>
                        <span className="flex gap-5 w-96 items-start h-32">
                            <CircleCheckBig className="size-7 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="text-md leading-relaxed">Master Docker and Kubernetes for containerization and orchestration from basics to advanced Master Docker and Kubernetes for containerization and orchestration from basics to advanced.</p>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CourseHighlights