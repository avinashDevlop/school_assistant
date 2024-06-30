import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../../../api"

const BookDisplayPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get(
          "LibraryBooks.json"
        );
        if (response.data) {
          const fetchedBooks = Object.keys(response.data).map((key) => ({
            ...response.data[key],
            id: key,
          }));
          setBooks(fetchedBooks);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleDelete = async (id, imageUrl) => {
    try {
      // Delete the book record from the database
      await api.delete(
        `LibraryBooks/${id}.json`
      );

      // Delete the image from Firebase storage if it exists
      if (imageUrl) {
        const imageRef = imageUrl.split("/o/")[1].split("?alt=")[0]; // Extract the reference
        await axios.delete(
          `https://firebasestorage.googleapis.com/v0/b/studentassistant-18fdd.appspot.com/o/${imageRef}`
        );
      }

      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = (book) => setEditingBook(book);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `LibraryBooks/${editingBook.id}.json`,
        editingBook
      );
      setBooks(books.map((book) => (book.id === editingBook.id ? editingBook : book)));
      setEditingBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleModalClose = () => setEditingBook(null);

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.genre && book.genre.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const classOptions = [
    "General",
    "10th Class",
    "9th Class",
    "8th Class",
    "7th Class",
    "6th Class",
    "5th Class",
    "4th Class",
    "3rd Class",
    "2nd Class",
    "1st Class",
    "Kids",
  ];

  return (
    <>
      <h3>
        Library/<span>All Books</span>
      </h3>
      <div style={styles.bookDisplayContainer}>
        <h2 style={styles.header}>Library Books</h2>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={handleSearch}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.booksGrid}>
          {filteredBooks.map((book, index) => (
            <div style={styles.bookCard} key={index}>
              <img src={book.image} alt={book.title} style={styles.bookImage} />
              <div style={styles.bookDetails}>
                <h3>{book.title}</h3>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Publication Year:</strong> {book.publicationYear}
                </p>
                <p>
                  <strong>Class:</strong> {book.selectedClass}
                </p>
              </div>
              <div style={styles.actionButtons}>
                <button style={styles.deleteButton} onClick={() => handleDelete(book.id, book.image)}>
                  Delete
                </button>
                <button style={styles.editButton} onClick={() => handleEdit(book)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
        {editingBook && (
          <div style={{ ...styles.modal, display: "flex" }}>
            <div style={styles.modalContent}>
              <h2>Edit Book</h2>
              <form onSubmit={handleEditSubmit}>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={editingBook.title}
                  onChange={handleEditChange}
                  style={styles.inputField}
                />
                <label>Author:</label>
                <input
                  type="text"
                  name="author"
                  value={editingBook.author}
                  onChange={handleEditChange}
                  style={styles.inputField}
                />
                <label>Publication Year:</label>
                <input
                  type="text"
                  name="publicationYear"
                  value={editingBook.publicationYear}
                  onChange={handleEditChange}
                  style={styles.inputField}
                />
                <label>Class:</label>
                <select
                  name="selectedClass"
                  value={editingBook.selectedClass}
                  onChange={handleEditChange}
                  style={styles.inputField}
                >
                  <option value="">Select Class</option>
                  {classOptions.map((classOption) => (
                    <option key={classOption} value={classOption}>
                      {classOption}
                    </option>
                  ))}
                </select>
                <div style={styles.modalButtonsRow}>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    style={{ ...styles.modalButton, backgroundColor: "#dc3545" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ ...styles.modalButton, backgroundColor: "#28a745" }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  bookDisplayContainer: {
    margin: "0 auto",
    padding: "20px",
    maxWidth: "1200px",
  },
  header: {
    textAlign: "center",
    color: "#333",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
    borderBottom: "2px solid #007bff",
    paddingBottom: "10px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchInput: {
    width: "60%",
    padding: "12px",
    fontSize: "18px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    transition: "border-color 0.3s",
  },
  booksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  bookCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  bookImage: {
    width: "150px",
    height: "200px",
    objectFit: "cover",
    marginTop: "15px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "15px",
  },
  bookDetails: {
    flexGrow: 1,
    padding: "20px",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "10px",
    width: "100%",
  },
  editButton: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    backgroundColor: "#28a745",
    color: "white",
  },
  deleteButton: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    backgroundColor: "#dc3545",
    color: "white",
  },
 

 modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "500px",
    maxWidth: "90%",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
  },
  inputField: {
    padding: "10px",
    marginBottom: "20px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "39%",
    height:"40px"
  },
  modalButtonsRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px",
    width: "40%",
  },
  modalButton: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
    color: "white",
    width: "48%",
  },
};

export default BookDisplayPage;