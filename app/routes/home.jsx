import BookShelf from "../components/BookShelf";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header";
import Nav from "../components/Nav";

const App = () => {
  return (
    <>
      <div className="body">
        <Header></Header>
        <Nav></Nav>
        <BookShelf></BookShelf>
        <Footer></Footer>
      </div>
    </>
  );
};

export default App;
