import { useState, useEffect } from "react";

const ProgressiveImage = ({ placeholderSrc, src, ...props }: any) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
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
    );
};

export default ProgressiveImage;
