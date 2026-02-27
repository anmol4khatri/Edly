import Tenant from "#models/Tenant.js";
import { NotFoundError, ForbiddenError } from "#utils/errors.js";

class TenantService {
    async getTenantById(tenantId) {
        const tenant = await Tenant.findById(tenantId).select('-ownerId');
        if (!tenant) {
            throw new NotFoundError("Tenant not found");
        }
        return tenant;
    }

    async updateTenantSettings(tenantId, userRole, data) {
        if (userRole !== 'educator' && userRole !== 'admin') {
            throw new ForbiddenError("Unauthorized to update tenant settings");
        }

        const { name, bio, logo, primaryColor } = data;

        const tenant = await Tenant.findById(tenantId);
        if (!tenant) {
            throw new NotFoundError("Tenant not found");
        }

        if (name) tenant.name = name;
        if (bio) tenant.settings.bio = bio;
        if (logo) tenant.settings.logo = logo;
        if (primaryColor) tenant.settings.primaryColor = primaryColor;

        tenant.settings.isVerified = true;

        await tenant.save();
        return tenant;
    }
}

export const tenantService = new TenantService();
