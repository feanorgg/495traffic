import Button from "@/components/Button";
import ColorPicker from "@/components/ColorPicker";
import ProductCard from "@/components/ProductCard";
import SizePicker from "@/components/SizePicker";
import styles from "@/styles/Product.module.scss";
import { useState } from "react";

export default function ProductPage() {
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [amount, setAmount] = useState<number>(1);

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
