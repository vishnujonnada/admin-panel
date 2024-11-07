import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch contact form entries from the API on component mount
  useEffect(() => {
    axios.get(`${API_URL}/contact/get-entries`)
      .then((response) => {
        setEntries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching contact form entries:', error);
        setLoading(false);
      });
  }, []);

  // Function to handle downloading the Excel file
  const handleDownloadExcel = () => {
    axios({
      url: `${API_URL}/contact/download-excel`, // API route to download the Excel file
      method: 'GET',
      responseType: 'blob', // Important for file download
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'form_data.xlsx'); // File name for download
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading Excel file:', error);
      });
  };

  return (
    <div>
      <h2>Contact Entries</h2>
      {loading ? (
        <p>Loading entries...</p>
      ) : (
        <>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Email ID</th>
                <th>Interested Course</th>
                <th>City</th>
                <th>Message</th>
                <th>Submission Time</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.mobile}</td>
                  <td>{entry.email}</td>
                  <td>{entry.course}</td>
                  <td>{entry.city}</td>
                  <td>{entry.message}</td>
                  <td>{new Date(entry.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleDownloadExcel} style={{ marginTop: '20px' }}>
            Download as Excel
          </button>
        </>
      )}
    </div>
  );
};

export default Contact;
