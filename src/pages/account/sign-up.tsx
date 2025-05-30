import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextInput from "@/components/TextInput";
import styles from "@/styles/SignUpPage.module.scss";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
    const [phone, setPhone] = useState<string>("");

    return(
        <div className={styles.SignUp__root}>
            <div className={styles.frame}>
                <div className={styles.wrapper}>
                    <p className={styles.title}>
                        Register to get started
                    </p>
                    <TextInput
                        placeholder="Your first name"
                    />
                    <TextInput
                        placeholder="Your last name"
                    />
                    <TextInput
                        placeholder="+7 (999) 999 99-99"
                        phone
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <TextInput
                        placeholder="E-mail"
                    />
                    <Checkbox
                    >
                        <p>I agree with the <Link href="/">personal data processing policy</Link></p>
                    </Checkbox>
                    <Checkbox
                        label="I agree to receive an advertising newsletter"
                    />
                    <Button
                        label="Sign up"
                        tertiary
                        style={{width: '100%'}}
                    />
                    <p className={styles.sign_in}>
                        Have an account? <Link href="/account/sign-in">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
