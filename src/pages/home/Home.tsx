// import styles from "./Home.module.less";
import { Link } from "react-router-dom";
export function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <Link to="/counter">Counter Page</Link>
    </div>
  );
}
