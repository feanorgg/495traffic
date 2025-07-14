import styles from "@/components/Checkbox.module.scss";

interface CheckboxProps {
    checked?: boolean;
    label?: string;
    onChange?: (checked: boolean) => void;
    error?: boolean;
    children?: React.ReactElement;
};

export default function Checkbox({
    checked = false,
    label = "",
    onChange = () => {},
    error = false,
    children
}: CheckboxProps) {
    return(
        <div className={`${styles.Checkbox} ${error ? styles.error : ''}`} onClick={() => onChange(!checked)}>
            <div className={`${styles.check_frame} ${checked ? styles.checked : ''}`}>
                {checked && <img src="https://cdn2.495traffic.com/check.png" className={styles.check_img} />}
            </div>
            {label != "" && <p className={styles.label}>{label}</p>}
            {children}
        </div>
    );
}
