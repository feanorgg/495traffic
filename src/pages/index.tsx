import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Checkbox from "@/components/Checkbox";
import DropdownPicker from "@/components/DropdownPicker";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import CatalogService from "@/services/CatalogService";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { useTranslations } from 'next-intl';
import { GetServerSideProps } from "next";
import RunningLine from "@/components/RunningLine";
// import { getRequestLocale } from 'next-intl/server';

export default function Home() {
    const t = useTranslations();

    const [products, setProducts] = useState<Array<Product>>([]);
    const [page, setPage] = useState<number>(1);
    const [pagesCount, setPagesCount] = useState<number>(0);
    const [sorting, setSorting] = useState<"new"|"popular"|"price_asc"|"price_desc">("new");

    useEffect(() => {
        setPage(1);
        fetchProducts();
    }, [sorting]);

    async function fetchProducts() {
        const catalogResponse = await CatalogService.getProducts({
            page: 1,
            sorting: sorting == "popular" ? "new" : sorting
        });
        setProducts(catalogResponse.data);
        setPagesCount(catalogResponse.numpages);
    }

    async function loadMoreProducts() {
        const catalogResponse = await CatalogService.getProducts({
            page: page + 1,
            sorting: sorting == "popular" ? "new" : sorting
        });
        setPage(page + 1);
        setProducts([...products, ...catalogResponse.data]);
    }

    return (
        <>
        <Head>
            <title>495TRAFFIC</title>
            <meta name="description" content="Do Not Get Caught." />
            <meta property="og:title" content="495TRAFFIC" />
            <meta property="og:description" content="Do Not Get Caught." /> 
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" /> 
        </Head>
        <div className={styles.Marquee__wrapper}>
            <div className={styles.marquee}>
                <div className={styles.track}>
                    <RunningLine/>
                    <RunningLine/>
                    <RunningLine/>
                </div>
            </div>
        </div>
        <div className={styles.Home__root}>
            <div className={styles.header}>
                <img 
                    src="/main-banner.webp"
                    alt="main_banner"
                />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <h1>{t("ALL PRODUCTS")}</h1>
                    <DropdownPicker
                        placeholder={t("Sort by")}
                        items={[
                            t("Popularity"),
                            t("Novelty"),
                            t("In ascending order of price"),
                            t("In descending order of price")
                        ]}
                        value={{
                            "new": t("Novelty"),
                            "popular": t("Popularity"),
                            "price_asc": t("In ascending order of price"),
                            "price_desc": t("In descending order of price")
                        }[sorting]}
                        onChange={v => {
                            switch(v) {
                                case t("Novelty"):
                                    setSorting("new");
                                    break;
                                case t("Popularity"):
                                    setSorting("popular");
                                    break;
                                case t("In ascending order of price"):
                                    setSorting("price_asc");
                                    break;
                                case t("In descending order of price"):
                                    setSorting("price_desc");
                                    break;
                                default:
                                    setSorting("new");
                                    break;
                            }
                        }}
                    />
                </div>

                <div className={styles.products_grid}>
                    {products.map((product, index) => {
                        return(
                            <ProductCard
                                product={product}
                                key={index}
                                t={t}
                            />
                        );
                    })}
                </div>

                <div className={styles.load_more}>
                    <Button
                        label={t("load more")}
                        tertiary
                        onClick={() => loadMoreProducts()}
                        disabled={page == pagesCount}
                    />
                </div>
            </div>

            <div className={styles.archive_banner_container}>
                <img 
                    src="/archive-banner.webp"
                    alt="archive_banner"
                />
                <div className={styles.fade} />
                <div className={styles.wrapper}>
                    <p className={styles.title}>ARCHIVE</p>
                    <Link href="/archive" style={{textDecoration: 'none'}}>
                    <Button
                        label={t("SEE MORE")}
                        tertiary
                    /></Link>
                </div>
            </div>
        </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const locale = req.cookies.locale || 'ru';
    const messages = (await import(`../messages/${locale}.json`)).default;

    return {
        props: {
            messages,
            locale
        }
    };
};
