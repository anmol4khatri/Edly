import CourseCard from '@/features/courses/components/CourseCard';

const EnrolledCourses = () => {
  return (
    <div className="section-padding">
      <h1 className="heading-1 text-center">Enrolled Courses</h1>
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
