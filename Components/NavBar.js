import React, {useState} from "react";
import {Container, Menu, Segment, Visibility} from "semantic-ui-react";
import Router from "next/router";
import SideCartCheckbox from "./Checkbox";

const NavBar = ({visible, setVisible})=>{
    const [fixed, setFixed] = useState(false)
    const [activeItem, setActiveItem] = useState('home')

    const setActive = (e, name)=>{
        setActiveItem(name.name)
        Router.push('/' + name.name)
    }

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
                        <Menu.Item name='' link={true} active={ activeItem === ''} onClick={(e, name)=>setActive(e, name)}>
                            Home
                        </Menu.Item >
                        <Menu.Item name='about' link={true} active={ activeItem === 'about'} onClick={(e, name)=>setActive(e, name)}>
                           About Us
                        </Menu.Item>
                        <Menu.Item name='collections' link={true} active={ activeItem === 'collections'} onClick={(e, name)=>setActive(e, name)}>
                            Collection
                        </Menu.Item>

                        <Menu.Item position={'right'}>
                            <SideCartCheckbox visible={visible} setVisible={setVisible}/>
                        </Menu.Item>
                    </Container>
                </Menu>
            </Segment>
        </Visibility>
    )
}

export default NavBar