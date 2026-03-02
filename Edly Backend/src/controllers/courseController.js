import { courseService } from '#services/courseService.js';
import { ApiResponse } from '#utils/apiResponse.js';

// Create Course
export const createCourse = async (req, res) => {
  const course = await courseService.createCourse(req.tenant._id, req.user.role, req.body);
  return ApiResponse.success(res, { course }, 'Course Created Successfully', 201);
};

// Update Course
export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const course = await courseService.updateCourse(
    req.tenant._id,
    req.user.role,
    courseId,
    req.body
  );
  return ApiResponse.success(res, { course }, 'Course Updated', 200);
};

// Get All Courses (Public, but scoped to Tenant) with Pagination
export const getAllCourses = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const { courses, total } = await courseService.getAllCourses(req.tenant._id, page, limit);

  return ApiResponse.paginated(res, { courses }, page, limit, total);
};

// Get Single Course (Public)
export const getCourseById = async (req, res) => {
  const { courseId } = req.params;
  const result = await courseService.getCourseById(req.tenant._id, courseId, req.user);
  return ApiResponse.success(res, result, 'Course retrieved successfully', 200);
};

// Delete Course
export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  await courseService.deleteCourse(req.tenant._id, req.user.role, courseId);
  return ApiResponse.success(res, null, 'Course Deleted Successfully', 200);
};
