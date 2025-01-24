import { getAuth } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "./BookDetail.css";
import BookMap from "./BookMap.jsx";

const BookHeader = () => {
  return (
    <>
      <div className="bookHeader">
        <h2>本の詳細</h2>
      </div>
    </>
  );
};

const BookDetailBody = (props) => {
  const book = props.book;

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

  const DeleteBook = async () => {
    const confirmed = window.confirm("本当に削除しますか？");
    if (!confirmed) return;

    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid; // 認証中のユーザーID
      await deleteDoc(doc(db, `users/${userId}/books`, book.id));
      alert("本を削除しました");
      navigate("/home");
    } catch (error) {
      console.error("本の削除に失敗しました: ", error);
      alert("本の削除中にエラーが発生しました");
    }
  };

  return (
    <div className="deleteButton">
      <button onClick={DeleteBook}>本棚から削除</button>
    </div>
  );
};

const BookDetail = () => {
  const location = useLocation();
  const book = location.state.book;
  console.log(book.seiti);

  return (
    <div className="container">
      <div className="BookDetail">
        <BookMap seiti={book.seiti}></BookMap>
        <BookHeader></BookHeader>
        <BookDetailBody book={book}></BookDetailBody>
        <DeleteButton></DeleteButton>
      </div>
    </div>
  );
};

export default BookDetail;
