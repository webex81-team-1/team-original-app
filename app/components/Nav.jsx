import { useNavigate } from "@remix-run/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CiLogout } from "react-icons/ci";
import { auth } from "../firebase";
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth); // ローディング状態も取得

  const handleTopClick = () => {
    navigate("/home");
  };

  const handleMapClick = () => {
    window.scrollTo(0, 0);
  };

  const handleBooksClick = () => {
    navigate("/books");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login"); // ログアウト後にログイン画面に移動
    } catch (error) {
      console.error("サインアウトエラー:", error);
      alert("サインアウトに失敗しました。");
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <button onClick={handleTopClick}>Top</button>
          </li>
          <li className="nav-item">
            <button onClick={handleMapClick}>Map</button>
          </li>
          <li className="nav-item">
            <button onClick={handleBooksClick}>Books</button>
          </li>
        </ul>
        <div className="userBar">
          {loading ? ( // ローディング中の表示
            <p>読み込み中...</p>
          ) : user ? ( // ユーザーが存在する場合
            <>
              <p>ログイン中: {user.displayName}</p>
              <img
                src={user.photoURL || "https://placehold.jp/50x50.png"}
                alt="User Profile"
                className="userProfileImage"
              />
              <button onClick={handleLogout}>
                <CiLogout className="logoutButton" />
                Logout
              </button>
            </>
          ) : (
            // ユーザーが未ログインの場合
            <p>ログインしていません</p>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
