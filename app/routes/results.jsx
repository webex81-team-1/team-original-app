import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import ResultList from "../components/ResultList";

const results = () => {
  return (
    <div className="body">
      <Header></Header>
      <Nav></Nav>
      <ResultList></ResultList>
      <Footer></Footer>
    </div>
  );
};

export default results;
