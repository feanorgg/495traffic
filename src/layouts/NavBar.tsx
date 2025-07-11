'use client';
import styles from "@/layouts/NavBar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import CookieService from "@/services/CookieService";
import { useTranslations } from "next-intl";

export default function NavBar({ children }: { children: React.ReactElement }) {
    const t = useTranslations();

    const router = useRouter();
    const [menuState, setMenuState] = useState<boolean>(false);
    const [locale, setLocale] = useState<string>('ru');

    useEffect(() => {
        setMenuState(false);
    }, [router.pathname]);

    useEffect(() => {
        const cl: string | null = CookieService.getCookie('cart');
        const el = document.getElementById('cart-cnt');
        const elC = document.getElementById('cart');

        if(cl != null) {
            const cList: Array<{id: string, size: string, amount: number}> = JSON.parse(cl);
            
            let cnt = 0;
            for(const item of cList) {
                cnt += item.amount;
            }
            if(cnt > 0) {
                if(el) {
                    el.innerHTML = String(cnt);
                }
                if(elC) {
                    elC.style.display = 'flex';
                }
            } else {
                if(el) {
                    el.innerHTML = '0';
                }
                if(elC) {
                    elC.style.display = 'none';
                }
            }
        } else {
            if(el) {
                el.innerHTML = '0';
            }
            if(elC) {
                elC.style.display = 'none';
            }
        }
    }, [router.pathname]);

    useEffect(() => {
        const locale = CookieService.getCookie('locale');
        if(locale == null) {
            CookieService.setCookie('locale', 'ru', 365);
            router.reload();
        } else {
            setLocale(locale);
        }
    }, []);

    async function switchLocale() {
        const currentLocale = CookieService.getCookie('locale');
        const newLocale = currentLocale === 'ru' ? 'en' : 'ru';
        CookieService.setCookie('locale', newLocale, 365);
        setLocale(newLocale);
        router.reload();
    }

    return(
        <>
        <div className={`${styles.MobileMenu__container} ${menuState ? styles.visible : ''}`}>
            <div className={styles.wrapper}>
                <Link className={`${styles.menu_link} ${router.pathname == '/' ? styles.active : ''}`} href="/">
                    {t('All')}
                </Link>
                <Link className={`${styles.menu_link} ${router.pathname == '/pants' ? styles.active : ''}`} href="/pants">
                    Pants
                </Link>
                <Link className={`${styles.menu_link} ${router.pathname == '/t-shirts' ? styles.active : ''}`} href="/t-shirts">
                    T-shirts
                </Link>
                <Link className={`${styles.menu_link} ${router.pathname == '/hoodie' ? styles.active : ''}`} href="/hoodie">
                    Hoodie
                </Link>
                <Link className={`${styles.menu_link} ${router.pathname == '/accessories' ? styles.active : ''}`} href="/accessories">
                    Accessories
                </Link>
            </div>
        </div>
        <div className={styles.NavBar__root}>
            <div className={styles.black_line}>
                <Link href="/"><img src="/logo.png" alt="logo" /></Link>
            </div>
            <div className={`${styles.main_line} ${menuState ? styles.hide_border : ''}`}>
                <div className={styles.wrapper}>
                    <div className={styles.mobile_menu_button} onPointerDown={() => setMenuState(!menuState)}>
                        {menuState ? <img src="/mobile-close.png" alt="close_menu" /> : <img src="/mobile-menu.png" alt="open_menu" />}
                    </div>
                    <div className={styles.categories}>
                        <Link className={`${styles.link} ${styles.all} ${router.pathname == '/' ? styles.active : ''}`} href="/">
                            {t('All')}
                        </Link>
                        <Link className={`${styles.link} ${router.pathname == '/pants' ? styles.active : ''}`} href="/pants">
                            {t('Pants')}
                        </Link>
                        <Link className={`${styles.link} ${router.pathname == '/t-shirts' ? styles.active : ''}`} href="/t-shirts">
                            {t('T-shirts')}
                        </Link>
                        <Link className={`${styles.link} ${router.pathname == '/hoodie' ? styles.active : ''}`} href="/hoodie">
                            {t('Hoodie')}
                        </Link>
                        <Link className={`${styles.link} ${router.pathname == '/accessories' ? styles.active : ''}`} href="/accessories">
                            {t('Accessories')}
                        </Link>
                    </div>
                    <div className={styles.controls}>
                        <Link className={styles.icon_c} href="/account">
                            <img src="/profile.png" alt="profile" className={`${styles.profile_img} ${router.pathname.includes('/account') ? styles.active : ''}`} />
                        </Link>
                        <Link className={styles.icon_c} href="/cart">
                            <img src="/bag.png" alt="bag" className={`${styles.bag_img} ${router.pathname.includes('/cart') ? styles.active : ''}`} />
                            <div id="cart" className={styles.cart_counter_container}>
                                <p id="cart-cnt">0</p>
                            </div>
                        </Link>
                        <div className={styles.lang_c} onClick={() => switchLocale()}>
                            <p>{locale}</p>
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