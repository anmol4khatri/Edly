import CourseCard from '@/features/courses/components/CourseCard';

const EnrolledCourses = () => {
  return (
    <div className="section-padding">
      <h1 className="heading-1 text-center">Enrolled Courses</h1>
      <div className="grid-cards grid-cards-padding">
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
