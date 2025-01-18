import { addDoc, collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

const App = () => {
  const [bookList, setBookList] = useState([]);
  const API_KEY = "AIzaSyDoRVJVMNAAm7PGetgwA2HPNdWwp2C0D88";
  const InsertBook = () => {
    addDoc(collection(db, "books"), {
      title: "タイトル",
      authors: [],
      imageLinks: "",
      description: "",
      impression: "",
      ISBM: {
        ISBM_10: "",
        ISBM_13: "",
      },
      pageCount: 0,
      categories: [],
      publisher: "",
      publishedDate: "",
      created: new Date(),
      updated: new Date(),
    });
  };

  const searchBook = async () => {
    const URL = `https://www.googleapis.com/books/v1/volumes?q=鬼滅&key=${API_KEY}`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const book = data.items[0];
        addDoc(collection(db, "books"), {
          title: book.volumeInfo.title || "",
          subTitle: book.volumeInfo.subTitle || "",
          authors: book.volumeInfo.authors || [],
          imageLinks: book.volumeInfo.imageLinks.thumbnail || "",
          description: book.volumeInfo.description || "",
          impression: "",
          ISBM: {
            ISBM_10: book.volumeInfo.industryIdentifiers["ISBN_10"] || "",
            ISBM_13: book.volumeInfo.industryIdentifiers["ISBN_13"] || "",
          },
          pageCount: book.volumeInfo.pageCount || 0,
          categories: book.volumeInfo.categories || [],
          publisher: book.volumeInfo.publisher || "",
          publishedDate: book.volumeInfo.publishedDate || "",
          created: new Date(),
          bookId: book.id || "",
          averageRating: book.volumeInfo.averageRating || 0,
          ratingsCount: book.volumeInfo.ratingsCount || 0,
          previewLink: book.volumeInfo.previewLink || "",
        });
      });
  };

  const getBooks = async () => {
    const querySnapShot = await getDocs(collection(db, "books"));
    setBookList(
      querySnapShot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }))
    );
  };

  return (
    <>
      <div>
        <button onClick={InsertBook}>本を追加</button>
        <button onClick={getBooks}>本を取得</button>
        <button onClick={searchBook}>本を検索</button>
      </div>
      <div>
        {bookList.map((book) => (
          <div key={book.id}>
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
