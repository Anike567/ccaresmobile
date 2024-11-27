import React, { useRef, useState, useEffect} from "react";
import { OTPInputContainer, TextInputHidden } from "./styles";
import { SplitBoxes, SplitBoxText, SplitOTPBoxesContainer, SplitBoxesFocused } from "./styles";

const OTPInput = ({ code, setCode, maximumLength, setIsPinReady }) => {
    const boxArray = new Array(maximumLength).fill(0);
    const inputRef = useRef();

    useEffect(() => {
        // update pin ready status
        setIsPinReady(code.length === maximumLength);
        // clean up function
        return () => {
          setIsPinReady(false);
        };
      }, [code]);


    const boxDigit = (_, index) => {
        const emptyInput = "";
        const digit = code[index] || emptyInput;

        const isCurrentValue = index === code.length;
        const isLastValue = index === maximumLength - 1;
        const isCodeComplete = code.length === maximumLength;
        const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

        const StyledSplitBoxes = isInputBoxFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;
        return (
          <StyledSplitBoxes key={index}>
            <SplitBoxText>{digit}</SplitBoxText>
          </StyledSplitBoxes>
        );
      };

  

    const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

    const handleOnPress = () => {
        setIsInputBoxFocused(true);
        inputRef.current.focus();
    };

    const handleOnBlur = () => {
        setIsInputBoxFocused(false);
    };

    return (
        <OTPInputContainer>
            <SplitOTPBoxesContainer>
                {boxArray.map(boxDigit)}
            </SplitOTPBoxesContainer> 
            <TextInputHidden 
                value={code}
                onChangeText={setCode}
                maxLength={maximumLength}
                ref={inputRef}
                onBlur={handleOnBlur}
            />
        </OTPInputContainer>
    );
};


export default OTPInput;