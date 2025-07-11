import OrderService from "@/services/OrderService";
import { Order } from "@/types/Order";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import styles from "@/styles/OrderSucessPage.module.scss";
import Button from "@/components/Button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function OrderSuccessPage({order}: {order: Order}) {
    const t = useTranslations();

    return(
        <>
        <Head>
            <title>495TRAFFIC - Successful order</title>
        </Head>
        <div className={styles.OrderSuccess__root}>
            <img className={styles.mark} src="/mark.png" alt="mark" />
            <div className={styles.content}>
                <h5>{t("Order number")}: №{order._id}</h5>
                <h2>{t("THANK YOU FOR ORDER")}!</h2>
                <p className={styles.text}>
                    {t("PROC_1")}<br/>
                    {t("PROC_2")}
                </p>
                <p className={styles.text_mob}>
                    {t("PROC_1")} {t("PROC_2")}
                </p>
            </div>
            <Link href="/" style={{textDecoration: 'none'}} className={styles.link}>
                <Button
                    label={t("NEW PURCHASES")}
                    secondary
                />
            </Link>
        </div>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.query;
    const locale = context.req.cookies.locale || 'ru';
    const messages = (await import(`./../../messages/${locale}.json`)).default;

    if(id == undefined || typeof(id) == 'object') {
        return {
            props: {
                order: null
            }
        }
    }
    
    const order: Order = await OrderService.getOrder(id);

    return {
        props: {
            order: order,
            messages,
            locale
        }
    }
}
