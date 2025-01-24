import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";

const SignInButton = () => {
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

  return <button onClick={signInWithGoogle}>Googleでログイン</button>;
};

// const SignOutButton = () => {
//   const handleSignOut = async () => {
//     try {
//       await auth.signOut();
//     } catch (error) {
//       console.error("サインアウトエラー:", error);
//       alert("サインアウトに失敗しました。");
//     }
//   };

//   return <button onClick={handleSignOut}>サインアウト</button>;
// };

// const UserInfo = ({ user }) => {
//   return (
//     <div>
//       <p>ログイン中: {user.displayName}</p>
//       <img src={user.photoURL} alt="User Profile" />
//     </div>
//   );
// };

const Login = () => {
  return (
    <div className="container">
      <h1>ログイン</h1>
      <SignInButton />
    </div>
  );
};

export default Login;
