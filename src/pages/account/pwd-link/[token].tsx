import ClientService from "@/services/ClientService";
import { GetServerSidePropsContext } from "next";
import styles from "@/styles/SignUpPage.module.scss";
import { useTranslations } from "next-intl";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import Button from "@/components/Button";

export default function PasswordResetPage({token}: {token: string}) {
    const t = useTranslations();

    const [password, setPassword] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [changed, setChanged] = useState<boolean>(false);

    async function tryChangePassword() {
        if(loading) {return;}
        if(password == "") {
            setPasswordErr(t("Please enter your new password"));
            return;
        } else {setPasswordErr("");}
        if(password.length < 8) {
            setPasswordErr(t("PWD_8_CHAR"));
            return;
        } else {setPasswordErr("");}
        setLoading(true);

        const res = await ClientService.changePassword({password: password, token: token});

        if(res) {
            setChanged(true);
        } else {
            setPasswordErr(t("Failed to change password"));
        }
        setLoading(false);
    }

    return(
        <div className={styles.SignUp__root}>
            <div className={`${styles.frame} ${styles.signin_frame}`}>
                <div className={styles.wrapper}>
                    {changed ? 
                    <p className={styles.title}>{t('PWD_CHANGED')}</p> 
                    : <>
                    <p className={styles.title}>{t('Enter new password')}</p>

                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder={t("New password")}
                        errorMsg={passwordErr}
                        secure
                        maxLength={20}
                    />

                    <Button
                        label={t('Save')}
                        secondary
                        loading={loading}
                        onClick={() => tryChangePassword()}
                    />
                    </>}
                </div>
            </div>
        </div>
    );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { token } = context.query;
    const locale = context.req.cookies.locale || 'ru';
    const messages = (await import(`./../../../messages/${locale}.json`)).default;

    // verify token 
    if (!token) {
        return {
            notFound: true,
        };
    }

    const res = await ClientService.verifyToken(token as string);
    if (!res.success) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            messages,
            locale,
            token: token as string
        }
    }
}
