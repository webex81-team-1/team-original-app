import "./BookShelf.css";

const BookShelfHeader = () => {
  return (
    <div className="bookShelfHeader">
      <h2>本棚</h2>
    </div>
  );
};

const BookShelfItem = (props) => {
  return (
    <>
      <div className="BookShelfItem">
        <div className="BookShelfItemBook">
          <img src={props.image} alt="本の表紙" />
          <h3>{props.title}</h3>
          <p>{props.author}</p>
        </div>
        <button>追加</button>
      </div>
    </>
  );
};

const BookShelfBody = () => {
  return (
    <>
      <div className="BookShelfBody">
        <BookShelfItem
          image="https://placehold.jp/150x200.png"
          title="本のタイトル"
          author="著者名"
        ></BookShelfItem>
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
