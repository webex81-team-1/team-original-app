import { signInWithPopup } from "firebase/auth";
import { FaBookOpen, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import "./LoginComponent.css";

const LoginComponent = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      console.error("ログインエラー:", error);
      alert("ログインに失敗しました。もう一度お試しください。");
    }
  };

  return (
    <div className="loginComponent">
      <h1>
        <FaBookOpen className="BookIcon" />
        作品と現実を繋げる
      </h1>
      <button onClick={signInWithGoogle}>
        <FaGoogle className="loginComponent-icon" />
        Googleでログイン
      </button>
    </div>
  );
};

export default LoginComponent;
