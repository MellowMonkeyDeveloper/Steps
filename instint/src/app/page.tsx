import Image from "next/image";
<<<<<<< HEAD
import Main from "@/page_components/Main/Main";
import styles from "../../styles/main.module.scss";
export default function Home() {
  return <Main />;
=======
import styles from "./page.module.css";
import Main from "./pagecomponents/Main";
export default function Home() {
  return (
    <main className={styles.main}>
      <Main />
    </main>
  );
>>>>>>> 9712cd39c29c53c7d80407f522345524b1d6031b
}
