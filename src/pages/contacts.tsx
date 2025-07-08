import Head from "next/head";
import styles from "@/styles/ContactsPage.module.scss";
import TextInput from "@/components/TextInput";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import { useState } from "react";

export default function ContactsPage() {
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
        if(name == "") {
            setNameErr("Please enter your name");
            return;
        } else {setNameErr("");}
        if(email == "") {
            setEmailErr("Please enter your email");
            return;
        } else {setEmailErr("");}
        if(!String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            setEmailErr("Incorrect email, please try again");
            return;
        } else {setEmailErr("");}
        if(message == "") {
            setMessageErr("Please enter your message");
            return;
        } else {setMessageErr("");}
        if(!dataAgreement) {
            setDataAgreementErr(true);
            return;
        } else {setDataAgreementErr(false);}

        setFormLoading(true);

        // send 
    }

    return(
        <>
        <Head>
            <title>495TRAFFIC - Contacts</title>
        </Head>
        <div className={styles.Contacts__root}>
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <p className={styles.bc}>MAIN PAGE</p>
                    <img src="/crumb.png" />
                    <p className={`${styles.bc} ${styles.current}`}>CONTACTS</p>
                </div>
                <div className={styles.grid}>
                    <div className={styles.left}>
                        <h2>CONTACTS</h2>
                        <a href="mailto:495traffic@gmail.com" className={styles.email}>495TRAFFIC@GMAIL.COM</a>
                        <a href="tel:+79639326443" className={styles.phone}>+7 (963) 932 64-43</a>
                        <p className={styles.address}>62 Pushkinskaya St., Mega shopping center, 2nd floor</p>
                        <p className={styles.timetable}>from 10:00 to 18:00</p>
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
                            <p className={styles.title}>Any other questions? Write to us and we will contact you as soon as possible.</p>
                            <TextInput
                                placeholder="Name"
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
                                placeholder="Message"
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
                                <p>I agree with the <a href="/privacy" target="_blank">personal data processing policy</a></p>
                            </Checkbox>
                            <Button
                                label={formLoading ? "Sending..." : "Send"}
                                secondary
                                loading={formLoading}
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