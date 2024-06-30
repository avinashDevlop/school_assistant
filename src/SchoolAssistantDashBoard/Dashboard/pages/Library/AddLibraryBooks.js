import React, { useState } from "react";
import { storage } from "../../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import api from '../../../../api'
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
    "Kids",
  ];

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [image, setImage] = useState(null);
  const [selectedClass, setSelectedClass] = useState("General");
  const [loading, setLoading] = useState(false);

  const sanitizeFileName = (fileName) => {
    return fileName.replace(/[^a-zA-Z0-9-_]/g, "_");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim white spaces from input fields
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    const trimmedPublicationYear = publicationYear.trim();

    if (!image) {
      console.error("No image selected");
      return;
    }

    setLoading(true);
    const sanitizedImageName = sanitizeFileName(image.name);
    const imageRef = ref(storage, `libraryBooks/${sanitizedImageName}`);

    try {
      // Check if the book already exists in the database based on the image name
      const response = await api.get(
        `LibraryBooks/${sanitizedImageName}.json`
      );

      if (response.data) {
        alert("Book image name is already exists in the database, please change the file name");
        setLoading(false);
        return;
      }

      // Upload image to Firebase Storage
      await uploadBytes(imageRef, image);

      // Retrieve download URL after successful upload
      const imageUrl = await getDownloadURL(imageRef);

      // Log data before sending
      console.log("Data being sent to Firebase:", {
        title: trimmedTitle,
        author: trimmedAuthor,
        publicationYear: trimmedPublicationYear,
        image: imageUrl,
        selectedClass,
      });

      // Store book details in Firebase Realtime Database
      await api.put(
        `LibraryBooks/${sanitizedImageName}.json`,
        {
          title: trimmedTitle,
          author: trimmedAuthor,
          publicationYear: trimmedPublicationYear,
          image: imageUrl,
          selectedClass,
        }
      );

      // Show success message
      alert("Book submitted successfully");

      // Clear the form fields
      setTitle("");
      setAuthor("");
      setPublicationYear("");
      setImage(null);
      setSelectedClass("General");

      // Reset the file input
      document.getElementById("image").value = null;
    } catch (error) {
      // Log the error details
      console.error("Error adding book:", error.response ? error.response.data : error.message);
      alert("Error adding book: " + JSON.stringify(error.response ? error.response.data : error.message));
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      overflow: "hidden",
    },
    formContainer: {
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      width: "100%",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      width: "47%",
      height: "40px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
    },
    fileInput: {
      padding: "3px",
    },
    buttonRight: {
      textAlign: "left",
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    heading: {
      color: "#3884ff",
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "27px",
    },
  };

  return (
    <>
      <h3>
        Library/<span>Add Book</span>
      </h3>
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Add New Book</h2>
          <form onSubmit={handleSubmit} className="add-book-form" encType="multipart/form-data">
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="school-class">
                Class:
              </label>
              <select
                id="school-class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={styles.input}
                required
              >
                {classOptions.map((className, index) => (
                  <option key={index} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="title">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="author">
                Author:
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="publication-year">
                Publication Year:
              </label>
              <input
                type="number"
                id="publication-year"
                value={publicationYear}
                onChange={(e) => setPublicationYear(e.target.value)}
                placeholder="Enter publication year"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="image">
                Book Image:
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                style={{ ...styles.input, ...styles.fileInput }}
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <div style={{ ...styles.formGroup, ...styles.buttonRight }}>
              <button
                type="submit"
                style={styles.button}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    styles.buttonHover.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = styles.button.backgroundColor)
                }
                disabled={loading}
              >
                {loading ? "Submitting..." : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddLibraryBooks;