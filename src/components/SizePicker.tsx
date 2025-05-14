import styles from "@/components/SizePicker.module.scss";

interface SizePickerProps {
    label?: string;
    items?: Array<string>;
    disabledItems?: Array<string>;
    value?: string;
    onChange?: (v: string) => void;
};

export default function SizePicker({
    label="Size",
    items=["S", "M", "L", "XL"],
    disabledItems=[],
    value="",
    onChange=()=>{}
}: SizePickerProps) {
    return(
        <div className={styles.SizePicker}>
            <p className={styles.label}>{label}</p>
            <div className={styles.options_wrapper}>
                {items.map((item, index) => {
                    return(
                        <div 
                            className={`${styles.size_item} ${value == item ? styles.active : ''}`} 
                            key={index} 
                            style={index == items.length - 1 ? {border: 'none'} : {}}
                            onClick={() => onChange(item)}
                        >
                            <p>{item}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
