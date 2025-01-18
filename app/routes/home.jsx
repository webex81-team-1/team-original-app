import BookShelf from "../components/BookShelf";
import Header from "../components/Header";
import Nav from "../components/Nav";

const App = () => {
  return (
    <>
      <div className="body">
        <Header></Header>
        <Nav></Nav>
        <BookShelf></BookShelf>
      </div>
    </>
  );
};

export default App;
