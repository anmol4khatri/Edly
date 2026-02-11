const Tenant = require("../models/Tenant");

// Simple in-memory cache for tenant resolution
const tenantCache = new Map();
const CACHE_TTL = 60 * 1000; // 1 minute

const resolveTenant = async (req, res, next) => {
    // 1. Extract host
    const host = req.headers.host;

    if (!host) {
        return res.status(400).json({ error: 'Host header missing' });
    }

    // 2. Extract subdomain
    let subdomain = null;
    const parts = host.split('.');

    // Localhost handling:
    // Case 1: sub.localhost:3000 -> parts=['sub', 'localhost:3000'] (length 2)
    // Case 2: localhost:3000 -> parts=['localhost:3000'] (length 1)

    if (host.includes('localhost')) {
        if (parts.length >= 2 && parts[0] !== 'www') {
            // Avoid 'localhost' itself as subdomain
            if (!parts[0].includes('localhost')) {
                subdomain = parts[0];
            }
        }
        // Fallback or explicit instruction: use 'teacher1.localhost:3000' in browser
    } else {
        // Production: sub.edly.com or sub.domain.com
        if (parts.length >= 3) {
            subdomain = parts[0];
        } else if (parts.length === 2 && host.split(':')[0] !== 'localhost') {
            // Possible custom domain scenario, but strictly for subdomains:
            // If 'example.com', no subdomain.
        }
    }

    if (!subdomain || subdomain === 'www') {
        // Allow requests to API root without tenant ONLY if strictly necessary (e.g. system admin?)
        // But for this app, everything is tenant scoped.
        return res.status(400).json({ error: 'Invalid or missing subdomain' });
    }

    // 3. Check Cache
    if (tenantCache.has(subdomain)) {
        const { tenant, timestamp } = tenantCache.get(subdomain);
        if (Date.now() - timestamp < CACHE_TTL) {
            req.tenant = tenant;
            return next();
        }
    }

    try {
        const tenant = await Tenant.findOne({ subdomain });
        if (!tenant) return res.status(404).json({ error: 'Academy not found' });

        // Update Cache
        tenantCache.set(subdomain, { tenant, timestamp: Date.now() });

        // 4. Attach tenant content to request
        req.tenant = tenant;
        next();
    } catch (err) {
        console.error("Tenant resolution error:", err);
        res.status(500).json({ error: 'Failed to resolve academy' });
    }
};

module.exports = resolveTenant;
