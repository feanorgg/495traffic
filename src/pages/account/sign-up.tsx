import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextInput from "@/components/TextInput";
import ClientService from "@/services/ClientService";
import styles from "@/styles/SignUpPage.module.scss";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUpPage() {
    const t = useTranslations();
    const router = useRouter();

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [firstNameErr, setFirstNameErr] = useState<string>("");
    const [lastNameErr, setLastNameErr] = useState<string>("");
    const [phoneErr, setPhoneErr] = useState<string>("");
    const [emailErr, setEmailErr] = useState<string>("");

    const [passwordErr, setPasswordErr] = useState<string>("");

    const [dataAgreement, setDataAgreement] = useState<boolean>(false);
    const [newsletterAgreement, setNewsletterAgreement] = useState<boolean>(false);

    const [dataAgreementErr, setDataAgreementErr] = useState<boolean>(false);

    const [signUpLoading, setSignUpLoading] = useState<boolean>(false);

    async function trySignUp() {
        if(signUpLoading) {return;}

        if(firstName == "") {
            setFirstNameErr(t("Please enter your first name"));
            return;
        } else {setFirstNameErr("");}
        if(lastName == "") {
            setLastNameErr(t("Please enter your last name"));
            return;
        } else {setLastNameErr("");}
        if(phone == "") {
            setPhoneErr(t("Please enter your phone number"));
            return;
        } else {setPhoneErr("");}
        if(email == "") {
            setEmailErr(t("Please enter your email"));
            return;
        } else {setEmailErr("");}
        if(!String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            setEmailErr(t("Incorrect email, please try again"));
            return false;
        } else {setEmailErr("");}
        if(password == "") {
            setPasswordErr(t("Please enter your password"));
            return;
        } else {setPasswordErr("");}
        if(password.length < 8) {
            setPasswordErr(t("PWD_8_CHAR"));
            return;
        } else {setPasswordErr("");}

        if(!dataAgreement) {
            setDataAgreementErr(true);
            return;
        } else {setDataAgreementErr(false);}

        setSignUpLoading(true);
        const res = await ClientService.signUp({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            password: password,
            subscribe: newsletterAgreement
        });

        if(res && res.email) {
            router.push('/account');
        } else {
            // Error during sign up
            setSignUpLoading(false);
            setEmailErr(t("An account with this email already exists"));
        }
    }

    return(
        <div className={styles.SignUp__root}>
            <div className={styles.frame}>
                <div className={styles.wrapper}>
                    <p className={styles.title}>
                        {t('Register to get started')}
                    </p>
                    <TextInput
                        placeholder={t("Your first name")}
                        value={firstName}
                        onChangeText={setFirstName}
                        errorMsg={firstNameErr}
                        required
                        maxLength={63}
                    />
                    <TextInput
                        placeholder={t("Your last name")}
                        value={lastName}
                        onChangeText={setLastName}
                        errorMsg={lastNameErr}
                        required
                        maxLength={63}
                    />
                    <TextInput
                        placeholder="+7 (999) 999 99-99"
                        phone
                        value={phone}
                        onChangeText={setPhone}
                        required
                        errorMsg={phoneErr}
                    />
                    <TextInput
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        errorMsg={emailErr}
                        required
                        maxLength={63}
                    />
                    <TextInput
                        placeholder={t("Password")}
                        secure
                        value={password}
                        onChangeText={setPassword}
                        errorMsg={passwordErr}
                        required
                        maxLength={20}
                    />
                    <Checkbox
                        checked={dataAgreement}
                        onChange={() => {
                            setDataAgreement(!dataAgreement);
                            if(dataAgreementErr) {
                                setDataAgreementErr(false);
                            }
                        }}
                        error={dataAgreementErr}
                    >
                        <p>{t('I agree with the')} <Link href="/">{t('personal data processing policy')}</Link></p>
                    </Checkbox>
                    <Checkbox
                        label={t("I agree to receive an advertising newsletter")}
                        checked={newsletterAgreement}
                        onChange={setNewsletterAgreement}
                    />
                    <Button
                        label={signUpLoading ? t("Loading...") : t("Sign up")}
                        onClick={() => trySignUp()}
                        secondary
                        style={{width: '100%'}}
                    />
                    <p className={styles.sign_in}>
                        {t('Have an account?')} <Link href="/account/sign-in">{t('Log in')}</Link>
                    </p>
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
