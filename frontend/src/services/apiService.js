import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ==================== PUBLIC APIs ====================

export const getMaps = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.tags && filters.tags.length > 0) {
      params.append('tags', filters.tags.join(','));
    }
    if (filters.status) params.append('status', filters.status);

    const response = await axios.get(`${API}/maps?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching maps:', error);
    throw error;
  }
};

export const getMapBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API}/maps/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching map:', error);
    throw error;
  }
};

export const getTags = async () => {
  try {
    const response = await axios.get(`${API}/tags`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
};

// ==================== AUTH APIs ====================

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API}/auth/logout`, {}, {
      headers: getAuthHeader()
    });
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export const getCurrentAdmin = async () => {
  try {
    const response = await axios.get(`${API}/auth/me`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error getting current admin:', error);
    throw error;
  }
};

// ==================== ADMIN APIs ====================

export const createMap = async (mapData) => {
  try {
    const response = await axios.post(`${API}/admin/maps`, mapData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error creating map:', error);
    throw error;
  }
};

export const updateMap = async (id, mapData) => {
  try {
    const response = await axios.put(`${API}/admin/maps/${id}`, mapData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error updating map:', error);
    throw error;
  }
};

export const deleteMap = async (id) => {
  try {
    const response = await axios.delete(`${API}/admin/maps/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting map:', error);
    throw error;
  }
};

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API}/admin/upload`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getAdminMaps = async () => {
  try {
    const response = await axios.get(`${API}/admin/maps`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin maps:', error);
    throw error;
  }
};
