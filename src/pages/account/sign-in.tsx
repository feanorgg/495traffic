import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextInput from "@/components/TextInput";
import styles from "@/styles/SignUpPage.module.scss";
import Link from "next/link";

export default function SignInPage() {
    return(
        <div className={styles.SignUp__root}>
            <div className={`${styles.frame} ${styles.signin_frame}`}>
                <div className={styles.wrapper}>
                    <p className={styles.title}>
                        To continue, log in to your profile
                    </p>
                    <TextInput
                        placeholder="E-mail"
                    />
                    <TextInput
                        placeholder="Password"
                    />
                    <Button
                        label="Log In"
                        tertiary
                        style={{width: '100%'}}
                    />
                    <div className={styles.hor}>
                        <p className={styles.txt}>
                            <Link href="/account/sign-up">Sign Up</Link>
                        </p>
                        <p className={styles.txt}>
                            <Link href="/account/password-reset">Forgot password?</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
