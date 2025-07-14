import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextInput from "@/components/TextInput";
import ClientService from "@/services/ClientService";
import styles from "@/styles/SignUpPage.module.scss";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignInPage() {
    const t = useTranslations();
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [emailErr, setEmailErr] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");

    useEffect(() => {
        async function checkAuth() {
            const res = await ClientService.signInWithCookies();
            if(res && res.email) {
                router.push("/account");
            }
        }
        checkAuth();
    }, []);

    async function trySignIn() {
        if(email == "") {
            setEmailErr(t("Please enter your email"));
            return;
        } else {setEmailErr("");}
        if(password == "") {
            setPasswordErr(t("Please enter your password"));
            return;
        } else {setPasswordErr("");}
        if(password.length < 8) {
            setPasswordErr(t("PWD_8_CHAR"));
            return;
        } else {setPasswordErr("");}

        const res = await ClientService.signInWithEmailAndPassword({
            email: email,
            password: password
        });

        if(res && res.email) {
            router.push("/account");
        } else {
            setPasswordErr(t("Invalid email or password"));
        }
    }

    return(
        <div className={styles.SignUp__root}>
            <div className={`${styles.frame} ${styles.signin_frame}`}>
                <div className={styles.wrapper}>
                    <p className={styles.title}>
                        {t('To continue, log in to your profile')}
                    </p>
                    <TextInput
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        errorMsg={emailErr}
                        maxLength={63}
                    />
                    <TextInput
                        placeholder={t("Password")}
                        secure
                        value={password}
                        onChangeText={setPassword}
                        errorMsg={passwordErr}
                        maxLength={20}
                    />
                    <Button
                        label={t("Log In")}
                        secondary
                        style={{width: '100%'}}
                        onClick={() => trySignIn()}
                    />
                    <div className={styles.hor}>
                        <p className={styles.txt}>
                            <Link href="/account/sign-up">{t('Sign Up')}</Link>
                        </p>
                        <p className={styles.txt}>
                            <Link href="/account/password-reset">{t('Forgot password?')}</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
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
