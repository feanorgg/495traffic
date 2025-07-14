import Button from "@/components/Button";
import DropdownPicker from "@/components/DropdownPicker";
import ContentService from "@/services/ContentService";
import styles from "@/styles/Archive.module.scss";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import ProgressiveImage from "@/components/ProgressiveImage";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import withCDNPrefix from "@/functions/withCDNPrefix";

export default function ArchivePage() {
    const t = useTranslations();

    const [imageSrc, setImageSrc] = useState<string>('');

    const [seasons, setSeasons] = useState<Array<string>>([]);
    const [selectedSeason, setSelectedSeason] = useState<string>("");
    const [seasonObjects, setSeasonObjects] = useState<Array<{title: string, images: Array<string>}>>([]);
    const [filteredSeasonObjects, setFilteredSeasonObjects] = useState<Array<{title: string, images: Array<string>}>>([]);
    const [filteredImages, setFilteredImages] = useState<Array<string>>([]);

    useEffect(() => {
        fetchContents();
    }, []);

    useEffect(() => {
        if(selectedSeason != "") {
            const _seasonObjects = [];
            let _images: Array<string> = [];
            for(const obj of seasonObjects) {
                if(obj.title == selectedSeason) {
                    _seasonObjects.push(obj);
                    _images = [..._images, ...obj.images];
                    break;
                }
            }
            if(_seasonObjects.length > 0) {
                setFilteredSeasonObjects(_seasonObjects);
                setFilteredImages(_images);
            } else {
                setFilteredSeasonObjects(seasonObjects);
                for (const obj of seasonObjects) {
                    _images = [..._images, ...obj.images];
                }
                setFilteredImages(_images);
            }
        } else {
            let _images: Array<string> = [];
            for (const obj of seasonObjects) {
                _images = [..._images, ...obj.images];
            }
            setFilteredImages(_images);
            setFilteredSeasonObjects(seasonObjects);
        }
    }, [seasonObjects, selectedSeason]);

    useEffect(() => {
        console.log(filteredImages);
    }, [filteredImages]);

    async function fetchContents() {
        const cg = await ContentService.getContentGroup("00000001");
        const _seasons: Array<string> = [];
        const _seasonObjects: Array<{title: string, images: Array<string>}> = [];
        let _seasonObject: {title: string, images: Array<string>} | null = null;
        for(const obj of cg.content_objects) {
            if(obj.type == 'text') {
                _seasons.push(obj.content);
                if(_seasonObject != null) {
                    _seasonObjects.push(_seasonObject);
                }
                _seasonObject = {
                    title: obj.content,
                    images: []
                };
            } else if(obj.type == 'image') {
                const _images = _seasonObject!.images;
                _images.push(obj.content);
                _seasonObject!.images = _images!;
            }
        }
        if(_seasonObject != null) {
            _seasonObjects.push(_seasonObject);
        }
        setSeasons(_seasons);
        setSeasonObjects(_seasonObjects);
    }

    function showPrevImage() {
        let objIndex = 0;
        for(const obj of filteredSeasonObjects) {
            const index = obj.images.indexOf(imageSrc);
            if(index != -1) {
                if(index > 0) {
                    setImageSrc(obj.images[index - 1]);
                } else {
                    if(objIndex > 0) {
                        setImageSrc(filteredSeasonObjects[objIndex - 1].images[filteredSeasonObjects[objIndex - 1].images.length - 1]);
                    } else {
                        setImageSrc(filteredSeasonObjects[filteredSeasonObjects.length - 1].images[filteredSeasonObjects[filteredSeasonObjects.length - 1].images.length - 1]);
                    }
                }
            }
            objIndex += 1;
        }
    }

    function showNextImage() {
        let objIndex = 0;
        for(const obj of filteredSeasonObjects) {
            const index = obj.images.indexOf(imageSrc);
            if(index != -1) {
                if(index < obj.images.length - 1) {
                    setImageSrc(obj.images[index + 1]);
                } else {
                    if(objIndex < filteredSeasonObjects.length - 1) {
                        setImageSrc(filteredSeasonObjects[objIndex + 1].images[0]);
                    } else {
                        setImageSrc(filteredSeasonObjects[0].images[0]);
                    }
                }
            }
            objIndex += 1;
        }
    }

    const swiperRef = useRef(null);

    return(
        <>
        <Head>
            <title>Archive - 495TRAFFIC</title>
            <meta name="description" content="Do Not Get Caught." />
            <meta property="og:title" content="Archive - 495TRAFFIC" />
            <meta property="og:description" content="Do Not Get Caught." /> 
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" /> 
        </Head>
        {imageSrc != "" &&
        <div className={styles.Archive__overlay_container}>
            <div className={styles.wrapper}>
                {window.innerWidth > 768 ? 
                <>
                <div className={styles.arrow_left} onClick={() => showPrevImage()}>
                    <img src="https://cdn2.495traffic.com/chevron-left-b.png" alt="left_arrow" />
                </div>
                <img className={styles.image} src={imageSrc} />
                <div className={styles.arrow_right} onClick={() => showNextImage()}>
                    <img src="https://cdn2.495traffic.com/chevron-right-b.png" alt="right_arrow" />
                </div>
                <div className={styles.close_button}>
                    <img src="https://cdn2.495traffic.com/archive-close.png" alt="close" onClick={() => setImageSrc('')} />
                </div>
                </>
                :
                <>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    onSwiper={(swiper) => (
                        // @ts-expect-error optional swiperRef
                        swiperRef.current = swiper
                    )}
                    initialSlide={filteredImages.indexOf(imageSrc)}
                    watchSlidesProgress
                    onScroll={(swiper) => {
                        swiper.update();
                    }}
                    direction='horizontal'
                    loop
                    className={styles.swiper}
                >
                    {filteredImages.map((image, index) => {
                        return(
                            <SwiperSlide key={index} className={styles.swiper_item}>
                                <img className={styles.image} src={image} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div className={styles.close_button}>
                    <img src="https://cdn2.495traffic.com/archive-close.png" alt="close" onClick={() => setImageSrc('')} />
                </div>
                </>
                }
            </div>
        </div>
        }
        <div className={styles.Archive_root}>
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <h1>ARCHIVE</h1>
                    <DropdownPicker
                        placeholder={t("Season")}
                        items={seasons}
                        onChange={setSelectedSeason}
                        value={selectedSeason}
                    />
                </div>

                {filteredSeasonObjects.map((obj, index) => {
                    return(
                        <>
                        <div className={styles.section_title} key={index*2}>
                            <h3>{obj.title}</h3>
                        </div>
                        <div className={styles.images_grid} key={index*2+1}>
                            {obj.images.map((image, _index) => {
                                return(
                                    <GalleryImage
                                        image={image} 
                                        index={index} 
                                        _index={_index} 
                                        setImageSrc={setImageSrc}
                                        key={`${index}_${_index}`}
                                    />
                                );
                            })}
                        </div>
                        </>
                    );
                })}

                <div className={styles.go_to_products}>
                    <Link href="/" style={{textDecoration: 'none'}}>
                        <Button
                            label={t("GO TO PRODUCTS")}
                        />
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}

function GalleryImage({
    image, 
    index, 
    _index, 
    setImageSrc
}: {image: string, index: number, _index: number, setImageSrc: (src: string) => void}) {
    const [wide, setWide] = useState<boolean>(false);

    /*return(
        <img 
            src={`${image.split('.jpg')[0]}_tn.jpg`} 
            alt={`archive_img_${index}_${_index}`} 
            onClick={() => setImageSrc(image)} key={_index}
            className={`${wide ? styles.wide : ''}`}
            onLoad={e => {
                const target = e.target as HTMLImageElement;
                if(target.naturalWidth / target.naturalHeight > 1) {
                    setWide(true);
                }
            }}
        />
    );*/

    return(
        <ProgressiveImage 
            placeholderSrc={withCDNPrefix(`${image.split('.jpg')[0]}_tn.jpg`)} 
            src={withCDNPrefix(image)}
            alt={`archive_img_${index}_${_index}`} 
            onClick={() => setImageSrc(image)} key={_index}
            className={`${wide ? styles.wide : ''}`}
            onLoad={(e: Event) => {
                const target = e.target as HTMLImageElement;
                if(target.naturalWidth / target.naturalHeight > 1) {
                    setWide(true);
                }
            }}
        />
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const locale = req.cookies.locale || 'ru';
    const messages = (await import(`../messages/${locale}.json`)).default;

    return {
        props: {
            messages,
            locale
        }
    };
};
