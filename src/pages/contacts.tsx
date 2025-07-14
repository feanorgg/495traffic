import Head from "next/head";
import styles from "@/styles/ContactsPage.module.scss";
import TextInput from "@/components/TextInput";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import axios from "axios";

export default function ContactsPage() {
    const t = useTranslations();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [dataAgreement, setDataAgreement] = useState<boolean>(false);

    const [nameErr, setNameErr] = useState<string>("");
    const [emailErr, setEmailErr] = useState<string>("");
    const [messageErr, setMessageErr] = useState<string>("");
    const [dataAgreementErr, setDataAgreementErr] = useState<boolean>(false);

    const [formLoading, setFormLoading] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);

    async function trySendForm() {
        if(formLoading) {return;}

        if(name == "") {
            setNameErr(t("Please enter your name"));
            return;
        } else {setNameErr("");}
        if(email == "") {
            setEmailErr(t("Please enter your email"));
            return;
        } else {setEmailErr("");}
        if(!String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            setEmailErr(t("Incorrect email, please try again"));
            return;
        } else {setEmailErr("");}
        if(message == "") {
            setMessageErr(t("Please enter your message"));
            return;
        } else {setMessageErr("");}
        if(!dataAgreement) {
            setDataAgreementErr(true);
            return;
        } else {setDataAgreementErr(false);}

        setFormLoading(true);

        // send 
        try {
            const res = await axios.post(`https://495traffic.com/api/send-form`, {
                name: name,
                email: email,
                message: message
            });
            setFormLoading(false);
            setSent(true);
        } catch {
            setFormLoading(false);
            setMessageErr('Произошла ошибка при отправке формы.');
        }
    }

    return(
        <>
        <Head>
            <title>Contacts - 495TRAFFIC</title>
            <meta name="description" content="Do Not Get Caught." />
            <meta property="og:title" content="Contacts - 495TRAFFIC" />
            <meta property="og:description" content="Do Not Get Caught." /> 
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" /> 
        </Head>
        <div className={styles.Contacts__root}>
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <p className={styles.bc}>{t('MAIN PAGE')}</p>
                    <img src="/crumb.png" />
                    <p className={`${styles.bc} ${styles.current}`}>{t('CONTACTS')}</p>
                </div>
                <div className={styles.grid}>
                    <div className={styles.left}>
                        <h2>{t('CONTACTS')}</h2>
                        <a href="mailto:495traffic@gmail.com" className={styles.email}>
                            <img src="/email.png" />
                            <p>495TRAFFIC@GMAIL.COM</p>
                        </a>
                        <a href="https://t.me/supplier495" className={styles.phone}>
                            <img src="/tg.png" />
                            <p>@supplier495</p>
                        </a>
                        {/*<p className={styles.address}>{t('ADDR')}</p>*/}
                        <p className={styles.timetable}>{t('Media')}</p>
                        <div className={styles.socials}>
                            <a href="https://t.me/donotgetcaught" target="_blank">
                                <img src="/tg-grey.png" />
                            </a>
                            <a href="https://instagram.com/495traffic" target="_blank">
                                <img src="/is-grey.png" />
                            </a>
                            <a href="https://vk.com/traffic495" target="_blank">
                                <img src="/vk-grey.png" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.frame}>
                            <p className={styles.title}>{t('ANY_QUESTIONS')}</p>
                            <TextInput
                                placeholder={t('Name')}
                                value={name}
                                onChangeText={setName}
                                errorMsg={nameErr}
                            />
                            <TextInput
                                placeholder="E-mail"
                                value={email}
                                onChangeText={setEmail}
                                errorMsg={emailErr}
                            />
                            <TextInput
                                placeholder={t("Message")}
                                multiline
                                value={message}
                                onChangeText={setMessage}
                                errorMsg={messageErr}
                            />
                            <Checkbox
                                checked={dataAgreement}
                                onChange={setDataAgreement}
                                error={dataAgreementErr}
                            >
                                <p>{t('I agree with the')} <a href="/privacy" target="_blank">{t('personal data processing policy')}</a></p>
                            </Checkbox>
                            <Button
                                label={formLoading ? `${t("Sending")}...` : (sent ? t("Sent") : t("Send"))}
                                secondary
                                // loading={formLoading}
                                disabled={sent}
                                onClick={() => trySendForm()}
                            />
                        </div>
                    </div>
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
