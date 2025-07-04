import Button from "@/components/Button";
import DropdownPicker from "@/components/DropdownPicker";
import ContentService from "@/services/ContentService";
import styles from "@/styles/Archive.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ArchivePage() {
    const [imageSrc, setImageSrc] = useState<string>('');

    const [seasons, setSeasons] = useState<Array<string>>([]);
    const [selectedSeason, setSelectedSeason] = useState<string>("");
    const [seasonObjects, setSeasonObjects] = useState<Array<{title: string, images: Array<string>}>>([]);
    const [filteredSeasonObjects, setFilteredSeasonObjects] = useState<Array<{title: string, images: Array<string>}>>([]);

    useEffect(() => {
        fetchContents();
    }, []);

    useEffect(() => {
        if(selectedSeason != "") {
            const _seasonObjects = [];
            for(const obj of seasonObjects) {
                if(obj.title == selectedSeason) {
                    _seasonObjects.push(obj);
                    break;
                }
            }
            if(_seasonObjects.length > 0) {
                setFilteredSeasonObjects(_seasonObjects);
            } else {
                setFilteredSeasonObjects(seasonObjects);
            }
        } else {
            setFilteredSeasonObjects(seasonObjects);
        }
    }, [seasonObjects, selectedSeason]);

    async function fetchContents() {
        const cg = await ContentService.getContentGroup("00000001");
        const _seasons: Array<string> = [];
        console.log(cg);
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
            let index = obj.images.indexOf(imageSrc);
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
            let index = obj.images.indexOf(imageSrc);
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

    return(
        <>
        {imageSrc != "" &&
        <div className={styles.Archive__overlay_container}>
            <div className={styles.wrapper}>
                <div className={styles.arrow_left} onClick={() => showPrevImage()}>
                    <img src="/chevron-left-b.png" alt="left_arrow" />
                </div>
                <img className={styles.image} src={imageSrc} />
                <div className={styles.arrow_right} onClick={() => showNextImage()}>
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
                                    <img src={image} alt={`archive_img_${index}_${_index}`} onClick={() => setImageSrc(image)} key={_index} />
                                );
                            })}
                        </div>
                        </>
                    );
                })}

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
