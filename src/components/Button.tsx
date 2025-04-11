import styles from "@/components/Button.module.scss";

interface ButtonProps {
    label: string;

    active?: boolean;
    loading?: boolean;
    disabled?: boolean;

    secondary?: boolean;
    tertiary?: boolean;

    onClick?: () => void;
};

export default function Button({
    label,
    loading=false,
    disabled=false,
    secondary=false,
    tertiary=false,
    onClick=()=>{}
}: ButtonProps) {
    return(
        <button 
            className={`${styles.Button} ${loading ? styles.loading : ''} ${secondary ? styles.secondary : ''} ${tertiary ? styles.tertiary : ''}`}
            disabled={disabled}
            onClick={disabled ? () => {} : onClick}
        >
            <p>{(loading && !tertiary) ? "Loading..." : label}</p>
        </button>
    );
}
