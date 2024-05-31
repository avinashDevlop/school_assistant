import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscRefresh } from "react-icons/vsc";
import './Notice.css';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNotice, setNewNotice] = useState({ type: '', title: '', content: '' });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    axios.get('https://studentassistant-18fdd-default-rtdb.firebaseio.com/Notices.json')
      .then(response => {
        const fetchedNotices = [];
        for (let key in response.data) {
          fetchedNotices.push({
            ...response.data[key],
            id: key
          });
        }
        setNotices(fetchedNotices.reverse()); // Reverse the order here
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
      });
  };

  const handleAddNotice = () => {
    const now = new Date();
    const currentDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')},${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const notice = { ...newNotice, date: now.toLocaleString() };

    axios.put(`https://studentassistant-18fdd-default-rtdb.firebaseio.com/Notices/${currentDateTime}.json`, notice)
      .then(response => {
        console.log('Notice added:', response.data);
        setNotices([notice, ...notices]); // Prepend the new notice
        setNewNotice({ type: '', title: '', content: '' });
        setModalVisible(false);
      })
      .catch(error => {
        console.error('Error adding notice:', error);
      });
  };

  const handleDeleteNotice = (id, event) => {
    event.preventDefault();

    axios.delete(`https://studentassistant-18fdd-default-rtdb.firebaseio.com/Notices/${id}.json`)
      .then(response => {
        console.log('Notice deleted:', response.data);
        setNotices(notices.filter(notice => notice.id !== id));
      })
      .catch(error => {
        console.error('Error deleting notice:', error);
      });
  };

  const renderNoticeItem = (notice) => (
    <div key={notice.id} className="notice-card">
      <p className="notice-date">Date: {notice.date}</p>
      <p className={`notice-type ${notice.type ? `notice-type-${notice.type.toLowerCase()}` : ''}`}>{notice.type}</p>
      <h3 className="notice-title">{notice.title}</h3>
      <p className="notice-content">{notice.content}</p>
      <button className="btn-delete" onClick={(event) => handleDeleteNotice(notice.id, event)}>Delete</button>
    </div>
  );

  const handleRefresh = () => {
    fetchNotices();
  };

  return (
    <div className="notice-container">
      <div className="notice-header">
        <button className="btn-add" onClick={() => setModalVisible(true)}>Add Notice</button>
        <button className="refresh-btn" onClick={handleRefresh}>
          <VscRefresh />
        </button>
      </div>
      <div className="notice-list">
        {notices.map(renderNoticeItem)}
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <button className="btn-close" onClick={() => setModalVisible(false)}>X</button>
            <h2 className="modal-title">Add New Notice</h2>
            <select
              className="input-field"
              value={newNotice.type}
              onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })}
            >
              <option value="">Select Type</option>
              <option value="Announcement">Announcement</option>
              <option value="Assignment">Assignment</option>
              <option value="Feedback">Feedback</option>
              <option value="Emergency">Emergency</option>
            </select>
            <input
              className="input-field"
              type="text"
              placeholder="Title"
              value={newNotice.title}
              onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
            />
            <textarea
              className="input-field"
              placeholder="Description"
              value={newNotice.content}
              onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
            />
            <div className="modal-footer">
              <button className="btn-submit" onClick={handleAddNotice}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notice;
