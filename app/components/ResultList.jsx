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

const ResultListBody = () => {
  return (
    <>
      <div className="ResultListBody">
        <ResultListItem
          image="https://placehold.jp/150x200.png"
          title="本のタイトル"
          author="著者名"
        ></ResultListItem>
        <ResultListItem
          image="https://placehold.jp/150x200.png"
          title="本のタイトル"
          author="著者名"
        ></ResultListItem>
        <ResultListItem
          image="https://placehold.jp/150x200.png"
          title="本のタイトル"
          author="著者名"
        ></ResultListItem>
      </div>
    </>
  );
};

const ResultListItem = (props) => {
  return (
    <>
      <div className="ResultListItem">
        <div className="ResultListItemBook">
          <img src={props.image} alt="本の表紙" />
          <h3>{props.title}</h3>
          <p>{props.author}</p>
        </div>
        <button>追加</button>
      </div>
    </>
  );
};

const ResultList = () => {
  return (
    <>
      <div className="container">
        <div className="ResultList">
          <ResultListHeader></ResultListHeader>
          <ResultListBody></ResultListBody>
        </div>
      </div>
    </>
  );
};

export default ResultList;
