
import React from "react";
import "../styles/Books.css";

function BookGrid({ icon, title, author, description }) {
    return (
        <article className="books-card" role="listitem" aria-label={title}>
      <img
        className="book-cover"
        src={icon}
        alt={`${title} cover`}
        loading="lazy"
        decoding="async"
      />

      <div className="book-info">
        <h2 className="book-title">{title}</h2>
        <h3 className="book-author">by {author}</h3>
        <p className="book-desc">{description}</p>


      </div>
    </article>

    );
}
export default BookGrid