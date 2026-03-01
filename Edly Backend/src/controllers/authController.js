import { authService } from '#services/authService.js';
import { ApiResponse } from '#utils/apiResponse.js';

// Sign up
export const register = async (req, res) => {
  const tenantId = req.tenant._id;
  const { user, token } = await authService.register(tenantId, req.body);

  res.cookie('token', token, {
    httpOnly: true,
    // secure: true, // Enable in production with HTTPS
    sameSite: 'strict',
  });

  return ApiResponse.success(res, { user }, 'Registered successfully', 201);
};

// Login
export const login = async (req, res) => {
  const tenantId = req.tenant._id;
  const { email, password } = req.body;

  const { user, token } = await authService.login(tenantId, email, password);

  res.cookie('token', token, {
    httpOnly: true,
    // secure: true, // Enable in production with HTTPS
    sameSite: 'strict',
  });

  return ApiResponse.success(res, { user }, 'Login successful', 200);
};

// Logout
export const logout = (req, res) => {
  res.clearCookie('token');
  return ApiResponse.success(res, null, 'Logged out successfully', 200);
};
