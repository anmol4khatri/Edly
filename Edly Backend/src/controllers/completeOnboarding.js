const Educator = require("../models/Educator");

const completeOnboarding = async (req, res) => {
    const { _id, isProfileComplete } = req.educator;
    const { firstName, lastName, subdomain, bio, organization,
        organizationLogo, experienceYears, qualifications } = req.body;

    if (isProfileComplete) {
        return res.status(403).json({ error: "You are already registred as an educator" })
    }

    try {
        const updated = await Educator.findByIdAndUpdate(_id, {
            firstName,
            lastName,
            subdomain,
            bio,
            organization,
            organizationLogo,
            experienceYears,
            qualifications,
            isProfileComplete: true,
        }, { new: true, runValidators: true });
        await updated.save();

        res.status(200).json({ message: "Onboarding completed", educator: updated });
    } catch (err) {
        res.status(500).json({ error: "Error: " + err.message });
    }
};

module.exports = completeOnboarding;