const endpoints = {
  auth: {
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    me: "/auth/me",
    changePassword: "/auth/change-password",
    forgotPassword: "/auth/forgot-password",

    completePasswordReset: "/auth/reset-password/complete",
  },

  users: {
    list: "/users",
    details: (id) => `/users/${id}`,
    role: (id) => `/users/${id}/role`,
    status: (id) => `/users/${id}/status`,
<<<<<<< HEAD
  },

  students: {
    root: "/students",
=======
>>>>>>> e39f402 ([FR-02] User management page with API integration)
  },
};

export default Object.freeze(endpoints);