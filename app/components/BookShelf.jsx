import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "./BookShelf.css";

const BookShelfHeader = () => {
  return (
    <div className="BookShelfHeader">
      <h2>本棚</h2>
    </div>
  );
};

const BookShelfItem = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="BookShelfItem">
        <div className="BookShelfItemBook">
          <button
            className="BookShelfItemButton"
            onClick={() =>
              navigate(`/detail?query=${encodeURIComponent(props.id)}`, {
                state: { book: props.book, seiti: props.seiti },
              })
            }
          >
            <img src={props.image} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.author}</p>
          </button>
        </div>
      </div>
    </>
  );
};

const BookShelfBody = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBooks = async () => {
    try {
      const querySnapShot = await getDocs(collection(db, "books"));
      const booksData = querySnapShot.docs.map((book) => ({
        title: book.data().title,
        subTitle: book.data().subTitle,
        author: book.data().authors?.join(", ") || "不明な著者",
        imageLinks:
          book.data().imageLinks || "https://placehold.jp/150x200.png",
        description: book.data().description,
        impression: book.data().impression,
        ISBN: {
          ISBN_10: book.data().ISBN_10,
          ISBN_13: book.data().ISBN_13,
        },
        pageCount: book.data().pageCount,
        categories: book.data().categories,
        publisher: book.data().publisher,
        publishedDate: book.data().publishedDate,
        created: book.data().created,
        bookId: book.data().bookId,
        id: book.data().id,
        averageRating: book.data().averageRating,
        ratingsCount: book.data().ratingsCount,
        previewLink: book.data().previewLink,
        seiti: book.data().seiti,
      }));
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false); // 成功・失敗に関係なく loading を false に設定
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  if (loading) {
    return <div className="Loading">Loading...</div>;
  }

  return (
    <>
      <div className="BookShelfBody">
        {books.length > 0 ? (
          books.map((book) => (
            <BookShelfItem
              key={book.id}
              title={book.title}
              author={book.author}
              image={book.imageLinks}
              book={book}
            />
          ))
        ) : (
          <div>本が見つかりませんでした。</div>
        )}
      </div>
    </>
  );
};

const bookList = () => {
  return (
    <div className="container">
      <div className="BookShelf">
        <BookShelfHeader></BookShelfHeader>
        <BookShelfBody></BookShelfBody>
      </div>
    </div>
  );
};

export default bookList;
