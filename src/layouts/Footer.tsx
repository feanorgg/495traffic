import styles from "@/layouts/Footer.module.scss";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
    const t = useTranslations();

    return(
        <div className={styles.Footer__root}>
            <div className={styles.wrapper}>
                <div className={styles.links}>
                    {/*<Link className={`${styles.link} ${styles.left}`} href="/about">
                        About
                    </Link>*/}
                    <Link className={`${styles.link} ${styles.left}`} href="/faq">
                        Faq
                    </Link>
                    <Link className={styles.link} href="/contacts">
                        {t('Contacts')}
                    </Link>
                    <Link className={styles.link} href="/privacy">
                        {t('Privacy')}
                    </Link>
                    <Link className={styles.link} href="/offer">
                        {t('Offer')}
                    </Link>
                </div>
                <img src="/dngc.png" alt="do_not_get_caught" className={styles.dngc} />
                <div className={styles.socials}>
                    <Link className={styles.social} href="https://t.me/donotgetcaught" target="_blank">
                        <img src="/tg.png" alt="tg" />
                    </Link>
                    <Link className={styles.social} href="https://instagram.com/495traffic" target="_blank">
                        <img src="/is.png" alt="insta" />
                    </Link>
                    <Link className={styles.social} href="https://vk.com/traffic495" target="_blank">
                        <img src="/vk.png" alt="vk" />
                    </Link>
                </div>
            </div>
        </div>
    );
}