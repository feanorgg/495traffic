import styles from "@/components/ProductCard.module.scss";
import Button from "./Button";

export default function ProductCard() {
    return(
        <div className={styles.ProductCard}>
            <div className={styles.img_container}>
                <img 
                    src="/495-product-img.webp" 
                    alt="product_image"
                />
            </div>
            <div className={styles.info_container}>
                <p className={styles.category}>Hoodie</p>
                <h5>«FREE ALL BROTHERS THAT GOT BAGGED»</h5>
                <p className={styles.price}>7000 ₽</p>
            </div>
            <div className={styles.actions_container}>
                <Button
                    label="Learn more"
                    secondary
                    className={styles.btn}
                />
                <Button
                    label="Buy now"
                    className={styles.btn}
                />
            </div>
        </div>
    );
}
