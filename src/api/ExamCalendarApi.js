import axios from 'axios';

// Base URL for API (adjust if necessary)
const API_URL = 'https://backends-amber.vercel.app';

// Get all exam calendars
export const getAllExamCalendars = () => axios.get(`${API_URL}/all`);

// Add a new exam calendar with a PDF upload
export const addExamCalendar = (formData) =>
  axios.post(`${API_URL}/examcalender/add`, formData);

// Update an existing exam calendar
export const updateExamCalendar = (id, formData) =>
  axios.put(`${API_URL}/examcalender/edit/${id}`, formData);

// Delete an exam calendar
export const deleteExamCalendar = (id) =>
  axios.delete(`${API_URL}/examcalender/delete/${id}`);
