import Button from "@/components/Button";
import DropdownPicker from "@/components/DropdownPicker";
import styles from "@/styles/Archive.module.scss";
import Link from "next/link";
import { useState } from "react";

export default function ArchivePage() {
    const [imageSrc, setImageSrc] = useState<string>('');

    return(
        <>
        {imageSrc != "" &&
        <div className={styles.Archive__overlay_container}>
            <div className={styles.wrapper}>
                <div className={styles.arrow_left}>
                    <img src="/chevron-left-b.png" alt="left_arrow" />
                </div>
                <img className={styles.image} src={imageSrc} />
                <div className={styles.arrow_right}>
                    <img src="/chevron-right-b.png" alt="right_arrow" />
                </div>
                <div className={styles.close_button}>
                    <img src="/archive-close.png" alt="close" onClick={() => setImageSrc('')} />
                </div>
            </div>
        </div>
        }
        <div className={styles.Archive_root}>
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <h1>ARCHIVE</h1>
                    <DropdownPicker
                        placeholder="Season"
                        items={['Spring-Summer 2024', 'Winter 2023']}
                    />
                </div>

                <div className={styles.section_title}>
                    <h3>Spring-Summer 2024</h3>
                </div>
                <div className={styles.images_grid}>
                    <img src="/archive-img-1.webp" alt="archive_img_1" onClick={() => setImageSrc('/archive-img-1.webp')} />
                    <img src="/archive-img-1.webp" alt="archive_img_2" />
                    <img src="/archive-img-1.webp" alt="archive_img_3" />
                    <img src="/archive-img-1.webp" alt="archive_img_4" />
                    <img src="/archive-img-1.webp" alt="archive_img_5" />
                    <img src="/archive-img-1.webp" alt="archive_img_6" />
                </div>

                <div className={styles.section_title}>
                    <h3>Winter 2023</h3>
                </div>
                <div className={styles.images_grid}>
                    <img src="/archive-img-1.webp" alt="archive_img_7" />
                    <img src="/archive-img-1.webp" alt="archive_img_8" />
                    <img src="/archive-img-1.webp" alt="archive_img_9" />
                    <img src="/archive-img-1.webp" alt="archive_img_10" />
                    <img src="/archive-img-1.webp" alt="archive_img_11" />
                    <img src="/archive-img-1.webp" alt="archive_img_12" />
                    <img src="/archive-img-1.webp" alt="archive_img_13" />
                    <img src="/archive-img-1.webp" alt="archive_img_14" />
                </div>

                <div className={styles.go_to_products}>
                    <Link href="/" style={{textDecoration: 'none'}}>
                        <Button
                            label="GO TO PRODUCTS"
                        />
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}
