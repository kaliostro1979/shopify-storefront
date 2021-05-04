import {Button, Checkbox} from "semantic-ui-react";

export default function SideCartCheckbox({ setVisible }) {


    return (
           <Button onClick={()=>{setVisible(true)}}>
               Open Cart
           </Button>
    )
}