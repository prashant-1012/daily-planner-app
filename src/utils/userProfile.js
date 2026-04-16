const USER_PROFILE_KEY = 'userProfile';

export const getUserProfile = () => {
  try {
    const data = localStorage.getItem(USER_PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to parse user profile from localStorage:', error);
    return null;
  }
};

export const saveUserProfile = (profile) => {
  try {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    return true;
  } catch (error) {
    console.error('Failed to save user profile to localStorage:', error);
    return false;
  }
};
