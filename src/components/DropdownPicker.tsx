import styles from "@/components/DropdownPicker.module.scss";
import { useEffect, useRef, useState } from "react";

interface DropdownPickerProps {
    placeholder: string;
    items: Array<string>;
    value?: string;
    onChange?: (text: string) => void;
};

export default function DropdownPicker({
    placeholder,
    items,
    value="",
    onChange=()=>{}
}: DropdownPickerProps) {
    const [state, setState] = useState<boolean>(false);
    const boxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                setState(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return(
        <div className={styles.DropdownPicker} ref={boxRef}>
            <div className={styles.container} onClick={() => setState(!state)}>
                <p className={`${styles.label} ${state ? styles.active : ''}`}>{value == "" ? placeholder : value}</p>
                <img alt="chevron" src={state ? '/arrow-up.png' : '/arrow-down.png'} />
            </div>
            {state &&
            <div className={styles.items_frame}>
                <div className={styles.items_wrapper}>
                    {items.map((item, index) => {
                        return(
                            <div className={styles.item} key={index} onClick={() => {onChange(item); setState(false);}}>
                                <p className={styles.item_title}>{item}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            }
        </div>
    );
}