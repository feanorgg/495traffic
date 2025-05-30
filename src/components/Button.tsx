import styles from "@/components/Button.module.scss";

interface ButtonProps {
    label: string;

    active?: boolean;
    loading?: boolean;
    disabled?: boolean;

    secondary?: boolean;
    tertiary?: boolean;

    onClick?: () => void;

    className?: string;
    style?: React.CSSProperties;
};

export default function Button({
    label,
    loading=false,
    disabled=false,
    secondary=false,
    tertiary=false,
    onClick=()=>{},
    className="",
    style={}
}: ButtonProps) {
    return(
        <button 
            className={`${styles.Button} ${loading ? styles.loading : ''} ${secondary ? styles.secondary : ''} ${tertiary ? styles.tertiary : ''} ${className} ${disabled ? styles.disabled : ''}`}
            disabled={disabled}
            onClick={disabled ? () => {} : onClick}
            style={style}
        >
            <p>{(loading && !tertiary) ? "Loading..." : label}</p>
        </button>
    );
}
