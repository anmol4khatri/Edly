const Educator = require("../models/Educator");

const resolveEducatorFromSubdomain = async (req, res, next) => {
  const host = req.headers.host.split(':')[0];
  const mainDomain = process.env.MAIN_DOMAIN;
  const subdomain = host.replace(`.${mainDomain}`, '');

  if (!subdomain || subdomain === 'www') {
    return res.status(400).json({ error: 'Invalid or missing subdomain' });
  }

  try {
    const educator = await Educator.findOne({ subdomain });
    if (!educator) return res.status(404).json({ error: 'Educator not found' });

    req.educatorFromSubdomain = educator;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Failed to resolve subdomain' });
  }
};

module.exports = resolveEducatorFromSubdomain;