import styles from "@/components/ColorPicker.module.scss";

interface SizePickerProps {
    label?: string;
    items?: Array<string>;
    disabledItems?: Array<string>;
    value?: string;
    onChange?: (v: string) => void;
    style?: React.CSSProperties;
    className?: string;
};

const colorMap: any = {
    'red': '#CD0017',
    'black': '#0B0B0B'
};

export default function ColorPicker({
    label="Color",
    items=["red", "black"],
    disabledItems=[],
    value="",
    onChange=()=>{},
    style={},
    className=""
}: SizePickerProps) {

    return(
        <div className={`${styles.ColorPicker} ${className}`}>
            <p className={styles.label}>{label}</p>
            <div className={styles.options_wrapper}>
                {items.map((item, index) => {
                    return(
                        <div 
                            className={`${styles.size_item} ${value == item ? styles.active : ''}`} 
                            key={index} 
                            onClick={() => onChange(item)}
                            style={colorMap[item] ? {backgroundColor: colorMap[item], borderColor: colorMap[item]} : {}}
                        />
                    );
                })}
            </div>
        </div>
    );
}
