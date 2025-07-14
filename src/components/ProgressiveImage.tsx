import { useState, useEffect, useRef } from "react";

const ProgressiveImage = ({ placeholderSrc, src, ...props }: any) => {
    /*const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
    const [loadedLog, setLoadedLog] = useState<Array<string>>([]);

    useEffect(() => {
        if(!loadedLog.includes(src)) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setImgSrc(src);
                setLoadedLog([...loadedLog, src]);
            };
        } else {
            setImgSrc(src);
        }
    }, [src]);

    useEffect(() => {
        if(!loadedLog.includes(src)) {
            const img = new Image();
            img.src = placeholderSrc;
            img.onload = () => {
                setImgSrc(placeholderSrc);
            };
        }
    }, [placeholderSrc]);

    return (
        <img
            {...{ src: imgSrc, ...props }}
            alt={props.alt || ""}
        />
    );*/

    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect(); // only load once
                    }
                });
            },
            {
                rootMargin: "200px", // preload a bit before it becomes visible
                threshold: 0.01,
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [src, placeholderSrc]);

    useEffect(() => {
        setImgSrc(placeholderSrc);
        setIsVisible(false);
        setIsLoaded(false);
    }, [placeholderSrc]);

    useEffect(() => {
        if (isVisible && !isLoaded) {
            const highResImg = new Image();
            highResImg.src = src;
            highResImg.onload = () => {
                setImgSrc(src);
                setIsLoaded(true);
            };
        }
    }, [isVisible, src, isLoaded, placeholderSrc]);

    return (
        <img
            ref={imgRef}
            src={imgSrc}
            alt={props.alt || ""}
            {...props}
        />
    );
};

export default ProgressiveImage;
