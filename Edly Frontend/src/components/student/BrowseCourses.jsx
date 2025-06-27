import CourseCard from "../CourseCard";

const BrowseCourses = () => {
	return (
		<div className="py-10 ">
			<h1 className="text-3xl font-bold text-center">Browse Courses</h1>
			<div className="flex flex-wrap gap-8 px-20 pt-8">
				<CourseCard price={5999} action={"View Course"} />
				<CourseCard price={5999} action={"View Course"} />
				<CourseCard price={5999} action={"View Course"} />
				<CourseCard price={5999} action={"View Course"} />
				<CourseCard price={5999} action={"View Course"} />
				<CourseCard price={5999} action={"View Course"} />
			</div>
		</div>
	)
}

export default BrowseCourses