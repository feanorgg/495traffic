import styles from "@/layouts/Footer.module.scss";
import Link from "next/link";

export default function Footer() {
    return(
        <div className={styles.Footer__root}>
            <div className={styles.wrapper}>
                <div className={styles.links}>
                    <Link className={`${styles.link} ${styles.left}`} href="/about">
                        About
                    </Link>
                    <Link className={styles.link} href="/faq">
                        Faq
                    </Link>
                    <Link className={styles.link} href="/contacts">
                        Contacts
                    </Link>
                    <Link className={styles.link} href="/privacy-policy">
                        Privacy Policy
                    </Link>
                </div>
                <img src="/dngc.png" className={styles.dngc} />
                <div className={styles.socials}>
                    <Link className={styles.social} href="/">
                        <img src="/tg.png" />
                    </Link>
                    <Link className={styles.social} href="/">
                        <img src="/is.png" />
                    </Link>
                    <Link className={styles.social} href="/">
                        <img src="/vk.png" />
                    </Link>
                </div>
            </div>
        </div>
    );
}