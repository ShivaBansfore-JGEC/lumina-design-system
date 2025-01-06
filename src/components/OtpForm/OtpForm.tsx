


import React, { useEffect, useState, RefObject } from 'react';
import "./OtpForm.scss"
import { GENERAL_DATA_TYPES } from '../types/types';
interface otpFormProps {
    length: number
}

const OtpForm = (props: otpFormProps) => {
    const { length = 6 } = props;
    const otpRefs: RefObject<HTMLInputElement>[] = Array.from({ length }, () => React.createRef<HTMLInputElement>());
    const [otpInputs, setOtpInputs] = useState(() => {
        return Array(length).fill("");
    })

    const focusInput = (index: number) => {
        if (otpRefs[index] && otpRefs[index].current) {
            otpRefs[index]?.current?.focus();
        }
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: GENERAL_DATA_TYPES["NUMBER"]) => {
        if (index === 0 || (index > 0 && otpInputs[index - 1])) {
            const value = event.target.value;
            if (typeof (parseInt(value)) === 'number') {
                const updatedInput = [...otpInputs];
                updatedInput[index] = value;
                if (index < length && value)
                    focusInput(index + 1);
                setOtpInputs(updatedInput);

            }
        }
    }

    useEffect(() => {
        focusInput(0);
    }, [])

    return (
        <div className='otp-input-container'>
            {otpInputs.map((element, index) => (
                <input className='input-box' onChange={(event) => onInputChange(event, index)} key={index} ref={otpRefs[index]} value={element} />
            ))}
        </div>
    )
}

export default OtpForm