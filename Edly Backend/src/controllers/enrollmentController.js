import { enrollmentService } from '#services/enrollmentService.js';
import { ApiResponse } from '#utils/apiResponse.js';

// Enroll in a course
export const enroll = async (req, res) => {
  const { courseId } = req.body;
  const studentId = req.user._id;
  const tenantId = req.tenant._id;

  const enrollment = await enrollmentService.enroll(tenantId, studentId, courseId);
  return ApiResponse.success(res, { enrollment }, 'Enrollment successful', 201);
};

// Get My Enrollments
export const getMyEnrollments = async (req, res) => {
  const enrollments = await enrollmentService.getMyEnrollments(req.tenant._id, req.user._id);
  return ApiResponse.success(res, { enrollments }, 'Enrollments fetched', 200);
};

// Get Enrolled Course Content (Full Access)
export const getEnrolledCourseContent = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user._id;
  const tenantId = req.tenant._id;

  const courseData = await enrollmentService.getEnrolledCourseContent(
    tenantId,
    studentId,
    courseId
  );

  return ApiResponse.success(res, courseData, 'Course content retrieved', 200);
};
