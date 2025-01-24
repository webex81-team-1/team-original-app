import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
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
  );
};

const BookShelfBody = () => {
  const [user] = useAuthState(auth); // ログイン中のユーザー情報を取得
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getBooks = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const userBooksRef = collection(db, `users/${user.uid}/books`); // ユーザー固有の本のコレクション
      const querySnapshot = await getDocs(userBooksRef);

      const booksData = querySnapshot.docs.map((book) => ({
        title: book.data().title,
        subTitle: book.data().subTitle,
        author: book.data().authors?.join(", ") || "不明な著者",
        imageLinks:
          book.data().imageLinks || "https://placehold.jp/150x200.png",
        description: book.data().description,
        impression: book.data().impression,
        ISBN: {
          ISBN_10: book.data().ISBN.ISBN_10,
          ISBN_13: book.data().ISBN.ISBN_13,
        },
        pageCount: book.data().pageCount,
        categories: book.data().categories,
        publisher: book.data().publisher,
        publishedDate: book.data().publishedDate,
        created: book.data().created,
        bookId: book.data().bookId,
        id: book.id,
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
  }, [user]);

  if (!user) {
    return <div>ログインしてください。</div>;
  }

  if (loading) {
    return <div className="Loading">Loading...</div>;
  }

  return (
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
  );
};

const BookList = () => {
  return (
    <div className="container">
      <div className="BookShelf">
        <BookShelfHeader />
        <BookShelfBody />
      </div>
    </div>
  );
};

export default BookList;
