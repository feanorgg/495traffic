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
                <img src="/dngc.png" alt="do_not_get_caught" className={styles.dngc} />
                <div className={styles.socials}>
                    <Link className={styles.social} href="/">
                        <img src="/tg.png" alt="tg" />
                    </Link>
                    <Link className={styles.social} href="/">
                        <img src="/is.png" alt="insta" />
                    </Link>
                    <Link className={styles.social} href="/">
                        <img src="/vk.png" alt="vk" />
                    </Link>
                </div>
            </div>
        </div>
    );
}