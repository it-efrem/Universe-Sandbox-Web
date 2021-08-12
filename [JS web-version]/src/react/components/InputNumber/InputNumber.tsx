import React from "react";
import "./InputNumber.css";

interface InputNumberProps {
    value: number;
    onChange: (value: number) => void;
}

export const InputNumber: React.FC<InputNumberProps> = ({value, onChange}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const currentValue = parseFloat(inputRef?.current?.value || '1');

    const handleOnChange = (e: any) => onChange(parseFloat(e.target.value))

    const dividedBy10 = (e: any) => {
        onChange(currentValue / 10);
    }

    const dividedBy2 = (e: any) => {
        onChange(currentValue / 2);
    }

    const multiplyBy2 = (e: any) => {
        onChange(currentValue * 2);
    }

    const multiplyBy10 = (e: any) => {
        onChange(currentValue * 10);
    }

    return (
        <div className="InputNumber_container">
            <div className="InputNumber_buttons">
                <button onClick={dividedBy10}>
                    x0.1
                </button>
                <button onClick={dividedBy2}>
                    x0.5
                </button>
                <button onClick={multiplyBy2}>
                    x2
                </button>
                <button onClick={multiplyBy10}>
                    x10
                </button>
            </div>
            <div className="InputNumber_input">
                <input ref={inputRef} type="text" value={value} onChange={handleOnChange}/>
            </div>
        </div>
    )
}
