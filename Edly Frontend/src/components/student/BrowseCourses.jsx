import CourseCard from "../CourseCard";

const BrowseCourses = () => {
	return (
		<div className="py-10 max-sm:pt-2">
			<h1 className="text-3xl font-bold text-center">Browse Courses</h1>
			<div className="flex flex-wrap gap-8 px-20 pt-8 max-sm:px-4 max-sm:pt-3">
				<CourseCard price={5999} />
				<CourseCard price={5999} />
				<CourseCard price={5999} />
				<CourseCard price={5999} />
				<CourseCard price={5999} />
				<CourseCard price={5999} />
			</div>
		</div>
	)
}

export default BrowseCourses