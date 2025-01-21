import BookDetail from "../components/BookDetail";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";

const detail = () => {
  return (
    <>
      <div className="body">
        <Header></Header>
        <Nav></Nav>
        <BookDetail></BookDetail>
        <Footer></Footer>
      </div>
    </>
  );
};

export default detail;
