import CourseCard from '@/features/courses/components/CourseCard';

const BrowseCourses = () => {
  return (
    <div className="section-padding">
      <h1 className="heading-1 text-center">Browse Courses</h1>
      <div className="grid-cards grid-cards-padding">
        <CourseCard price={5999} />
        <CourseCard price={5999} />
        <CourseCard price={5999} />
        <CourseCard price={5999} />
        <CourseCard price={5999} />
        <CourseCard price={5999} />
      </div>
    </div>
  );
};

export default BrowseCourses;
