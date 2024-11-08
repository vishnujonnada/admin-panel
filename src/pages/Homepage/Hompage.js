import React, { useState } from 'react';
import axios from 'axios';

function HomepageManagement() {
  const [bannerImages, setBannerImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [scrollingText, setScrollingText] = useState('');
  const [upcomingExams, setUpcomingExams] = useState([{ examName: '', examDate: '', examLink: '' }]);
  const [notifications, setNotifications] = useState([{ notificationName: '', notificationDate: '', notificationLink: '' }]);
  const [classes, setClasses] = useState([{ classTitle: '', classLink: '', classPhoto: '' }]);
  const [feedbacks, setFeedbacks] = useState([{ studentName: '', feedbackText: '', feedbackDate: '', studentPhoto: '' }]);
  const API_URL = process.env.REACT_APP_API_URL;

  // Handle file selection for banner images and class/student photos
  const handleFileChange = (e, section, index) => {
    const file = e.target.files[0];
    if (section === 'class' && index !== undefined) {
      const updatedClasses = [...classes];
      updatedClasses[index].classPhoto = file;
      setClasses(updatedClasses);
    } else if (section === 'feedback' && index !== undefined) {
      const updatedFeedbacks = [...feedbacks];
      updatedFeedbacks[index].studentPhoto = file;
      setFeedbacks(updatedFeedbacks);
    } else {
      setFiles(e.target.files);
    }
  };

  // Handle scrolling text change
  const handleScrollingTextChange = (e) => {
    setScrollingText(e.target.value);
  };

  // Handle upcoming exams input change
  const handleExamChange = (index, e) => {
    const updatedExams = [...upcomingExams];
    updatedExams[index][e.target.name] = e.target.value;
    setUpcomingExams(updatedExams);
  };

  // Handle notifications input change
  const handleNotificationChange = (index, e) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index][e.target.name] = e.target.value;
    setNotifications(updatedNotifications);
  };

  // Handle classes input change
  const handleClassChange = (index, e) => {
    const updatedClasses = [...classes];
    updatedClasses[index][e.target.name] = e.target.value;
    setClasses(updatedClasses);
  };

  // Handle feedback input change
  const handleFeedbackChange = (index, e) => {
    const updatedFeedbacks = [...feedbacks];
    updatedFeedbacks[index][e.target.name] = e.target.value;
    setFeedbacks(updatedFeedbacks);
  };

  // Add new exam
  const handleAddExam = () => {
    setUpcomingExams([...upcomingExams, { examName: '', examDate: '', examLink: '' }]);
  };

  // Add new notification
  const handleAddNotification = () => {
    setNotifications([...notifications, { notificationName: '', notificationDate: '', notificationLink: '' }]);
  };

  // Add new class
  const handleAddClass = () => {
    setClasses([...classes, { classTitle: '', classLink: '', classPhoto: '' }]);
  };

  // Add new feedback
  const handleAddFeedback = () => {
    setFeedbacks([...feedbacks, { studentName: '', feedbackText: '', feedbackDate: '', studentPhoto: '' }]);
  };

  // Submit banner images
  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let file of files) {
      formData.append('bannerImages', file);
    }

    try {
      const response = await axios.post(`${API_URL}/homepage/add-banner-images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBannerImages(response.data.bannerImages); // Update state with returned URLs
      alert('Banner images uploaded successfully');
    } catch (error) {
      console.error('Error uploading banner images:', error);
    }
  };

  // Submit scrolling text
  const handleScrollingTextSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/homepage/add-scrolling-text`, { ScrollingText: scrollingText });
      alert('Scrolling text updated successfully');
    } catch (error) {
      console.error('Error updating scrolling text:', error);
    }
  };

  // Submit upcoming exams
  const handleUpcomingExamsSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/homepage/add-upcoming-exams`, { UpcomingExams: upcomingExams });
      alert('Upcoming exams added successfully');
    } catch (error) {
      console.error('Error adding upcoming exams:', error);
    }
  };

  // Submit notifications
  const handleNotificationsSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/homepage/add-notifications`, { Notifications: notifications });
      alert('Notifications added successfully');
    } catch (error) {
      console.error('Error adding notifications:', error);
    }
  };

  const handleClassesSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // Ensure classes is wrapped inside an array
    const classDetailsArray = classes.map((classItem) => ({
      title: classItem.classTitle,
      videolink: classItem.classLink,
      bannerphoto: classItem.classPhoto, // Add file as bannerphoto
    }));
  
    // Append the array as 'Classes' to FormData
    formData.append('Classes', JSON.stringify(classDetailsArray)); 
  
    // Append the file (classPhoto) for each class
    classes.forEach((classItem, index) => {
      if (classItem.classPhoto) {
        formData.append(`classPhoto[${index}]`, classItem.classPhoto); // Here we append using the array notation
      }
    });
  
    try {
      const response = await axios.post(`${API_URL}/homepage/add-classes`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Classes added successfully');
    } catch (error) {
      console.error('Error adding classes:', error);
    }
  };
  
  // Submit feedbacks
  const handleFeedbacksSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    feedbacks.forEach((feedback) => {
      if (feedback.studentPhoto) {
        formData.append('studentPhoto', feedback.studentPhoto);
      }
      formData.append('feedbackDetails', JSON.stringify(feedback));
    });

    try {
      await axios.post(`${API_URL}/homepage/add-students-feedback`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Feedbacks added successfully');
    } catch (error) {
      console.error('Error adding feedbacks:', error);
    }
  };

  return (
    <div>
      <h1>Homepage Management</h1>

      {/* Banner Images Section */}
      <div>
        <h2>Upload Banner Images</h2>
        <form onSubmit={handleBannerSubmit}>
          <input type="file" multiple onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {bannerImages.length > 0 && (
          <div>
            <h3>Uploaded Banner Images:</h3>
            {bannerImages.map((url, index) => (
              <img key={index} src={url} alt={`Banner ${index}`} width="200" />
            ))}
          </div>
        )}
      </div>

      {/* Scrolling Text Section */}
      <div>
        <h2>Update Scrolling Text</h2>
        <textarea
          value={scrollingText}
          onChange={handleScrollingTextChange}
          rows="4"
          cols="50"
          placeholder="Enter scrolling text..."
        />
        <button onClick={handleScrollingTextSubmit}>Submit</button>
      </div>

      {/* Upcoming Exams Section */}
      <div>
        <h2>Add Upcoming Exams</h2>
        <form onSubmit={handleUpcomingExamsSubmit}>
          {upcomingExams.map((exam, index) => (
            <div key={index}>
              <input
                type="text"
                name="examName"
                value={exam.examName}
                onChange={(e) => handleExamChange(index, e)}
                placeholder="Exam Name"
              />
              <input
                type="date"
                name="examDate"
                value={exam.examDate}
                onChange={(e) => handleExamChange(index, e)}
              />
              <input
                type="url"
                name="examLink"
                value={exam.examLink}
                onChange={(e) => handleExamChange(index, e)}
                placeholder="Exam Link"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddExam}>Add Another Exam</button>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Notifications Section */}
      <div>
        <h2>Add Notifications</h2>
        <form onSubmit={handleNotificationsSubmit}>
          {notifications.map((notification, index) => (
            <div key={index}>
              <input
                type="text"
                name="notificationName"
                value={notification.notificationName}
                onChange={(e) => handleNotificationChange(index, e)}
                placeholder="Notification Name"
              />
              <input
                type="date"
                name="notificationDate"
                value={notification.notificationDate}
                onChange={(e) => handleNotificationChange(index, e)}
              />
              <input
                type="url"
                name="notificationLink"
                value={notification.notificationLink}
                onChange={(e) => handleNotificationChange(index, e)}
                placeholder="Notification Link"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddNotification}>Add Another Notification</button>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Classes Section */}
      <div>
        <h2>Add Classes</h2>
        <form onSubmit={handleClassesSubmit}>
          {classes.map((classItem, index) => (
            <div key={index}>
              <input
                type="text"
                name="classTitle"
                value={classItem.classTitle}
                onChange={(e) => handleClassChange(index, e)}
                placeholder="Class Title"
              />
              <input
                type="url"
                name="classLink"
                value={classItem.classLink}
                onChange={(e) => handleClassChange(index, e)}
                placeholder="Class Link"
              />
              <input
                type="file"
                name="classPhoto"
                onChange={(e) => handleFileChange(e, 'class', index)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddClass}>Add Another Class</button>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Feedback Section */}
      <div>
        <h2>Collect Student Feedback</h2>
        <form onSubmit={handleFeedbacksSubmit}>
          {feedbacks.map((feedback, index) => (
            <div key={index}>
              <input
                type="text"
                name="studentName"
                value={feedback.studentName}
                onChange={(e) => handleFeedbackChange(index, e)}
                placeholder="Student Name"
              />
              <textarea
                name="feedbackText"
                value={feedback.feedbackText}
                onChange={(e) => handleFeedbackChange(index, e)}
                placeholder="Feedback"
              />
              <input
                type="date"
                name="feedbackDate"
                value={feedback.feedbackDate}
                onChange={(e) => handleFeedbackChange(index, e)}
              />
              <input
                type="file"
                name="studentPhoto"
                onChange={(e) => handleFileChange(e, 'feedback', index)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddFeedback}>Add Another Feedback</button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default HomepageManagement;
