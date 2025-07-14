import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextInput from "@/components/TextInput";
import CookieService from "@/services/CookieService";
import OrderService from "@/services/OrderService";
import styles from "@/styles/CartPage.module.scss";
import { Product } from "@/types/Product";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { yMapCfg } from '@/constants/mapStyleCfg';
import { useRouter } from "next/router";
import { Order } from "@/types/Order";
import ClientService from "@/services/ClientService";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import withCDNPrefix from "@/functions/withCDNPrefix";

export default function CartPage() {
    const t = useTranslations();

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

    useEffect(() => {
        setEmpty(cart.length == 0);
    }, [cart]);

    const [promo, setPromo] = useState<string>("");

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [firstNameErr, setFirstNameErr] = useState<string>("");
    const [lastNameErr, setLastNameErr] = useState<string>("");

    const [email, setEmail] = useState<string>("");
    const [emailErr, setEmailErr] = useState<string>("");

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [address2, setAddress2] = useState<string>("");
    const [phoneNumberErr, setPhoneNumberErr] = useState<string>("");
    const [cityErr, setCityErr] = useState<string>("");
    const [addressErr, setAddressErr] = useState<string>("");

    const [comment, setComment] = useState<string>("");

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
    const [cdekDeliveryCost, setCdekDeliveryCost] = useState<number>(0);
    const [deliveryCalendar, setDeliveryCalendar] = useState<number>(0);
    const [deliveryMethod, setDeliveryMethod] = useState<'cdek'|'courier'>('cdek');

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

    useEffect(() => {
        if(deliveryMethod == 'cdek') {
            setDeliveryCost(cdekDeliveryCost);
        } else {
            setDeliveryCost(1000);
        }
    }, [deliveryMethod]);

    async function getDeliveryInfo(code: number) {
        const res = await OrderService.getDeliveryCost(code, rawTotal);
        setDeliveryCost(Math.round(res.delivery_sum));
        setCdekDeliveryCost(Math.round(res.delivery_sum));
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
                    el1!.style.borderColor = '#525252';
                }

                const el2 = document.getElementById(id);
                el2!.style.borderColor = '#01F300';

                setSelectedShippingPoint(point);
                break;
            }
        }
    }

    const router = useRouter();
    const [empty, setEmpty] = useState<boolean>(false);

    useEffect(() => {
        const cl: string | null = CookieService.getCookie('cart');
        if(cl != null) {
            const cList: Array<{id: string, size: string, amount: number}> = JSON.parse(cl);
            if(cList.length == 0) {
                setEmpty(true);
            } else {
                getCartProductsAsync(cList);
            }
        } else {
            setEmpty(true);
        }

        document.addEventListener('click', function(e) {
            const placeElement = e.target!;
            // @ts-expect-error we know marker id
            const placeId = placeElement.id;

            updateSelectedShippingPoint(placeId);
        });

        tryFillUserData();
    }, []);

    const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState<boolean>(false);
    const [agreePublicOffer, setAgreePublicOffer] = useState<boolean>(false);
    const [agreePrivacyPolicyErr, setAgreePrivacyPolicyErr] = useState<string>("");
    const [agreePublicOfferErr, setAgreePublicOfferErr] = useState<string>("");
    const [agreeSubscription, setAgreeSubscription] = useState<boolean>(true);
 
    function validateData() {
        // check if all necessary fields are filled
        if(firstName == "") {
            return false;
        }

        if(lastName == "") {
            return false;
        }

        if(email == "") {
            return false;
        }

        if(phoneNumber == "") {
            return false;
        }

        if(deliveryMethod == 'cdek') {
            if(cityCode == 0) {
                return false;
            }

            if(selectedShippingPoint == null) {
                return false;
            }
        } else if(deliveryMethod == 'courier') {
            if(cityCode == 0) {
                return false;
            }

            if(address == "") {
                return false;
            }
        }

        if(!agreePrivacyPolicy) {
            return false;
        }

        if(!agreePublicOffer) {
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

    const [creationLoading, setCreationLoading] = useState<boolean>(false);

    const [shippingPointErr, setShippingPointErr] = useState<string>("");

    async function tryCreateOrder() {
        setCreationLoading(true);

        if(firstName == "") {
            setFirstNameErr(t("Required field"));
            setCreationLoading(false);
            return false;
        } else {setFirstNameErr("");}

        if(lastName == "") {
            setLastNameErr(t("Required field"));
            setCreationLoading(false);
            return false;
        } else {setLastNameErr("");}

        if(email == "") {
            setEmailErr(t("Required field"));
            setCreationLoading(false);
            return false;
        } else {setEmailErr("");}

        if(!String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            setEmailErr(t("Incorrect email, please try again"));
            setCreationLoading(false);
            return false;
        } else {setEmailErr("");}

        if(phoneNumber == "") {
            setPhoneNumberErr(t("Required field"));
            setCreationLoading(false);
            return false;
        } else {setPhoneNumberErr("");}

        if(deliveryMethod == 'cdek') {
            if(cityCode == 0) {
                setCityErr(t("Required field"));
                setCreationLoading(false);
                return false;
            } else {setCityErr("");}

            if(selectedShippingPoint == null) {
                setShippingPointErr(t("Required field"));
                setCreationLoading(false);
                return false;
            } else {setShippingPointErr("");}
        } else if(deliveryMethod == 'courier') {
            if(cityCode == 0) {
                setCityErr(t("Required field"));
                setCreationLoading(false);
                return false;
            } else {setCityErr("");}

            if(address == "") {
                setAddressErr(t("Required field"));
                setCreationLoading(false);
                return false;
            } else {setAddressErr("");}
        }

        if(!agreePrivacyPolicy) {
            setAgreePrivacyPolicyErr(t("Required field"));
            setCreationLoading(false);
            return false;
        } else {setAgreePrivacyPolicyErr("");}

        if(!agreePublicOffer) {
            setAgreePublicOfferErr(t("Required field"));
            setCreationLoading(false);
            return false;
        } else {setAgreePublicOfferErr("");}

        if(rawTotal == 0) {
            setCreationLoading(false);
            return false;
        }

        // process order
        if(deliveryMethod == 'cdek') {
            OrderService.createOrder({
                products: _cartProducts,
                email: email,
                first_name: firstName,
                last_name: lastName,
                promo_code: promo.toLowerCase(),
                currency: "RUB",
                phone_number: phoneNumber,
                user_id: "",
                delivery_type: "cdek",
                cdek_data: {
                    shipping_point_code: selectedShippingPoint!.code,
                    city_code: cityCode,
                    address: address,
                    zip: ""
                },
                delivery_address: `${city}, ${address}, ${address2}`,
                payment_method: "card",
                subscribe: agreeSubscription,
                _callback: (order: Order) => {
                    CookieService.setCookie('cart', '[]', 365);
                    const el = document.getElementById('cart-cnt');
                    el!.innerHTML = "0";
    
                    if(order.payment_url != "") {
                        router.push(order.payment_url);
                    }
                },
                _onStockError: () => {
                    alert("Некоторые товары из вашей корзины стали недоступны");
                    setCreationLoading(false);
                    getCartProductsAsync(cart);
                }
            });
        } else if(deliveryMethod == 'courier') {
            OrderService.createOrder({
                products: _cartProducts,
                email: email,
                first_name: firstName,
                last_name: lastName,
                promo_code: promo.toLowerCase(),
                currency: "RUB",
                phone_number: phoneNumber,
                user_id: "",
                delivery_type: "courier",
                cdek_data: {
                    shipping_point_code: "",
                    city_code: 0,
                    address: "",
                    zip: ""
                },
                delivery_address: `${city}, ${address}, ${address2}`,
                comment: comment,
                payment_method: "card",
                _callback: (order: Order) => {
                    CookieService.setCookie('cart', '[]', 365);
                    const el = document.getElementById('cart-cnt');
                    el!.innerHTML = "0";
    
                    if(order.payment_url != "") {
                        router.push(order.payment_url);
                    }
                },
                _onStockError: () => {
                    alert("Некоторые товары из вашей корзины стали недоступны");
                    setCreationLoading(false);
                    getCartProductsAsync(cart);
                }
            });
        }
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

    async function tryFillUserData() {
        const res = await ClientService.signInWithCookies();
        if(res && res.email) {
            setFirstName(res.first_name);
            setLastName(res.last_name);
            setEmail(res.email);
            setPhoneNumber(res.phone);
        }
    }

    return(
        <>
        <Head>
            <style type="text/css">{`
            .marker-class {
                width: 16px;
                height: 16px;
                background-color: #fff;
                border-radius: 16px;
                cursor: pointer;
                border: 3px solid #525252;
            }
            `}</style>
            <title>Cart - 495TRAFFIC</title>
            <meta name="description" content="Do Not Get Caught." />
            <meta property="og:title" content="Cart - 495TRAFFIC" />
            <meta property="og:description" content="Do Not Get Caught." /> 
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" /> 
        </Head>
        <Script src="https://api-maps.yandex.ru/v3/?apikey=9a60df23-70f9-4e64-ade1-dce7ada907ff&lang=ru_RU" type="text/javascript" strategy="beforeInteractive" id="ymap" />
        <Script id="ymap-functions">{`
        /*initMap();

        async function initMap() {
            await ymaps3.ready;

            const {YMap, YMapDefaultSchemeLayer} = ymaps3;

            const map = new YMap(
                document.getElementById('map'),

                {
                    location: {
                        center: [37.588144, 55.733842],
                        zoom: 10
                    }
                }
            );

            map.addChild(new YMapDefaultSchemeLayer({
                customization: ${yMapCfg}
            }));
        }*/

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function loadMarkers(markers, cfg) {
            const el = document.getElementById('map');
            el.innerHTML = "";

            try {
                await ymaps3.ready;
            } catch {
                await sleep(500);
                await ymaps3.ready;
            }

            const {YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer} = ymaps3;

            const map = new YMap(
                document.getElementById('map'),

                {
                    location: {
                        center: [markers[0].lon, markers[0].lat],
                        zoom: 9.5
                    }
                }
            );

            map.addChild(new YMapDefaultSchemeLayer({
                customization: cfg
            }));
            map.addChild(new YMapDefaultFeaturesLayer({zIndex: 1800}));

            for(const m of markers) {
                const markerElement = document.createElement('div');
                markerElement.className = 'marker-class';
                markerElement.id = m.code;
                markerElement.innerHTML = '';

                const marker = new YMapMarker({
                    coordinates: [m.lon, m.lat],
                }, markerElement);

                map.addChild(marker);
            }
        }
        `}</Script>
        <div className={styles.Cart__root}>
            <div className={styles.wrapper}>
                <div className={styles.grid}>
                    <div className={styles.left}>
                        <p className={styles.contact_us}>
                            {t("CONTACT_INFORMATION")} <a href="/contacts" target="_blank">{t("Contact us")}</a>
                        </p>
                        <div className={styles.section}>
                            <p className={styles.section_title}>{t("Contact information")}</p>
                            <div className={styles.section_hor}>
                                <TextInput
                                    placeholder={t("First Name")}
                                    required
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    errorMsg={firstNameErr}
                                    maxLength={63}
                                />
                                <TextInput
                                    placeholder="E-Mail"
                                    required
                                    value={email}
                                    onChangeText={setEmail}
                                    errorMsg={emailErr}
                                    maxLength={63}
                                />
                            </div>
                            <div className={styles.section_hor}>
                                <TextInput
                                    placeholder={t("Last Name")}
                                    required
                                    value={lastName}
                                    onChangeText={setLastName}
                                    errorMsg={lastNameErr}
                                    maxLength={63}
                                />
                                <TextInput
                                    placeholder="+7 (999) 999-99-99"
                                    phone
                                    required
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    errorMsg={phoneNumberErr}
                                />
                            </div>
                        </div>
                        <div className={styles.section}>
                            <p className={styles.section_title}>{t('Delivery')}</p>
                            <div className={styles.section_hor}>
                                <TextInput
                                    placeholder={t("Select the city")}
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
                                    errorMsg={cityErr}
                                    chevron
                                />
                                <div className={`${styles.section_hor} ${styles.still_hor}`}>
                                    <div className={`${styles.tab_btn} ${deliveryMethod == 'cdek' ? styles.active : ''}`} onClick={() => setDeliveryMethod('cdek')}>
                                        <p>{t('Pick-up point')}</p>
                                    </div>
                                    <div className={`${styles.tab_btn} ${deliveryMethod == 'courier' ? styles.active : ''}`} onClick={() => setDeliveryMethod('courier')}>
                                        <p>{t('By courier')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.cdek_map_wrapper} ${deliveryMethod != 'cdek' ? styles.hidden : ''}`}>
                                <div id="map" className={styles.map_container}>
                                    <p>{t('Specify your city to choose the pick-up point')}</p>
                                </div>
                            </div>
                            {selectedShippingPoint != null && deliveryMethod == 'cdek' &&
                            <div className={styles.cdek_shipping_point}>
                                <div className={styles.wrap}>
                                    <p className={styles.subname}>{t('Selected pick-up point')}:</p>
                                    <p className={styles.name}>{selectedShippingPoint.name.split(', ')[0]}, {selectedShippingPoint.address}</p>
                                </div>
                            </div>
                            }
                            {deliveryMethod == 'courier' &&
                            <div className={styles.section_hor}>
                                <TextInput
                                    placeholder={t("Address")}
                                    required
                                    value={address}
                                    onChangeText={setAddress}
                                    errorMsg={addressErr}
                                    maxLength={255}
                                />
                                <TextInput
                                    placeholder={t("Apartment, suite, etc (optional)")}
                                    value={address2}
                                    onChangeText={setAddress2}
                                    maxLength={255}
                                />
                            </div>
                            }
                        </div>
                        <div className={styles.section}>
                            <p className={styles.section_title}>{t('Comment')}</p>
                            <TextInput
                                placeholder={t("Comment on the order")}
                                value={comment}
                                onChangeText={setComment}
                                maxLength={511}
                            />
                        </div>
                        <div className={styles.section}>
                            <p className={styles.section_title}>{t('Promocode')}</p>
                            <div className={styles.promo_hor}>
                                <TextInput
                                    placeholder={t("Enter the promo code")}
                                    value={promo}
                                    onChangeText={setPromo}
                                    errorMsg={promoCodeErr}
                                    disabled={promoApplied}
                                    maxLength={63}
                                />
                                <Button
                                    label={promoApplied ? t("PROMOCODE APPLIED") : t("APPLY")}
                                    secondary
                                    disabled={promo == "" || promoApplied}
                                    onClick={() => checkPromo()}
                                />
                            </div>
                        </div>
                        <div className={styles.agreements}>
                            <Checkbox
                                error={agreePrivacyPolicyErr != ""}
                                checked={agreePrivacyPolicy}
                                onChange={setAgreePrivacyPolicy}
                            >
                                <p>{t('I agree with the')} <a href="/privacy" target="_blank">{t('personal data processing policy')}</a></p>
                            </Checkbox>
                            <Checkbox
                                error={agreePublicOfferErr != ""}
                                checked={agreePublicOffer}
                                onChange={setAgreePublicOffer}
                            >
                                <p>{t('I agree with the terms of the')} <a href="/offer" target="_blank">{t('public offer')}</a></p>
                            </Checkbox>
                            <Checkbox
                                label={t("I agree to receive an advertising newsletter")}
                                checked={agreeSubscription}
                                onChange={setAgreeSubscription}
                            />
                        </div>
                        <Button
                            label={t("MAKE AN ORDER")}
                            secondary
                            style={{width: '100%'}}
                            onClick={() => tryCreateOrder()}
                            loading={creationLoading}
                        />
                    </div>
                    <div className={styles.right}>
                        {cartProducts.map((product, index) => {
                            return(
                                <div className={styles.product_c} key={index}>
                                    <div className={styles.p_img_and_info}>
                                        <img className={styles.p_img} src={withCDNPrefix(product.images[0].min)} alt="p_img" />
                                        <div className={styles.p_info}>
                                            <p className={styles.p_cat}>{t(product.categories[0].name)}</p>
                                            <p className={styles.p_name}>{product.name}</p>
                                            <p className={styles.p_size}>{t('Size')}: <span>{product.availability[0].size}</span></p>
                                        </div>
                                    </div>
                                    <div className={styles.p_price_and_qty}>
                                        <div className={styles.p_amount_contols}>
                                            <div className={styles.control} onClick={() => decreaseQty(product)}>
                                                <img src="https://cdn2.495traffic.com/minus.png" />
                                            </div>
                                            <div className={styles.counter}>
                                                <p>{product.availability[0].amount}</p>
                                            </div>
                                            <div className={styles.control} onClick={() => increaseQty(product)}>
                                                <img src="https://cdn2.495traffic.com/plus.png" />
                                            </div>
                                        </div>
                                        <p className={styles.p_price}>{numberWithSpaces(product.availability[0].prices[0].newValue == 0 ? product.availability[0].prices[0].value : product.availability[0].prices[0].newValue)} ₽</p>
                                    </div>
                                    <div className={styles.p_remove} onClick={() => removeFromCart({id: product._id, size: product.availability[0].size})}>
                                        <img src="https://cdn2.495traffic.com/cart-remove.png" />
                                    </div>
                                </div>
                            );
                        })}

                        {empty &&
                        <div className={`${styles.product_c} ${styles.empty_c}`}>
                            <p className={styles.label}>{t('Your cart is empty')}</p>
                            <Link href="/" style={{textDecoration: 'none'}}>
                                <Button
                                    label={t("GO TO PRODUCTS")}
                                />
                            </Link>
                        </div>
                        }

                        <div className={styles.total_c}>
                            <p className={styles.total_sub}>
                                {t('Amount')}: {numberWithSpaces(rawTotal)} ₽
                            </p>
                            <p className={styles.total_sub}>
                                {t('Delivery')}: {numberWithSpaces(deliveryCost)} ₽
                            </p>
                            <p className={styles.total_cost}>
                                {t('Total amount')}: {numberWithSpaces(rawTotal + deliveryCost)} ₽
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const locale = req.cookies.locale || 'ru';
    const messages = (await import(`./../messages/${locale}.json`)).default;

    return {
        props: {
            messages,
            locale
        }
    };
};
