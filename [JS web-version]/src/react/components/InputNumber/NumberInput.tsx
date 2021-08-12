import React from "react";
import "./NumberInput.css";
import {engine} from "../../../index";

interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({value, onChange}) => {
    const handleOnChange = (e: any) => onChange(e.target.value)
    const current = engine.store.settings.targetTimeSpeed;

    const dividedBy10 = (e: any) => {
        onChange(current / 10);
    }

    const dividedBy2 = (e: any) => {
        onChange(current / 2);
    }

    const multiplyBy2 = (e: any) => {
        onChange(current * 2);
    }

    const multiplyBy10 = (e: any) => {
        onChange(current * 10);
    }

    return (
        <div className="NumberInput_container">
            <div className="NumberInput_buttons">
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
            <div className="NumberInput_input">
                <input type="text" value={value} onChange={handleOnChange}/>
            </div>
        </div>
    )
}
