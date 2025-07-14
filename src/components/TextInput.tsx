import styles from "@/components/TextInput.module.scss";
import { useMask } from "@react-input/mask";
import { useEffect, useRef, useState } from "react";

type CityObject = {
    // city_uuid: string;
    code: number;
    full_name: string;
    longitude: number;
    latitude: number;
};

interface TextInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onClickHint?: (h: string | CityObject) => void;
    errorMsg?: string;
    required?: boolean;
    phone?: boolean;
    onBlur?: () => void;
    disabled?: boolean;
    chevron?: boolean;
    secure?: boolean;
    multiline?: boolean;
    maxLength?: number;

    hints?: Array<string | CityObject>;
};

export default function TextInput({
    placeholder = "",
    value = "",
    onChangeText = (text: string) => {},
    onClickHint=()=>{},
    errorMsg = "",
    required = false,
    hints = [],
    phone=false,
    maxLength=255,
    onBlur=()=>{},
    disabled=false,
    chevron=false,
    secure=false,
    multiline=false
}: TextInputProps) {
    const [hintsShown, setHintsShown] = useState<boolean>(false);
    const boxRef = useRef<HTMLDivElement | null>(null);

    const phoneRef = useMask({
        mask: '+7 (___) ___-__-__',
        replacement: { _: /\d/ },
    });

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                setHintsShown(false);
                onBlur();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return(
        <div className={styles.TextInput} ref={boxRef}>
            {multiline ? 
            <textarea className={`${styles.input} ${errorMsg != "" ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
                value={value}
                onChange={e => onChangeText(e.target.value)}
                onClick={() => setHintsShown(true)}
                disabled={disabled}
                style={{resize: 'vertical', minHeight: '100px'}}
                maxLength={maxLength}
            />
            :
            <input className={`${styles.input} ${errorMsg != "" ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
                value={value}
                onChange={e => onChangeText(e.target.value)}
                onClick={() => setHintsShown(true)}
                ref={phone ? phoneRef : null}
                disabled={disabled}
                type={secure ? 'password' : 'text'}
                maxLength={maxLength}
            />}
            {value == "" && placeholder != "" && <p className={styles.placeholder}>{placeholder}{required ? <span>*</span> : ''}</p>}
            {errorMsg != "" && <p className={styles.err_msg}>{errorMsg}</p>}

            {hintsShown && hints.length > 0 && 
            <div className={styles.hints_container}>
                <div className={styles.scroll_container}>
                    <div className={styles.hints_wrapper}>
                    {hints.map((hint, index) => (
                        <div key={index} className={styles.hint} onClick={() => {
                            if(typeof(hint) == 'string') {
                                onChangeText(hint);
                                onClickHint(hint);
                            } else {
                                // onChangeText(hint.full_name);
                                onClickHint(hint);
                            }
                            setHintsShown(false);
                        }}>
                            <p>{typeof(hint) == 'string' ? hint : hint.full_name}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
