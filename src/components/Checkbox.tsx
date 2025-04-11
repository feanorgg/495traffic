import styles from "@/components/Checkbox.module.scss";

interface CheckboxProps {
    checked?: boolean;
    label?: string;
    onChange?: (checked: boolean) => void;
    error?: boolean;
};

export default function Checkbox({
    checked = false,
    label = "",
    onChange = () => {},
    error = false
}: CheckboxProps) {
    return(
        <div className={`${styles.Checkbox} ${error ? styles.error : ''}`} onClick={() => onChange(!checked)}>
            <div className={`${styles.check_frame} ${checked ? styles.checked : ''}`}>
                {checked && <img src="/check.png" className={styles.check_img} />}
            </div>
            {label != "" && <p className={styles.label}>{label}</p>}
        </div>
    );
}
