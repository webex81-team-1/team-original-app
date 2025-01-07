import { addDoc, collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

const App = () => {
  const [bookList, setBookList] = useState([]);
  const InsertBook = () => {
    addDoc(collection(db, "books"), {
      title: "タイトル",
    });
  };

  const searchBook = async () => {
    const API_KEY = "AIzaSyDoRVJVMNAAm7PGetgwA2HPNdWwp2C0D88";
    const URL = `https://www.googleapis.com/books/v1/volumes?q=Harry+Potter&key=${API_KEY}`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
