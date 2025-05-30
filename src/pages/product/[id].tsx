import Button from "@/components/Button";
import ColorPicker from "@/components/ColorPicker";
import ProductCard from "@/components/ProductCard";
import SizePicker from "@/components/SizePicker";
import CookieService from "@/services/CookieService";
import styles from "@/styles/Product.module.scss";
import { useEffect, useState } from "react";

export default function ProductPage() {
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("red");
    const [amount, setAmount] = useState<number>(1);

    const [cart, setCart] = useState<Array<{id: string, size: string, amount: number}>>([]);
    const [inCart, setInCart] = useState<boolean>(false);

    function addToCart({id, size}: {id: string, size: string}) {
        const cl: Array<{id: string, size: string, amount: number}> = JSON.parse(JSON.stringify(cart));
        cl.push({id: id, size: size, amount: 1});

        CookieService.setCookie('cart', JSON.stringify(cl), 365);
        setCart(cl);
        
        const el = document.getElementById('cart-cnt');
        const elMob = document.getElementById('cart-cnt-mob');
        if(el) {
            el.innerHTML = String(cl.length);
        }
        if(elMob) {
            elMob.innerHTML = String(cl.length);
        }
    }

    useEffect(() => {
        const cl: string | null = CookieService.getCookie('cart');
        if(cl != null) {
            const cList: Array<{id: string, size: string, amount: number}> = JSON.parse(cl);
            setCart(cList);
        }
    }, []);

    function tryDecreaseQty() {
      // const sizeAlias = product.availability[selectedSizeIndex].size;
      const sizeAlias = selectedSize;
      const _cart = JSON.parse(JSON.stringify(cart));
      let i = 0;
      let cnt = 0;
      for(const item of _cart) {
        if(item.size == sizeAlias) {
          const _item = item;
          _item.amount = _item.amount - 1;
          _cart[i] = _item;
        }

        cnt += _cart[i].amount;
        i += 1;
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
        for(const item of _cart) {
            if(item.size == sizeAlias) {
            const _item = item;
            _item.amount = _item.amount + 1;
            _cart[i] = _item;
            }
            
            cnt += _cart[i].amount;
            i += 1;
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

    return(
        <>
        <div className={styles.ProductPage__root}>
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <p className={styles.bc}>T-shirts</p>
                    <img src="/crumb.png" />
                    <p className={`${styles.bc} ${styles.current}`}>«AUTHORISED SUPPLIER»</p>
                </div>
                <div className={styles.grid}>
                    <div className={styles.gallery}>

                    </div>
                    <div className={styles.info}>
                        <h5 className={styles.cat}>t-shirt</h5>
                        <h4 className={styles.title}>«AUTHORISED SUPPLIER»</h4>
                        <p className={styles.price}>2 500 ₽</p>
                        <SizePicker
                            items={['S', 'M', 'L', 'XL']}
                            value={selectedSize}
                            onChange={setSelectedSize}
                        />
                        <ColorPicker
                            items={['red', 'black']}
                            value={selectedColor}
                            onChange={setSelectedColor}
                            className={styles.color_picker}
                        />
                        <div className={styles.product_actions}>
                            <Button
                                label="Add to bag"
                                className={styles.add_button}
                                disabled={selectedColor == "" || selectedSize == ""}
                            />
                            <div className={styles.amount_contols}>
                                <div className={styles.control}>
                                    <img src="/minus.png" />
                                </div>
                                <div className={styles.counter}>
                                    <p>{amount}</p>
                                </div>
                                <div className={styles.control}>
                                    <img src="/plus.png" />
                                </div>
                            </div>
                        </div>
                        <p className={styles.desc_title}>Description</p>
                        <p className={styles.desc_content}>
                            • Kulirnaya glade<br/>
                            • 95% cotton, 5% elastane<br/>
                            • Density 200g/m2<br/>
                            • Silkscreen printing<br/>
                            • Two colors: red and black
                        </p>
                    </div>
                </div>

                <div className={styles.rel_head}>
                    <h2>RELATED PRODUCTS</h2>
                </div>
                <div className={styles.rel_grid}>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                </div>
            </div>
        </div>
        </>
    );
}
