import Button from "@/components/Button";
import SizePicker from "@/components/SizePicker";
import TextInput from "@/components/TextInput";
import styles from "@/styles/AccountPage.module.scss";
import { useState } from "react";

export default function AccountPage() {
    const [tabShown, setTabShown] = useState<number>(0);

    return(
        <div className={styles.Account__root}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <h2>Welcome, Alexander!</h2>
                    <p className={styles.c_info_title}>
                        Contact information
                    </p>
                    <div className={styles.info_grid}>
                        <TextInput
                            value="Alexander"
                        />
                        <TextInput
                            value="IvanovAlex@gmail.com"
                        />
                        <TextInput
                            value="Ivanov"
                        />
                        <TextInput
                            value="+7 (995) 932-32-14"
                        />
                    </div>
                    <Button
                        label="Change Password"
                        tertiary
                        style={{width: '100%'}}
                    />
                </div>

                <div className={styles.right}>
                    <div className={styles.hor}>
                        <div className={`${styles.tab_btn} ${tabShown == 0 ? styles.active : ''}`} onClick={() => setTabShown(0)}>
                            <p>Active orders</p>
                        </div>
                        <div className={`${styles.tab_btn} ${tabShown == 1 ? styles.active : ''}`} onClick={() => setTabShown(1)}>
                            <p>Purchase history</p>
                        </div>
                    </div>

                    <div className={styles.orders_list}>
                        <OrderTile/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OrderTile() {
    return(
        <div className={styles.OrderTile}>
            <div className={styles.info}>
                <p className={styles.date}>18.02.2025</p>
                <p className={styles.code}>№3214</p>
                <div className={styles.hor}>
                    <p className={styles.status}>Status: <span className={styles.delivered}>Delivered</span></p>
                    <p className={styles.total}>Total amount: 8 575 ₽</p>
                </div>
            </div>

            <div className={styles.gallery}>
                <div className={styles.img_c}></div>
                <div className={styles.img_c}></div>
                <div className={styles.more}>
                    <p>+ 4</p>
                </div>
            </div>
        </div>
    );
}
