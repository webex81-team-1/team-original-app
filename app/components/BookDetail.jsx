import { deleteDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "./BookDetail.css";

const BookHeader = () => {
  return (
    <>
      <div className="bookHeader">
        <h2>本の詳細</h2>
      </div>
    </>
  );
};

const BookDetailBody = () => {
  const location = useLocation();
  const book = location.state.book;

  return (
    <div className="BookDetailBody">
      <div className="BookDetailTop">
        <div className="BookDetailImg">
          <img src={book.imageLinks} alt={book.title} />
        </div>
        <div className="BookDetailInfo">
          <h3>{book.title}</h3>
          <p>{book.subTitle}</p>
          <p>{book.author}</p>
          <p>{book.publisher}</p>
          <p>{book.publishedDate}</p>
          <p>{book.pageCount}</p>
        </div>
      </div>
      <div className="BookDetailBottom">
        <div className="BookDetailBottomDescription">
          <h3>概要</h3>
          <p>{book.description}</p>
        </div>
        {/* <div className="BookDetailBottomImpression">
          <h3>感想</h3>
          <p>{book.impression}</p>
        </div> */}
      </div>
    </div>
  );
};

const DeleteButton = () => {
  const location = useLocation();
  const book = location.state.book;
  const navigate = useNavigate();

  const DeleteBook = () => {
    const confirmed = window.confirm("本当に削除しますか？");
    if (!confirmed) return;
    console.log(book);

    deleteDoc(doc(db, "books", book.id));
    navigate("/home");
  };

  return (
    <div className="deleteButton">
      <button onClick={DeleteBook}>本棚から削除</button>
    </div>
  );
};

const BookDetail = () => {
  return (
    <div className="container">
      <div className="BookDetail">
        <BookHeader></BookHeader>
        <BookDetailBody></BookDetailBody>
        <DeleteButton></DeleteButton>
      </div>
    </div>
  );
};

export default BookDetail;
