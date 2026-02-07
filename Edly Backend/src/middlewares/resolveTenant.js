const Tenant = require("../models/Tenant");

const resolveTenant = async (req, res, next) => {
    // 1. Extract host
    const host = req.headers.host;

    if (!host) {
        return res.status(400).json({ error: 'Host header missing' });
    }

    // 2. Extract subdomain
    // logic: if host is teacher1.edly.com, subdomain is teacher1
    // if host is localhost:3000, we might need a fallback or stricter check
    const parts = host.split('.');

    // Basic check for localhost vs production domain
    // Assuming 3 parts for sub.domain.com
    // For localhost, we might need a different strategy or ENV variable override for testing

    let subdomain;

    if (host.includes('localhost')) {
        // For local testing: expect sub.localhost:port
        if (parts.length >= 2) {
            subdomain = parts[0];
            // if just localhost:3000, subdomain is 'localhost' which is invalid usually
            if (subdomain.includes('localhost')) subdomain = null;
        }
    } else {
        // Production: sub.edly.com
        if (parts.length >= 3) {
            subdomain = parts[0];
        }
    }

    if (!subdomain || subdomain === 'www') {
        return res.status(400).json({ error: 'Invalid or missing subdomain' });
    }

    try {
        const tenant = await Tenant.findOne({ subdomain });
        if (!tenant) return res.status(404).json({ error: 'Academy not found' });

        // 3. Attach tenant content to request
        req.tenant = tenant;
        next();
    } catch (err) {
        console.error("Tenant resolution error:", err);
        res.status(500).json({ error: 'Failed to resolve academy' });
    }
};

module.exports = resolveTenant;
