import React, { useState, useEffect } from "react";
import "./LibraryBooksCSS.css"; // Import CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagramSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
 
const BookDisplayPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dummyBooks = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      publicationYear: 1925,
      image: "gatsby.jpg",
      selectedClass: "General",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      publicationYear: 1960,
      image: "mockingbird.jpg",
      selectedClass: "10th Class",
    },
    {
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      publicationYear: 1949,
      image: "1984.jpg",
      selectedClass: "Kids",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      publicationYear: 1813,
      image: "pride.jpg",
      selectedClass: "General",
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Classic",
      publicationYear: 1951,
      image: "catcher.jpg",
      selectedClass: "7th Class",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      publicationYear: 1937,
      image: "hobbit.jpg",
      selectedClass: "Kids",
    },
    {
      title: "The Hunger Games",
      author: "Suzanne Collins",
      genre: "Dystopian",
      publicationYear: 2008,
      image: "hunger.jpg",
      selectedClass: "8th Class",
    },
    {
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy",
      publicationYear: 1997,
      image: "harry.jpg",
      selectedClass: "Kids",
    },
    {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      publicationYear: 1954,
      image: "lotr.jpg",
      selectedClass: "10th Class",
    },
    {
      title: "The Chronicles of Narnia",
      author: "C.S. Lewis",
      genre: "Fantasy",
      publicationYear: 1950,
      image: "narnia.jpg",
      selectedClass: "6th Class",
    },
  ];

  useEffect(() => {
    setBooks(dummyBooks);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
      // Add more fields for search as needed
    );
  });

  return (
    <>
      <h3>
        Library/<span>All Books</span>
      </h3>
      <div className="book-display-container">
        <h2>Library Books</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="books-grid">
          {filteredBooks.map((book, index) => (
            <div className="book-card" key={index}>
              <img src={book.image} alt={book.title} />
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p>
                  <strong>Publication Year:</strong> {book.publicationYear}
                </p>
                <p>
                  <strong>Class:</strong> {book.selectedClass}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* social media */}
        <div className="container_Bottom_data">
          <div className="Lastcard">
            <div className="facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </div>
            <div className="details">Visit</div>
          </div>
          <div className="Lastcard">
            <div className="instragram">
              <FontAwesomeIcon icon={faInstagramSquare} />
            </div>
            <div className="details">Visit</div>
          </div>
          <div className="Lastcard">
            <div className="WhatsApp">
              <FontAwesomeIcon icon={faWhatsapp} />
            </div>
            <div className="details">Chart</div>
          </div>
          <div className="Lastcard">
            <div className="Website">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <div className="details">Visit</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDisplayPage;
