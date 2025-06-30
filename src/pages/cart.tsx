import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextInput from "@/components/TextInput";
import CookieService from "@/services/CookieService";
import OrderService from "@/services/OrderService";
import styles from "@/styles/CartPage.module.scss";
import { Product } from "@/types/Product";
import { useEffect, useRef, useState } from "react";

export default function CartPage() {
    const [cart, setCart] = useState<Array<{id: string, size: string, amount: number}>>([]);
    const [cartProducts, setCartProducts] = useState<Array<Product>>([]);

    // without delivery
    const [rawTotal, setRawTotal] = useState<number>(0);

    async function getCartProductsAsync(cList: Array<{id: string, size: string, amount: number}>) {
        const cl = await OrderService.getCartItems({ cart: cList });
        setCartProducts(cl);
        let _rawTotal = 0;
        const __cart: Array<{id: string, size: string, amount: number}> = [];
        let _cnt = 0;
        for(const ci of cl) {
            _rawTotal += ci.availability[0].prices[0].value * ci.availability[0].amount;
            __cart.push({
                id: ci._id,
                size: ci.availability[0].size,
                amount: ci.availability[0].amount
            });
            _cnt += ci.availability[0].amount;
        }
        setRawTotal(_rawTotal);
        if(cl.length != cList.length) {
            alert("Некоторые товары из вашей корзины недоступны");
        }
        setCart(__cart);
        CookieService.setCookie('cart', JSON.stringify(__cart), 365);
        const el = document.getElementById('cart-cnt');
        const elMob = document.getElementById('cart-cnt-mob');
        if(el) {
            el.innerHTML = String(_cnt);
        }
        if(elMob) {
            elMob.innerHTML = String(_cnt);
        }
    }

    function indexInCart({id, size}: {id: string, size: string}) {
        const cl = JSON.parse(JSON.stringify(cart));
        let i = 0;
        for(const item of cl) {
            if(id == item.id) {
                if(size != "") {
                    if(size == item.size) {
                        return i;
                    }
                } else {
                    return i;
                }
            }
            i += 1;
        }

        return -1;
    }

    function removeFromCart({id, size}: {id: string, size: string}) {
        const cl: Array<{id: string, size: string, amount: number}> = JSON.parse(JSON.stringify(cart));
        const listIndex = indexInCart({id: id, size: size});
        cl.splice(listIndex, 1);

        CookieService.setCookie('cart', JSON.stringify(cl), 365);
        setCart(cl);
        getCartProductsAsync(cl);
        // clearPromo();
        setPromoApplied(false);
        setPromoComment("");
        setPromoCodeErr("");
    }

     const [promo, setPromo] = useState<string>("");
    const [fio, setFio] = useState<string>("");

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    const [email, setEmail] = useState<string>("");

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [address2, setAddress2] = useState<string>("");

    type CityObject = {
        // city_uuid: string;
        code: number;
        full_name: string;
        longitude: number;
        latitude: number;
    };

    const [cityObject, setCityObject] = useState<CityObject|null>(null);
    const [cityCode, setCityCode] = useState<number>(0);

    useEffect(() => {
        if(cityObject != null) {
            setCity(cityObject.full_name.split(", ")[0]);
            setCityCode(cityObject.code);
        }
    }, [cityObject]);

    const [cityHints, setCityHints] = useState<Array<CityObject>>([]);

    useEffect(() => {
        if(city == "") {
            setCityHints([]);
        } else if(city.length >= 2) {
            getCityHints(city);
        }
    }, [city]);

    useEffect(() => {
        if(cityCode != 0) {
            getDeliveryInfo(cityCode);
        }
    }, [cityCode, rawTotal]);

    async function getCityHints(name: string) {
        const res = await OrderService.getCitySuggestions(name);
        setCityHints(res);
    }

    const [deliveryCost, setDeliveryCost] = useState<number>(0);
    const [deliveryCalendar, setDeliveryCalendar] = useState<number>(0);

    type ShippingPoint = {
        _id: string;
        code: string;
        name: string;
        city_code: number;
        lat: number;
        lon: number;
        work_time: Array<{
            day: number;
            time: string;
        }>;
        address: string;
        postal_code: string;
    };
    const [selectedShippingPoint, setSelectedShippingPoint] = useState<ShippingPoint | null>(null);
    const sspRef = useRef<ShippingPoint|null>(null);

    useEffect(() => {
        sspRef.current = selectedShippingPoint;
    }, [selectedShippingPoint]);

    const [shippingPoints, setShippingPoints] = useState<Array<ShippingPoint>>([]);
    const spRef = useRef<Array<ShippingPoint>>([]);

    useEffect(() => {
        spRef.current = shippingPoints;
    }, [shippingPoints]);

    async function getDeliveryInfo(code: number) {
        const res = await OrderService.getDeliveryCost(code, rawTotal);
        setDeliveryCost(Math.round(res.delivery_sum));
        setDeliveryCalendar(res.calendar_min);

        const res2 = await OrderService.getShippingPoints(code);
        setShippingPoints(res2);
        // @ts-expect-error call vanilla js function
        window['loadMarkers'](res2, yMapCfg);
    }

    async function updateSelectedShippingPoint(id: string) {
        for(const point of spRef.current) {
            if(point.code == id) {
                
                if(sspRef.current != null) {
                    const el1 = document.getElementById(sspRef.current.code);
                    // el1!.style.borderColor = '#36f';
                    el1!.style.borderColor = '#525252';
                }

                const el2 = document.getElementById(id);
                el2!.style.borderColor = '#f55';

                setSelectedShippingPoint(point);
                break;
            }
        }
    }

    useEffect(() => {
        const cl: string | null = CookieService.getCookie('cart');
        if(cl != null) {
            const cList: Array<{id: string, size: string, amount: number}> = JSON.parse(cl);
            if(cList.length == 0) {
                // router.back(); // ENABLE_BACK
            }
            getCartProductsAsync(cList);
        } else {
            // router.back(); // ENABLE_BACK
        }

        document.addEventListener('click', function(e) {
            const placeElement = e.target!;
            // @ts-expect-error we know marker id
            const placeId = placeElement.id;

            updateSelectedShippingPoint(placeId);
        });
    }, []);

    const [agreeShipmentRules, setAgreeShipmentRules] = useState<boolean>(false);
    const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState<boolean>(false);

    const [saveContacts, setSaveContacts] = useState<boolean>(true);
 
    function validateData() {
        // check if all necessary fields are filled
        if(!(firstName != "" && lastName != "" && email != "" && phoneNumber != "" && cityCode != 0 && city != "" && selectedShippingPoint != null && agreeShipmentRules && agreePrivacyPolicy)) {
            return false;
        }

        if(rawTotal == 0) {
            return false;
        }

        return true;
    }

    const _cartProducts: Array<Product> = [];
    for(const p of cartProducts) {
        if(p.availability[0].amount > 0) {
            _cartProducts.push(p);
        }
    }

    async function tryCreateOrder() {

    }

    async function increaseQty(p: Product) {
        const cl: Array<{id: string, size: string, amount: number}> = JSON.parse(JSON.stringify(cart));
        const listIndex = indexInCart({id: p._id, size: p.availability[0].size});
        // cl.splice(listIndex, 1);

        cl[listIndex].amount = Math.min(cl[listIndex].amount + 1, 9);

        CookieService.setCookie('cart', JSON.stringify(cl), 365);
        setCart(cl);
        getCartProductsAsync(cl);
        document.getElementById('cart-cnt')!.innerHTML = String(cl.length);
        // clearPromo();
        setPromoApplied(false);
        setPromoComment("");
        setPromoCodeErr("");
    }

    async function decreaseQty(p: Product) {
        const cl: Array<{id: string, size: string, amount: number}> = JSON.parse(JSON.stringify(cart));
        const listIndex = indexInCart({id: p._id, size: p.availability[0].size});
        // cl.splice(listIndex, 1);

        if(cl[listIndex].amount == 1) {
            // cl.splice(listIndex, 1);
            cl[listIndex].amount = cl[listIndex].amount - 1;
        } else if(cl[listIndex].amount == 0) {
            cl.splice(listIndex, 1);
        } else {
            cl[listIndex].amount = cl[listIndex].amount - 1;
        }

        CookieService.setCookie('cart', JSON.stringify(cl), 365);
        setCart(cl);
        getCartProductsAsync(cl);
        document.getElementById('cart-cnt')!.innerHTML = String(cl.length);
        // clearPromo();
        setPromoApplied(false);
        setPromoComment("");
        setPromoCodeErr("");
    }

    const [promoCodeErr, setPromoCodeErr] = useState<string>("");
    const [promoApplied, setPromoApplied] = useState<boolean>(false);
    const [promoComment, setPromoComment] = useState<string>("");

    async function checkPromo() {
        const res = await OrderService.checkPromoCode({
            cart: cart,
            promoCode: promo.toLowerCase()
        });

        setCartProducts(res.cart);
        let _rawTotal = 0;
        const __cart: Array<{id: string, size: string, amount: number}> = [];
        for(const ci of res.cart) {
            const ci_price = ci.availability[0].prices[0].newValue == 0 ? ci.availability[0].prices[0].value : ci.availability[0].prices[0].newValue;
            _rawTotal += ci_price * ci.availability[0].amount;
            __cart.push({
                id: ci._id,
                size: ci.availability[0].size,
                amount: ci.availability[0].amount
            });
        }
        setRawTotal(_rawTotal);
        if(res.cart.length != cart.length) {
            alert("Некоторые товары из вашей корзины недоступны");
        }
        setCart(__cart);

        if(!res.promo_code.success) {
            setPromoCodeErr(res.promo_code.msg);
            setPromoApplied(false);
            setPromoComment("");
        } else {
            setPromoComment(res.promo_code.msg);
            setPromoCodeErr("");
            setPromoApplied(true);
        }
    }

    async function clearPromo() {
        const res = await OrderService.getCartItems({
            cart: cart
        });

        setCartProducts(res);
        let _rawTotal = 0;
        const __cart: Array<{id: string, size: string, amount: number}> = [];
        for(const ci of res) {
            const ci_price = ci.availability[0].prices[0].newValue == 0 ? ci.availability[0].prices[0].value : ci.availability[0].prices[0].newValue;
            _rawTotal += ci_price * ci.availability[0].amount;
            __cart.push({
                id: ci._id,
                size: ci.availability[0].size,
                amount: ci.availability[0].amount
            });
        }
        setRawTotal(_rawTotal);
        if(res.length != cart.length) {
            alert("Некоторые товары из вашей корзины недоступны");
        }
        setCart(__cart);

        setPromoApplied(false);
        setPromo("");
        setPromoCodeErr("");
        setPromoComment("");
    }

    return(
        <div className={styles.Cart__root}>
            <div className={styles.wrapper}>
                <div className={styles.grid}>
                    <div className={styles.left}>
                        <p className={styles.contact_us}>
                            To place an order, enter your contact information. Do you need help with the order? <a>Contact us</a>
                        </p>
                        <div className={styles.section}>
                            <p className={styles.section_title}>Contact information</p>
                            <div className={styles.section_hor}>
                                <TextInput
                                    placeholder="First Name"
                                    required
                                    value={firstName}
                                    onChangeText={setFirstName}
                                />
                                <TextInput
                                    placeholder="E-Mail"
                                    required
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </div>
                            <div className={styles.section_hor}>
                                <TextInput
                                    placeholder="Last Name"
                                    required
                                    value={lastName}
                                    onChangeText={setLastName}
                                />
                                <TextInput
                                    placeholder="+7 (999) 999-99-99"
                                    phone
                                    required
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                />
                            </div>
                        </div>
                        <div className={styles.section}>
                            <p className={styles.section_title}>Delivery</p>
                            <div className={styles.section_hor}>
                                <TextInput
                                    placeholder="Select the city"
                                    required
                                    value={city}
                                    onChangeText={setCity}
                                    hints={cityHints}
                                    onClickHint={h => {
                                        setCityObject(h as CityObject);
                                    }}
                                    onBlur={() => {
                                        if(cityHints.length > 0) {
                                            setCityObject(cityHints[0]);
                                        }
                                    }}
                                />
                                <div className={styles.section_hor}>

                                </div>
                            </div>
                            <div className={styles.section_hor}>
                                <TextInput
                                    placeholder="Address"
                                    required
                                    value={address}
                                    onChangeText={setAddress}
                                />
                                <TextInput
                                    placeholder="Apartment, suite, etc. (optional)"
                                    value={address2}
                                    onChangeText={setAddress2}
                                />
                            </div>
                        </div>
                        <div className={styles.section}>
                            <p className={styles.section_title}>Comment</p>
                            <TextInput
                                placeholder="Comment on the order"
                            />
                        </div>
                        <div className={styles.section}>
                            <p className={styles.section_title}>Promocode</p>
                            <TextInput
                                placeholder="Enter the promo code"
                                value={promo}
                                onChangeText={setPromo}
                                errorMsg={promoCodeErr}
                            />
                        </div>
                        <div className={styles.agreements}>
                            <Checkbox

                            >
                                <p>I agree with the <a href="/privacy" target="_blank">personal data processing policy</a></p>
                            </Checkbox>
                            <Checkbox

                            >
                                <p>I agree with the terms of the <a href="/offer" target="_blank">public offer</a></p>
                            </Checkbox>
                            <Checkbox
                                label="I agree to receive an advertising newsletter"
                                checked
                            />
                        </div>
                        <Button
                            label="MAKE AN ORDER"
                            secondary
                            style={{width: '100%'}}
                            onClick={() => tryCreateOrder()}
                        />
                    </div>
                    <div className={styles.right}>
                        {cartProducts.map((product, index) => {
                            return(
                                <div className={styles.product_c} key={index}>
                                    <img className={styles.p_img} src={product.images[0].min} alt="p_img" />
                                    <div className={styles.p_info}>
                                        <p className={styles.p_cat}>{product.categories[0].name}</p>
                                        <p className={styles.p_name}>«{product.name}»</p>
                                        <p className={styles.p_size}>Size: <span>{product.availability[0].size}</span></p>
                                    </div>
                                    <div className={styles.p_price_and_qty}>
                                        <div className={styles.p_amount_contols}>
                                            <div className={styles.control} onClick={() => decreaseQty(product)}>
                                                <img src="/minus.png" />
                                            </div>
                                            <div className={styles.counter}>
                                                <p>{product.availability[0].amount}</p>
                                            </div>
                                            <div className={styles.control} onClick={() => increaseQty(product)}>
                                                <img src="/plus.png" />
                                            </div>
                                        </div>
                                        <p className={styles.p_price}>{numberWithSpaces(product.availability[0].prices[0].newValue == 0 ? product.availability[0].prices[0].value : product.availability[0].prices[0].newValue)} ₽</p>
                                    </div>
                                    <div className={styles.p_remove} onClick={() => removeFromCart({id: product._id, size: product.availability[0].size})}>
                                        <img src="/cart-remove.png" />
                                    </div>
                                </div>
                            );
                        })}

                        <div className={styles.total_c}>
                            <p className={styles.total_sub}>
                                Amount: {numberWithSpaces(rawTotal)} ₽
                            </p>
                            <p className={styles.total_sub}>
                                Delivery: {numberWithSpaces(deliveryCost)} ₽
                            </p>
                            <p className={styles.total_cost}>
                                Total amount: {numberWithSpaces(rawTotal + deliveryCost)} ₽
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
