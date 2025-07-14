import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextInput from "@/components/TextInput";
import ClientService from "@/services/ClientService";
import styles from "@/styles/SignUpPage.module.scss";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignInPage() {
    const t = useTranslations();
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [emailErr, setEmailErr] = useState<string>("");

    useEffect(() => {
        async function checkAuth() {
            const res = await ClientService.signInWithCookies();
            if(res && res.email) {
                router.push("/account");
            }
        }
        checkAuth();
    }, []);

    const [sent, setSent] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    async function tryRecover() {
        if(email == "") {
            setEmailErr(t("Please enter your email"));
            return;
        } else {setEmailErr("");}

        setLoading(true);

        const res = await ClientService.resetPassword(email);

        if(res) {
            setSent(true);
        }

        setLoading(false);
    }

    return(
        <>
        <Head>
            <title>Reset password - 495TRAFFIC</title>
            <meta name="description" content="Do Not Get Caught." />
            <meta property="og:title" content="Reset password - 495TRAFFIC" />
            <meta property="og:description" content="Do Not Get Caught." /> 
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" /> 
        </Head>
        <div className={styles.SignUp__root}>
            <div className={`${styles.frame} ${styles.signin_frame}`}>
                <div className={styles.wrapper}>
                    {!sent ? <>
                    <p className={styles.title}>
                        {t('Password reset')}
                    </p>
                    <p className={styles.subtitle}>{t('ENTER_EMAIL')}</p>
                    <TextInput
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        errorMsg={emailErr}
                        maxLength={63}
                    />
                    <Button
                        label={t("Recover")}
                        secondary
                        style={{width: '100%'}}
                        onClick={() => tryRecover()}
                        loading={loading}
                    />
                    </>: 
                    <p className={styles.title}>{t('RECOVER_SENT')}</p>}
                </div>
            </div>
        </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const locale = req.cookies.locale || 'ru';
    const messages = (await import(`./../../messages/${locale}.json`)).default;

    return {
        props: {
            messages,
            locale
        }
    };
};
