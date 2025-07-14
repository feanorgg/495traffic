import styles from "@/components/ProductCard.module.scss";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/Product";
import { TranslationValues } from "next-intl";
import withCDNPrefix from "@/functions/withCdnPrefix";

export default function ProductCard({product, t}: {product: Product, t: (key: string, values?: Record<string, any>) => string}) {
    /*const product = {
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
    };*/

    const [imageIndex, setImageIndex] = useState<number>(0);

    const cardRef = useRef<HTMLAnchorElement | null>(null);
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

        const handleMouseLeave = () => {
            setImageIndex(0);
        };

        const cardElement = cardRef.current as HTMLElement;
        if(window.innerWidth >= 1000) {
            cardElement.addEventListener("mousemove", handleMouseMove);
            cardElement.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            cardElement.removeEventListener("mousemove", handleMouseMove);
            cardElement.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    function inStock() {
        for(const av of product.availability) {
            if(av.amount > 0) {
                return true;
            }
        }
        return false;
    }

    return(
        <Link href={`/product/${product.alias}`} style={{textDecoration: 'none', color: 'inherit'}} className={styles.ProductCard} ref={cardRef}>
            <div className={styles.img_container}>
                {product.images.map((image, index) => {
                    return(
                        <img 
                            src={withCDNPrefix(image.min)}
                            key={index}
                            alt={`product_img_${index}`}
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
                <p className={styles.category}>{t(product.categories[0].name)}</p>
                <h5>{product.name}</h5>
                <p className={styles.price}>{inStock() ? `${product.availability[0].prices[0].value} ₽` : 'SOLD OUT'}</p>
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
        </Link>
    );
}
