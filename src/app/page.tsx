import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Taysa</h1>
      <div className={styles.buttonGroup}>
        <Link href="/register">
          <button className={styles.actionButton}>Sign Up</button>
        </Link>

        <Link href="/login">
          <button className={styles.actionButton}>Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
