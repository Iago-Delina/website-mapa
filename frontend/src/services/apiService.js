import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const getAuthHeader = () => {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getMaps = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.tags && filters.tags.length > 0) {
      params.append('tags', filters.tags.join(','));
    }
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
    return [];
  }
};

export const login = async (credentials) => {
  const response = await axios.post(`${API}/auth/login`, credentials);
  return response.data;
};

export const getCurrentAdmin = async () => {
  const response = await axios.get(`${API}/auth/me`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const createMap = async (mapData) => {
  const response = await axios.post(`${API}/admin/maps`, mapData, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const updateMap = async (id, mapData) => {
  const response = await axios.put(`${API}/admin/maps/${id}`, mapData, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const deleteMap = async (id) => {
  const response = await axios.delete(`${API}/admin/maps/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API}/admin/upload`, formData, {
    headers: {
      ...getAuthHeader(),
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const getAdminMaps = async () => {
  const response = await axios.get(`${API}/admin/maps`, {
    headers: getAuthHeader()
  });
  return response.data;
};
