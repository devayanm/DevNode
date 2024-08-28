import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const login = async (credentials) => {
    try {
        const response = await api.post('/api/auth/login', credentials);
        localStorage.setItem('token', response.data.token);
        return response;
    } catch (error) {
        throw error;
    }
};

export const signup = async (userData) => {
    try {
        const response = await api.post('/api/auth/signup', userData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await api.get('/api/users/profile');
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (profileData) => {
    try {
        const response = await api.put('/api/users/profile', profileData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/api/auth/forgotpassword', { email });
        return response;
    } catch (error) {
        throw error;
    }
}

export const createBlogPost = async (blogData) => {
    try {
        const response = await api.post('/api/posts', blogData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllBlogPosts = async () => {
    try {
        const response = await api.get('/api/posts');
        return response;
    } catch (error) {
        throw error;
    }
};

export const getBlogPostById = async (blogId) => {
    try {
        const response = await api.get(`/api/posts/${blogId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBlogPost = async (blogId, blogData) => {
    try {
        const response = await api.put(`/api/posts/${blogId}`, blogData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteBlogPost = async (blogId) => {
    try {
        const response = await api.delete(`/api/posts/${blogId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const addComment = async (blogId, commentData) => {
    try {
        const response = await api.post(`/api/posts/${blogId}/comments`, commentData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteComment = async (blogId, commentId) => {
    try {
        const response = await api.delete(`/api/posts/${blogId}/comments/${commentId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/api/cloud/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token'); 
};

export default api;
