import React, {useState} from "react";
import {Container, Image, Menu, Segment, Visibility} from "semantic-ui-react";
import Router from "next/router";
import SideCartCheckbox from "./Checkbox";

const NavBar = ({visible, setVisible})=>{
    const [activeItem, setActiveItem] = useState('home')

    const setActive = (e, name)=>{
        setActiveItem(name.name)
        Router.push('/' + name.name)
    }

    return (
                <Menu
                    size='large'
                >
                    <Container>
                        <Menu.Item name='' link={true} active={ activeItem === ''} onClick={(e, name)=>setActive(e, name)}>
                            <Image src={'/images/logo.png'} width={50}/>
                        </Menu.Item >

                        <Menu.Item name='' link={true} active={ activeItem === ''} onClick={(e, name)=>setActive(e, name)}>
                            Home
                        </Menu.Item >
                        <Menu.Item name='about' link={true} active={ activeItem === 'about'} onClick={(e, name)=>setActive(e, name)}>
                           About Us
                        </Menu.Item>
                        <Menu.Item name='collections' link={true} active={ activeItem === 'collections'} onClick={(e, name)=>setActive(e, name)}>
                            Collections
                        </Menu.Item>

                        <Menu.Item name='products' link={true} active={ activeItem === 'products'} onClick={(e, name)=>setActive(e, name)}>
                            Products
                        </Menu.Item>

                        <Menu.Item position={'right'}>
                            <SideCartCheckbox visible={visible} setVisible={setVisible}/>
                        </Menu.Item>
                    </Container>
                </Menu>
    )
}

export default NavBar