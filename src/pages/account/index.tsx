import Button from "@/components/Button";
import SizePicker from "@/components/SizePicker";
import TextInput from "@/components/TextInput";
import ClientService from "@/services/ClientService";
import OrderService from "@/services/OrderService";
import styles from "@/styles/AccountPage.module.scss";
import { Order } from "@/types/Order";
import User from "@/types/User";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AccountPage() {
    const router = useRouter();

    const [tabShown, setTabShown] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User|null>(null);

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const [emailErr, setEmailErr] = useState<string>("");
    const [phoneErr, setPhoneErr] = useState<string>("");

    const [updateLoading, setUpdateLoading] = useState<boolean>(false);

    const [orders, setOrders] = useState<Array<Order>>([]);
    const [activeOrders, setActiveOrders] = useState<Array<Order>>([]);

    useEffect(() => {
        tryAuth();
    }, []);

    useEffect(() => {
        if(user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
            setPhone(user.phone);

            fetchOrders();
        }
    }, [user]);

    async function fetchOrders() {
        const res = await OrderService.getOrdersList();
        if(res && res.length > 0) {
            setOrders(res);
            const _activeOrders = res.filter(o => !["completed", "cancelled"].includes(o.status));
            setActiveOrders(_activeOrders);
        }
    }

    async function tryAuth() {
        const res = await ClientService.signInWithCookies();
        if(res && res.email) {
            setLoading(false);
            setUser(res);
            console.log(res);
        } else {
            router.push("/account/sign-in");
        }
    }

    async function updateUserInfo() {
        if(updateLoading) return;

        if(email == "") {
            setEmailErr("Please enter your email");
            return;
        } else {
            setEmailErr("");
        }
        if(phone == "") {
            setPhoneErr("Please enter your phone number");
            return;
        } else {
            setPhoneErr("");
        }

        setUpdateLoading(true);

        const res = await ClientService.updateUserInfo({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        });
        setUser(res);
        setUpdateLoading(false);
    }

    if(loading || user == null) {
        return(
            <div className={styles.Account__root}/>
        );
    }

    return(
        <div className={styles.Account__root}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <h2>Welcome, {user.first_name}!</h2>
                    <p className={styles.c_info_title}>
                        Contact information
                    </p>
                    <div className={styles.info_grid}>
                        <TextInput
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholder="First Name"
                        />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="E-mail"
                            required
                            errorMsg={emailErr}
                        />
                        <TextInput
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder="Last Name"
                        />
                        <TextInput
                            value={phone}
                            onChangeText={setPhone}
                            phone
                            placeholder="+7 (999) 999-99-99"
                            required
                            errorMsg={phoneErr}
                        />
                    </div>
                    <Button
                        label={updateLoading ? "Loading..." : "Update Information"}
                        onClick={updateUserInfo}
                        loading={updateLoading}
                        tertiary
                        style={{width: '100%', marginBottom: '16px'}}
                    />
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
                        {tabShown == 0 && activeOrders.length > 0 && activeOrders.map((order, index) => {
                            return(
                                <OrderTile
                                    key={`active_${index}`}
                                    order={order}
                                />
                            );
                        })}
                        {tabShown == 1 && orders.length > 0 && orders.map((order, index) => {
                            return(
                                <OrderTile
                                    key={index}
                                    order={order}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function OrderTile({order}: {order: Order}) {
    return(
        <div className={styles.OrderTile}>
            <div className={styles.info}>
                <p className={styles.date}>18.02.2025</p>
                <p className={styles.code}>№{order._id}</p>
                <div className={styles.hor}>
                    <p className={styles.status}>Status: <span className={['cancelled'].includes(order.status) ? styles.cancelled : styles.delivered}>{order.status}</span></p>
                    <p className={styles.total}>Total amount: {numberWithSpaces(order.total)} ₽</p>
                </div>
            </div>

            <div className={styles.gallery}>
                {order.products.slice(0, window.innerWidth >= 1440 ? 2 : 1).map((product, index) => {
                    return(
                        <div className={styles.img_c} key={index}>
                            <img src={product.images[0].min} alt={product.name} />
                        </div>
                    );
                })}
                {order.products.length > 3 &&
                <div className={styles.more}>
                    <p>+ {order.products.length - 2}</p>
                </div>
                }
            </div>
        </div>
    );
}

function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
