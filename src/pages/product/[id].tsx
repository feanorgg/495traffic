import Button from "@/components/Button";
import ColorPicker from "@/components/ColorPicker";
import ProductCard from "@/components/ProductCard";
import ProgressiveImage from "@/components/ProgressiveImage";
import SizePicker from "@/components/SizePicker";
import CatalogService from "@/services/CatalogService";
import CookieService from "@/services/CookieService";
import styles from "@/styles/Product.module.scss";
import { Product } from "@/types/Product";
import { GetServerSidePropsContext } from "next";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function ProductPage({ product, relatedProducts }: { product: Product, relatedProducts: Array<Product> }) {
    const t = useTranslations();

    const [selectedSize, setSelectedSize] = useState<string>(product.availability[0].size);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [amount, setAmount] = useState<number>(1);

    const [sizes, setSizes] = useState<Array<string>>(product.availability.map((item, index) => item.size));
    const [colors, setColors] = useState<Array<string>>([]);

    const [cart, setCart] = useState<Array<{id: string, size: string, amount: number}>>([]);
    const [inCart, setInCart] = useState<boolean>(false);
    const [outOfStock, setOutOfStock] = useState<boolean>(false);

    function addToCart({id, size}: {id: string, size: string}) {
        const cl: Array<{id: string, size: string, amount: number}> = JSON.parse(JSON.stringify(cart));
        cl.push({id: id, size: size, amount: amount});

        let cnt = 0;
        for(const c of cl) {
            cnt += c.amount;
        }

        CookieService.setCookie('cart', JSON.stringify(cl), 365);
        setCart(cl);
        
        const el = document.getElementById('cart-cnt');
        const elC = document.getElementById('cart');
        if(el) {
            el.innerHTML = String(cnt);
        }
        if(elC) {
            elC.style.display = 'flex';
        }

        setInCart(true);
    }

    useEffect(() => {
        const cl: string | null = CookieService.getCookie('cart');
        if(cl != null) {
            const cList: Array<{id: string, size: string, amount: number}> = JSON.parse(cl);
            setCart(cList);
        }
    }, []);

    useEffect(() => {
        let flag = false;
        for(const item of cart) {
            if(item.id == product._id && item.size == selectedSize) {
                flag = true;
                setAmount(item.amount);
                break;
            }
        }
        /*if(!flag) {
            setAmount(1);
            console.log('a)');
        }*/
        setInCart(flag);

        for(const av of product.availability) {
            if(av.size == selectedSize) {
                setOutOfStock(av.amount == 0);
            }
        }
    }, [cart, selectedSize]);

    function tryDecreaseQty() {
        // const sizeAlias = product.availability[selectedSizeIndex].size;
        const sizeAlias = selectedSize;
        const _cart = JSON.parse(JSON.stringify(cart));
        let i = 0;
        let cnt = 0;
        let inCart = false;
        for(const item of _cart) {
            if(item.size == sizeAlias) {
                const _item = item;
                _item.amount = _item.amount - 1;
                _cart[i] = _item;
                setAmount(_item.amount);
                inCart = true;
            }

            cnt += _cart[i].amount;
            i += 1;
        }

        if(!inCart) {
            if(amount > 1) {
                setAmount(amount - 1);
            }
        }

        CookieService.setCookie('cart', JSON.stringify(_cart), 365);
        const el = document.getElementById('cart-cnt');
        const elMob = document.getElementById('cart-cnt-mob');
        if(el) {
            el.innerHTML = String(cnt);
        }
        if(elMob) {
            elMob.innerHTML = String(cnt);
        }
        setCart(_cart);
    }

    function tryIncreaseQty() {
        // const sizeAlias = product.availability[selectedSizeIndex].size;
        const sizeAlias = selectedSize;
        const _cart = JSON.parse(JSON.stringify(cart));
        let i = 0;
        let cnt = 0;
        let inCart = false;
        for(const item of _cart) {
            if(item.size == sizeAlias) {
                const _item = item;
                _item.amount = _item.amount + 1;
                _cart[i] = _item;
                inCart = true;
                setAmount(_item.amount);
            }
            
            cnt += _cart[i].amount;
            i += 1;
        }

        if(!inCart) {
            setAmount(amount + 1);
        }

        CookieService.setCookie('cart', JSON.stringify(_cart), 365);
        const el = document.getElementById('cart-cnt');
        const elMob = document.getElementById('cart-cnt-mob');
        if(el) {
            el.innerHTML = String(cnt);
        }
        if(elMob) {
            elMob.innerHTML = String(cnt);
        }
        setCart(_cart);
    }

    const [imageIndex, setImageIndex] = useState<number>(0);
    const [overlayState, setOverlayState] = useState<boolean>(false);

    return(
        <>
        {overlayState &&
        <div className={styles.Product__overlay_container}>
            <div className={styles.wrapper}>
                <div className={styles.arrow_left} onClick={() => {
                    if(imageIndex > 0) {
                        setImageIndex(imageIndex - 1);
                    } else {
                        setImageIndex(product.images.length - 1);
                    }
                }}>
                    <img src="/chevron-left-b.png" alt="left_arrow" />
                </div>
                <ProgressiveImage
                    alt="main_image"
                    className={styles.image}
                    src={product.images[imageIndex].max}
                    placeholderSrc={product.images[imageIndex].min}
                />
                <div className={styles.arrow_right} onClick={() => {
                    if(imageIndex < product.images.length - 1) {
                        setImageIndex(imageIndex + 1);
                    } else {
                        setImageIndex(0);
                    }
                }}>
                    <img src="/chevron-right-b.png" alt="right_arrow" />
                </div>
                <div className={styles.close_button}>
                    <img src="/archive-close.png" alt="close" onClick={() => setOverlayState(false)} />
                </div>
            </div>
        </div>
        }
        <div className={styles.ProductPage__root}>
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <p className={styles.bc}>{t(product.categories[0].name)}</p>
                    <img src="/crumb.png" />
                    <p className={`${styles.bc} ${styles.current}`}>{product.name}</p>
                </div>
                <div className={styles.grid}>
                    <div className={styles.gallery}>
                        <div className={styles.main_img_c}>
                            <img src={product.images[imageIndex].max} onClick={() => setOverlayState(true)} />
                            {imageIndex != 0 &&
                            <div className={styles.arrow_back} onClick={() => setImageIndex(imageIndex - 1)}>
                                <img src="/chevron-left-w.png" />
                            </div>
                            }
                            {imageIndex != product.images.length - 1 &&
                            <div className={styles.arrow_forward} onClick={() => setImageIndex(imageIndex + 1)}>
                                <img src="/chevron-left-w.png" style={{transform: 'rotate(180deg)'}} />
                            </div>
                            }
                        </div>
                        <div className={styles.img_list}>
                            {product.images.map((image, index) => {
                                return(
                                    <img
                                        key={index}
                                        src={image.min}
                                        onClick={() => setImageIndex(index)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.info}>
                        <h5 className={styles.cat}>{t(product.categories[0].name)}</h5>
                        <h4 className={styles.title}>{product.name}</h4>
                        <p className={styles.price}>{numberWithSpaces(product.availability[0].prices[0].value)} ₽</p>
                        <SizePicker
                            label={t('Size')}
                            items={sizes}
                            value={selectedSize}
                            onChange={setSelectedSize}
                            className={styles.size_picker}
                        />
                        <div className={styles.product_actions}>
                            <Button
                                label={(outOfStock ? t('Out of stock') : (inCart ? t("Added...") : t("Add to bag")))}
                                className={styles.add_button}
                                disabled={(colors.length > 1 && selectedColor == "") || (sizes.length > 1 && selectedSize == "") || inCart || outOfStock}
                                onClick={() => addToCart({id: product._id, size: selectedSize != "" ? selectedSize : sizes[0]})}
                            />
                            {!outOfStock &&
                            <div className={styles.amount_contols}>
                                <div className={styles.control} onClick={() => tryDecreaseQty()}>
                                    <img src="/minus.png" />
                                </div>
                                <div className={styles.counter}>
                                    <p>{amount}</p>
                                </div>
                                <div className={styles.control} onClick={() => tryIncreaseQty()}>
                                    <img src="/plus.png" />
                                </div>
                            </div>
                            }
                        </div>
                        <p className={styles.desc_title}>{t('Description')}</p>
                        <p className={styles.desc_content}>
                            {product.description.split("\n").map((item, index) => {
                                return(
                                    <span key={index}>{item}<br/></span>
                                );
                            })}
                        </p>
                    </div>
                </div>

                <div className={styles.rel_head}>
                    <h2>{t('RELATED PRODUCTS')}</h2>
                </div>
                <div className={styles.rel_grid}>
                    {relatedProducts.map((item, index) => {
                        return(
                            <ProductCard
                                product={item}
                                key={index}
                                t={t}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.query;
    const locale = context.req.cookies.locale || 'ru';
    const messages = (await import(`./../../messages/${locale}.json`)).default;

    if(id == undefined || typeof(id) == 'object') {
        return {
            props: {
                product: null
            }
        }
    }
    
    const p: Product = await CatalogService.getProduct({ id: "", alias: id });
    const relProds: Product[] = [];
    const r = await CatalogService.getProducts({page: 1});
    let i = 0;
    for(const pr of r.data) {
        if(i > 4) {
            break;
        }
        if(pr._id != p._id) {
            relProds.push(pr);
        }
        i += 1;
    }

    return {
        props: {
            product: p,
            relatedProducts: relProds,
            messages,
            locale
        }
    }
}

function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
