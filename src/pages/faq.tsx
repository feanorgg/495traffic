import Head from "next/head";
import styles from "@/styles/FaqPage.module.scss";
import { useEffect, useState } from "react";
import ContentService from "@/services/ContentService";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import CookieService from "@/services/CookieService";

export default function FaqPage() {
    const t = useTranslations();

    const [contents, setContents] = useState<Array<{title: string, content: string}>>([]);

    useEffect(() => {
        fetchContents();
    }, []);

    async function fetchContents() {
        const locale = CookieService.getCookie('locale');
        const cg = await ContentService.getContentGroup(locale == 'ru' || locale == null ? "00000002" : "00000003");
        const _contents: Array<{title: string, content: string}> = [];
        for(const obj of cg.content_objects) {
            if(obj.type == 'text') {
                const title = obj.content.split('\n')[0];
                const content = obj.content.split('\n').slice(1).join('\n');
                _contents.push({
                    title: title,
                    content: content
                });
            }
        }
        setContents(_contents);
    }

    return(
        <>
        <Head>
            <title>FAQ - 495TRAFFIC</title>
            <meta name="description" content="Do Not Get Caught." />
            <meta property="og:title" content="FAQ - 495TRAFFIC" />
            <meta property="og:description" content="Do Not Get Caught." /> 
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" /> 
        </Head>
        <div className={styles.FAQ__root}>
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <p className={styles.bc}>{t('MAIN PAGE')}</p>
                    <img src="https://cdn2.495traffic.com/crumb.png" />
                    <p className={`${styles.bc} ${styles.current}`}>FAQ</p>
                </div>

                <h2>{t('FREQENTLY ASKED QUESTIONS')}</h2>

                {contents.map((item, index) => {
                    return(
                        <ContentItem
                            key={index}
                            title={item.title}
                            content={item.content}
                            index={index}
                        />
                    );
                })}
            </div>
        </div>
        </>
    );
}

function ContentItem({title, content, index}: {title: string, content: string, index: number}) {
    const [revealed, setRevealed] = useState<boolean>(index == 0);

    return(
        <div className={`${styles.content_c} ${revealed ? styles.revealed : ''}`}>
            <div className={styles.content_head} onClick={() => setRevealed(!revealed)}>
                <h5>{title}</h5>
                <img src="https://cdn2.495traffic.com/plus2.png" className={revealed ? styles.rotated : ''} />
            </div>
            {revealed &&
            <div className={styles.content_body}>
                <p className={styles.content}>
                    {content.split('\n').map((line, idx) => {
                        return(
                            <span key={idx}>
                                {line}
                                <br />
                            </span>
                        );
                    })}
                </p>
            </div>
            }
        </div>
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
