import { moduleService } from '#services/moduleService.js';
import { ApiResponse } from '#utils/apiResponse.js';

// Create Module
export const createModule = async (req, res) => {
  const { courseId } = req.params;
  const newModule = await moduleService.createModule(
    req.tenant._id,
    req.user.role,
    courseId,
    req.body
  );
  return ApiResponse.success(res, { module: newModule }, 'Module created', 201);
};

// Get Modules
export const getAllModulesByCourse = async (req, res) => {
  const { courseId } = req.params;
  const populatedModules = await moduleService.getAllModulesByCourse(
    req.tenant._id,
    req.user.role,
    courseId
  );
  return ApiResponse.success(res, { modules: populatedModules }, 'Modules retrieved', 200);
};

// Delete Module
export const deleteModule = async (req, res) => {
  const { moduleId, courseId } = req.params;
  await moduleService.deleteModule(req.tenant._id, req.user.role, courseId, moduleId);
  return ApiResponse.success(res, null, 'Module deleted', 200);
};

// Add Content to Module
export const addContent = async (req, res) => {
  const { moduleId, courseId } = req.params;
  const { content } = req.body;
  const updatedModule = await moduleService.addContent(
    req.tenant._id,
    req.user.role,
    courseId,
    moduleId,
    content
  );
  return ApiResponse.success(res, { module: updatedModule }, 'Content added', 200);
};

// Delete Content
export const deleteContent = async (req, res) => {
  const { moduleId, type, refId } = req.params;
  const updatedModule = await moduleService.deleteContent(
    req.tenant._id,
    req.user.role,
    moduleId,
    type,
    refId
  );
  return ApiResponse.success(res, { module: updatedModule }, 'Content deleted', 200);
};
