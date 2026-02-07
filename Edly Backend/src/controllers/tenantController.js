const Tenant = require("../models/Tenant");

// Get Tenant Details (Public)
const getTenantDetails = async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.tenant._id).select('-ownerId');
        if (!tenant) return res.status(404).json({ error: "Tenant not found" });
        res.status(200).json({ tenant });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Tenant Settings (Protected: Educator/Admin)
const updateTenantSettings = async (req, res) => {
    // Ensure user is authorized to update tenant (role check in logic or middleware)
    if (req.user.role !== 'educator' && req.user.role !== 'admin') {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const { name, bio, logo, primaryColor } = req.body;

    try {
        const tenant = await Tenant.findById(req.tenant._id);
        if (!tenant) return res.status(404).json({ error: "Tenant not found" });

        // Update fields
        if (name) tenant.name = name;
        if (bio) tenant.settings.bio = bio;
        if (logo) tenant.settings.logo = logo;
        if (primaryColor) tenant.settings.primaryColor = primaryColor;

        // Mark as verified/completed if needed
        tenant.settings.isVerified = true;

        await tenant.save();
        res.status(200).json({ message: "Settings updated", tenant });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getTenantDetails,
    updateTenantSettings
};
