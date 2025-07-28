import { BookWithReviews } from "./model";

/**
 * Parses passed books and reviews arrays to create an array of BookWithReviews object. Each row from books input array
 * should have a corresponding row in resulting array. For example, for following input data:
 *    books = [ { "id" : 101, "title" : "Some book title" } ]
 *    reviews = [ { "bookId" : 101, "author" : "John", "content" : "Great book!" } ];
 * It should return following result:
 *    result = [ { id: 101, title: "Some book title", reviews : [ { author: "John", content: "Great book!" }] } ];
 *
 * @param books - an array of input books, see 'src/app/dataset/books.json' for sample data.
 * @param reviews - an array of input reviews, see 'src/app/dataset/reviews.json' for sample data.
 * @returns {Array} - an array of BookWithReviews objects
 */
export function parseBooksData(books, reviews) {
  // Transform raw book data into BookWithReviews objects
  const booksWithReviews = books.map(book => new BookWithReviews(book.id, book.title));

  // Associate reviews with their corresponding books by matching bookId
  reviews.forEach(review => {
    const book = booksWithReviews.find(b => b.id === review.bookId);
    if (book) { // Only add review if matching book exists (handles invalid bookIds)
      book.addReview(review.author, review.content);
    }
  });

  return booksWithReviews;
}

/**
 * Displays data from passed `books` array. For example, if books argument would have following value:
 *    books = [ { id: 101, title: "Some book title", reviews : [ { author: "John", content: "Great book!" }] } ];
 * then, following structure should be created under the parentNode:
 * <ol>
 *    <li>
 *      <span>Some book title</span>
 *      <ul>
 *        <li>Great book! by John</li>
 *      </ul>
 *    </li>
 * </ol>
 * @param parentNode - parent node for all books
 * @param booksWithReviews - an array of BookWithReviews objects.
 */
export function displayBooksWithReviews(parentNode, booksWithReviews) {
  // Guard clause: avoid creating empty DOM structure
  if (booksWithReviews.length === 0) {
    return;
  }

  // Create main container for all books
  const ol = document.createElement('ol');

  // Build DOM structure for each book
  booksWithReviews.forEach(book => {
    const li = document.createElement('li');

    // Book title wrapped in span element
    const span = document.createElement('span');
    span.textContent = book.title;
    li.appendChild(span);

    // Only create review list if book has reviews
    if (book.reviews.length > 0) {
      const ul = document.createElement('ul');

      // Create list item for each review with formatted text
      book.reviews.forEach(review => {
        const reviewLi = document.createElement('li');
        reviewLi.textContent = `${review.content} by ${review.author}`;
        ul.appendChild(reviewLi);
      });

      li.appendChild(ul);
    }

    ol.appendChild(li);
  });

  // Attach completed structure to parent
  parentNode.appendChild(ol);
}
