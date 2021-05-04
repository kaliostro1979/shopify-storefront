import React, {useState} from "react";
import {Container, Menu, Segment, Visibility} from "semantic-ui-react";
import Link from "next/link";
import SideCartCheckbox from "./Checkbox";

const NavBar = ({visible, setVisible})=>{
    const [fixed, setFixed] = useState(false)

    return (
        <Visibility
            once={false}
            onBottomVisible={() => setFixed(true)}
            onBottomPassedReverse={() => setFixed(false)}
        >
            <Segment
                inverted
                textAlign = 'center'
                style={{minHeight: 50, padding: '1em 2em'}}
            >
                <Menu
                    fixed={fixed ? 'top' : null}
                    inverted={!fixed}
                    pointing={!fixed}
                    secondary={!fixed}
                    size='large'
                >
                    <Container>
                        <Menu.Item
                            active
                        >
                            <Link href='/'><a>Home</a></Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link href='/about'><a>About Us</a></Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link href='/collections'><a>Collection</a></Link>
                        </Menu.Item>

                        <Menu.Item>
                            <SideCartCheckbox visible={visible} setVisible={setVisible}/>
                        </Menu.Item>
                    </Container>
                </Menu>
            </Segment>
        </Visibility>
    )
}

export default NavBar