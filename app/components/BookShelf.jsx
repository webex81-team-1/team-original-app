import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
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
  return (
    <>
      <div className="BookShelfItem">
        <div className="BookShelfItemBook">
          <img
            src={props.image || "https://placehold.jp/150x200.png"}
            alt={props.title}
          />
          <h3>{props.title}</h3>
          <p>{props.author || "不明な著者"}</p>
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
        author: book.data().authors?.join(", ") || "不明な著者",
        image: book.data().imageLinks || "https://placehold.jp/150x200.png",
        bookId: book.id, // Firebase ドキュメントの ID
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="BookShelfBody">
        {books.length > 0 ? (
          books.map((book) => (
            <BookShelfItem
              key={book.bookId}
              title={book.title}
              author={book.author}
              image={book.image}
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
      <div className="bookShelf">
        <BookShelfHeader></BookShelfHeader>
        <BookShelfBody></BookShelfBody>
      </div>
    </div>
  );
};

export default bookList;
