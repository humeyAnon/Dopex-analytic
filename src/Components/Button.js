import { useEffect } from "react";
import { SButton } from "./Styles/Button.styles";

const Button = (props) => {
    return (
        <SButton>
            {props.name}
        </SButton>
    )


}

export default Button;