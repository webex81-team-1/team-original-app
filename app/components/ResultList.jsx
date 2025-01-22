import { useLocation } from "@remix-run/react";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "./ResultList.css";

const ResultListHeader = () => {
  return (
    <>
      <div className="ResultListHeader">
        <h2>検索結果</h2>
      </div>
    </>
  );
};

const fetchBooks = async (query) => {
  const API_KEY = "AIzaSyDoRVJVMNAAm7PGetgwA2HPNdWwp2C0D88";
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}key=${API_KEY}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return []; // エラー時は空の配列を返却
  }
};

const ResultListBody = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  const addBook = async (book) => {
    const booksRef = collection(db, "books");
    const existingBookQuery = query(booksRef, where("bookId", "==", book.id));
    const existingBooks = await getDocs(existingBookQuery);

    if (!existingBooks.empty) {
      console.log("この本は既に登録されています。");
      return;
    }

    const docCorrection = doc(collection(db, "books"));
    await setDoc(docCorrection, {
      id: docCorrection.id, // ドキュメントIDを含める
      title: book.volumeInfo.title || "",
      subTitle: book.volumeInfo.subTitle || "",
      authors: book.volumeInfo.authors || [],
      imageLinks: book.volumeInfo.imageLinks?.thumbnail || "",
      description: book.volumeInfo.description || "",
      impression: "",
      ISBN: {
        ISBN_10:
          book.volumeInfo.industryIdentifiers?.find(
            (id) => id.type === "ISBN_10"
          )?.identifier || "",
        ISBN_13:
          book.volumeInfo.industryIdentifiers?.find(
            (id) => id.type === "ISBN_13"
          )?.identifier || "",
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

    goHome();
  };

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchBooks(query).then((data) => {
        setBooks(data);
        setLoading(false);
      });
    }
  }, [searchQuery]);

  if (loading) {
    return <div className="Loading">Loading...</div>;
  }

  return (
    <div className="ResultListBody">
      {books.length > 0 ? (
        books.map((book) => (
          <ResultListItem
            key={book.id}
            image={
              book.volumeInfo.imageLinks?.thumbnail ||
              "https://placehold.jp/150x200.png"
            }
            title={book.volumeInfo.title || "No title available"}
            author={book.volumeInfo.authors?.join(", ") || "Unknown author"}
            description={
              book.volumeInfo.description || "No description available"
            }
            onSave={() => addBook(book)}
          />
        ))
      ) : (
        <div className="Loading">No results found.</div>
      )}
    </div>
  );
};

const ResultListItem = (props) => {
  return (
    <>
      <div className="ResultListItem">
        <div className="ResultListItemImage">
          <img src={props.image} alt="本の表紙" />
        </div>
        <div className="ResultListItemRight">
          <div className="ResultListItemText">
            <h3>{props.title}</h3>
            <p>{props.author}</p>
            <p>{props.description}</p>
          </div>
          <button onClick={props.onSave}>登録</button>
        </div>
      </div>
    </>
  );
};

const ResultList = () => {
  return (
    <>
      <div className="Result">
        <div className="container">
          <div className="ResultList">
            <ResultListHeader></ResultListHeader>
            <ResultListBody></ResultListBody>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultList;
