import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import BookShelf from "../components/BookShelf";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Nav from "../components/Nav.jsx";
import { auth } from "../firebase";

const App = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  // ログイン状態を確認
  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (!user) {
    navigate("/login"); // 未ログインの場合ログインページへリダイレクト
    return null;
  }

  return (
    <>
      <div className="body">
        <Header></Header>
        <Nav></Nav>
        <h1 id="welcomeText">ようこそ、{user.displayName}さん！</h1>
        {/* <BookMap seiti={[]}></BookMap> */}
        <BookShelf></BookShelf>
        <Footer></Footer>
      </div>
    </>
  );
};

export default App;
