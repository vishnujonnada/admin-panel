import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExamCalendar = () => {
  const [title, setTitle] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [examCalendars, setExamCalendars] = useState([]);
  const [editingId, setEditingId] = useState(null);  // Track the exam being edited
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch all exam calendar entries from the backend
  useEffect(() => {
    fetchExamCalendars();
  }, [API_URL]);

  const fetchExamCalendars = () => {
    axios.get(`${API_URL}/examcalender/all`)
      .then(response => setExamCalendars(response.data))
      .catch(error => console.error('Error fetching exam calendars:', error));
  };

  // Handle form submission to add or edit an exam calendar
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('pdf', pdfFile);

    if (editingId) {
      // Update existing exam calendar
      axios.put(`${API_URL}/examcalender/edit/${editingId}`, formData)
        .then(response => {
          alert('Exam calendar updated successfully!');
          fetchExamCalendars();  // Refresh the list after update
          setEditingId(null);    // Exit editing mode
          setTitle('');
          setPdfFile(null);
        })
        .catch(error => console.error('Error updating exam calendar:', error));
    } else {
      // Add new exam calendar
      axios.post(`${API_URL}/examcalender/add`, formData)
        .then(response => {
          alert('Exam calendar added successfully!');
          setExamCalendars([...examCalendars, response.data]);  // Update the list
        })
        .catch(error => console.error('Error uploading exam calendar:', error));
    }
  };

  // Handle edit action
  const handleEdit = (exam) => {
    setEditingId(exam._id);  // Set the exam ID for editing
    setTitle(exam.title);    // Pre-fill title for editing
  };

  // Handle delete action
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/examcalender/delete/${id}`)
      .then(() => {
        alert('Exam calendar deleted successfully!');
        setExamCalendars(examCalendars.filter(exam => exam._id !== id));  // Remove from list
      })
      .catch(error => console.error('Error deleting exam calendar:', error));
  };

  return (
    <div>
      <h2>{editingId ? 'Edit Exam Calendar' : 'Manage Exam Calendars'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>PDF File:</label>
          <input 
            type="file" 
            accept=".pdf" 
            onChange={e => setPdfFile(e.target.files[0])} 
            required={!editingId}  // PDF is only required when adding a new exam
          />
        </div>
        <button type="submit">{editingId ? 'Update' : 'Upload'}</button>
      </form>

      <h3>Existing Exam Calendars</h3>
      <ul>
        {examCalendars.map(exam => (
          <li key={exam._id}>
            <a href={exam.pdfLink} target="_blank" rel="noopener noreferrer">{exam.title}</a>
            <button onClick={() => handleEdit(exam)}>Edit</button>
            <button onClick={() => handleDelete(exam._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamCalendar;
