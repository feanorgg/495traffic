import styles from "@/layouts/NavBar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Footer from "./Footer";

export default function NavBar({ children }: { children: React.ReactElement }) {
    const router = useRouter();

    return(
        <>
        <div className={styles.NavBar__root}>
            <div className={styles.black_line}>
                <Link href="/"><img src="/logo.png" /></Link>
            </div>
            <div className={styles.main_line}>
                <div className={styles.wrapper}>
                    <div className={styles.mobile_menu_button}>
                        <img src="/mobile-menu.png" />
                    </div>
                    <div className={styles.categories}>
                        <Link className={`${styles.link} ${styles.all} ${router.pathname == '/' ? styles.active : ''}`} href="/">
                            All
                        </Link>
                        <Link className={`${styles.link} ${router.pathname == '/pants' ? styles.active : ''}`} href="/pants">
                            Pants
                        </Link>
                        <Link className={`${styles.link} ${router.pathname == '/t-shirts' ? styles.active : ''}`} href="/t-shirts">
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
                            <img src="/profile.png" className={`${styles.profile_img} ${router.pathname.includes('/profile') ? styles.active : ''}`} />
                        </Link>
                        <Link className={styles.icon_c} href="/cart">
                            <img src="/bag.png" className={`${styles.bag_img} ${router.pathname.includes('/cart') ? styles.active : ''}`} />
                            <div id="cart" className={styles.cart_counter_container}>
                                <p id="cart-cnt">1</p>
                            </div>
                        </Link>
                        <div className={styles.lang_c}>
                            <p>EN</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {children}
        <Footer/>
        </>
    );
}