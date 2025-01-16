import "./BookShelf.css";

const BookShelfHeader = () => {
  return (
    <div className="bookShelfHeader">
      <h2>本棚</h2>
    </div>
  );
};

const BookShelfBody = () => {
  return (
    <>
      <div className="bookShelfBody">
        <div className="book">
          <img src="https://placehold.jp/150x200.png" alt="本の表紙" />
          <h3>本のタイトル</h3>
          <p>著者名</p>
        </div>
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
