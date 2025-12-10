import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here in the future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

// ============ Website Data APIs ============

// Site Settings
export const getSiteSettings = () => api.get('/website/settings');

// Home Page Data (combined endpoint for better performance)
export const getHomePageData = () => api.get('/website/home');

// Sliders
export const getSliders = () => api.get('/website/sliders');

// Home Popup
export const getHomePopup = () => api.get('/website/popup');

// About
export const getAboutData = () => api.get('/website/about');

// Services
export const getServices = () => api.get('/website/services');
export const getServiceById = (id) => api.get(`/website/services/${id}`);

// Team
export const getTeamMembers = () => api.get('/website/team');

// Testimonials
export const getTestimonials = () => api.get('/website/testimonials');

// Gallery
export const getGalleryImages = () => api.get('/website/gallery');
export const getGalleryByCategory = (category) => api.get(`/website/gallery/${category}`);

// Blog
export const getBlogPosts = () => api.get('/website/blogs');
export const getBlogBySlug = (slug) => api.get(`/website/blogs/${slug}`);

// Events
export const getEvents = () => api.get('/website/events');
export const getEventById = (id) => api.get(`/website/events/${id}`);

// Statistics
export const getStatistics = () => api.get('/website/statistics');

// FAQ
export const getFaqs = (category = '') => api.get(`/website/faqs${category ? `?category=${category}` : ''}`);

// Living Options
export const getLivingOptions = () => api.get('/website/living-options');

// ============ Lead/Inquiry APIs ============

// Submit General Inquiry
export const submitInquiry = (data) => api.post('/leads/inquiry', data);

// Submit Appointment Request
export const submitAppointment = (data) => api.post('/leads/appointment', data);

// Submit Contact Form
export const submitContactForm = (data) => api.post('/leads/contact', data);

// Submit Visit Request
export const submitVisitRequest = (data) => api.post('/leads/visit-request', data);

// ============ Admission Form APIs ============

// Submit Admission Step
export const submitAdmissionStep = (data) => api.post('/leads/admission/step', data);

// Complete Admission Form
export const completeAdmission = (data) => api.post('/leads/admission/complete', data);

// Get Admission Application by ID
export const getAdmissionApplication = (applicationId) => api.get(`/leads/admission/${applicationId}`);

export default api;

