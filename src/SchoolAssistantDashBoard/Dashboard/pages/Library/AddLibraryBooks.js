import React, { useState } from "react";
import "./AddLibraryBooksCSS.css"; // Import CSS file for styling

const AddLibraryBooks = () => {
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
    "kids",
  ];

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [image, setImage] = useState(null);
  const [selectedClass, setSelectedClass] = useState("General"); // Default value set to 'General'

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book added:", {
      title,
      author,
      genre,
      publicationYear,
      image,
      selectedClass,
    });
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublicationYear("");
    setImage(null);
    setSelectedClass("");
  };

  return (
    <>
    <h3>
        Library/<span>Add Book</span>
      </h3>
    <div className="add-book-form-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="publication-year">Publication Year:</label>
          <input
            type="number"
            id="publication-year"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Book Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="school-class">Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="form-control"
          >
            {classOptions.map((className, index) => (
              <option key={index} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group button-right">
          <button type="submit">Add Book</button>
        </div>
      </form>
    </div></>
  );
};

export default AddLibraryBooks;
