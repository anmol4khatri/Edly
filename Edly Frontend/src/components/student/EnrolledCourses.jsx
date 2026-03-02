import CourseCard from '../CourseCard';

const EnrolledCourses = () => {
  return (
    <div className="py-10  max-sm:pt-2 2xl:px-20">
      <h1 className="text-3xl font-bold text-center">Enrolled Courses</h1>
      <div className="flex flex-wrap gap-8 px-20 pt-8 max-sm:px-4 max-sm:pt-3 justify-center">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};

export default EnrolledCourses;
