import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
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
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}`;

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
  const query = queryParams.get("query");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchBooks(query).then((data) => {
        setBooks(data);
        setLoading(false);
      });
    }
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
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
          />
        ))
      ) : (
        <div>No results found.</div>
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
          <button>登録</button>
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
