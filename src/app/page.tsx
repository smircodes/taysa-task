import Link from "next/link";
import style from "./homepage.module.scss";

const Home = () => {
  return (
    <div className={style.homePage}>
      <h1>Taysa</h1>
      <div className={style.btnGroup}>
        <Link href="/register">
          <button className={style.primaryBtn}>Sign Up</button>
        </Link>

        <Link href="/login">
          <button className={style.primaryBtn}>Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
