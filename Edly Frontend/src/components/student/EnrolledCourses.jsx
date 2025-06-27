import CourseCard from "../CourseCard";

const EnrolledCourses = () => {
	return (
		<div className="py-10 ">
			<h1 className="text-3xl font-bold text-center">Enrolled Courses</h1>
			<div className="flex flex-wrap gap-8 px-20 pt-8">
				<CourseCard action={"Continue Learning"} />
				<CourseCard action={"Continue Learning"} />
				<CourseCard action={"Continue Learning"} />
				<CourseCard action={"Continue Learning"} />
				<CourseCard action={"Continue Learning"} />
				<CourseCard action={"Continue Learning"} />
			</div>
		</div>
	)
}

export default EnrolledCourses