import styles from "@/layouts/NavBar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function NavBar({ children }: { children: React.ReactElement }) {
    const router = useRouter();

    return(
        <>
        <div className={styles.NavBar__root}>
            <div className={styles.black_line}>
                <img src="/logo.png" />
            </div>
            <div className={styles.main_line}>
                <div className={styles.wrapper}>
                    <div className={styles.categories}>
                        <Link className={`${styles.link} ${styles.all} ${router.pathname == '/' ? styles.active : ''}`} href="/">
                            All
                        </Link>
                        <Link className={`${styles.link} ${router.pathname == '/pants' ? styles.active : ''}`} href="/pants">
                            Pants
                        </Link>
                        <Link className={`${styles.link} ${router.pathname == '/tshirts' ? styles.active : ''}`} href="/tshirts">
                            T-shirts
                        </Link>
                        <Link className={`${styles.link} ${router.pathname == '/hoodie' ? styles.active : ''}`} href="/hoodie">
                            Hoodie
                        </Link>
                        <Link className={`${styles.link} ${router.pathname == '/accessories' ? styles.active : ''}`} href="/accessories">
                            Accessories
                        </Link>
                    </div>
                    <div className={styles.controls}>
                        <Link className={styles.icon_c} href="/profile">
                            <img src="/profile.png" className={styles.profile_img} />
                        </Link>
                        <Link className={styles.icon_c} href="/cart">
                            <img src="/bag.png" className={styles.bag_img} />
                        </Link>
                        <div className={styles.lang_c}>
                            <p>EN</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {children}
        </>
    );
}