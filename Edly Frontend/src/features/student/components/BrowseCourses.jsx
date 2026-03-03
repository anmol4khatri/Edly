import CourseCard from '@/features/courses/components/CourseCard';

const BrowseCourses = () => {
  return (
    <div className="section-padding">
      <h1 className="heading-1 text-center">Browse Courses</h1>
      <div className="flex flex-wrap gap-8 px-20 pt-8 max-sm:px-4 max-sm:pt-3 justify-center">
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
