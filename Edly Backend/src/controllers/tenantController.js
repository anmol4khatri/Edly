import { tenantService } from '#services/tenantService.js';
import { ApiResponse } from '#utils/apiResponse.js';

// Get Tenant Details (Public)
export const getTenantDetails = async (req, res) => {
  const tenant = await tenantService.getTenantById(req.tenant._id);
  return ApiResponse.success(res, { tenant }, 'Tenant details fetched', 200);
};

// Update Tenant Settings (Protected: Educator/Admin)
export const updateTenantSettings = async (req, res) => {
  const updatedTenant = await tenantService.updateTenantSettings(
    req.tenant._id,
    req.user.role,
    req.body
  );

  return ApiResponse.success(res, { tenant: updatedTenant }, 'Settings updated', 200);
};
