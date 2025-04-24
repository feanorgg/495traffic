import styles from "@/components/ProductCard.module.scss";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

export default function ProductCard() {
    const product = {
        images: [
            {
                min: '/495-product-img.webp',
                max: '/495-product-img.webp',
            },
            {
                min: '/495-product-img-2.webp',
                max: '/495-product-img-2.webp',
            },
            {
                min: '/495-product-img.webp',
                max: '/495-product-img.webp',
            }
        ]
    };

    const [imageIndex, setImageIndex] = useState<number>(0);

    const cardRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!cardRef.current) return;

            const card = cardRef.current as HTMLElement;
            const rect = card.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const width = rect.width;

            const newIndex = Math.floor((mouseX / width) * product.images.length);
            setImageIndex(Math.min(Math.max(newIndex, 0), product.images.length - 1));
        };

        const cardElement = cardRef.current as HTMLElement;
        if(window.innerWidth >= 1000) {
            cardElement.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            cardElement.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return(
        <div className={styles.ProductCard} ref={cardRef}>
            <div className={styles.img_container}>
                {product.images.map((image, index) => {
                    return(
                        <img 
                            src={image.min}
                            key={index}
                            style={imageIndex == index ? {opacity: 1} : {}}
                        />
                    );
                })}
                <div className={styles.indicators}>
                    {product.images.map((image, index) => {
                        return(
                            <div className={`${styles.indicator} ${imageIndex == index ? styles.active : ''}`} key={index}/>
                        );
                    })}
                </div>
            </div>
            <div className={styles.info_container}>
                <p className={styles.category}>Hoodie</p>
                <h5>«FREE ALL BROTHERS THAT GOT BAGGED»</h5>
                <p className={styles.price}>7000 ₽</p>
            </div>
            {/*<div className={styles.actions_container}>
                <Button
                    label="Learn more"
                    secondary
                    className={styles.btn}
                />
                <Button
                    label="Buy now"
                    className={styles.btn}
                />
            </div>*/}
        </div>
    );
}
