import {useState, useEffect} from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Button, Container, Grid, Header, Image, Menu, Sidebar, Visibility, Segment} from 'semantic-ui-react'
import Link from "next/link";

const Navbar = () => {
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
                    </Container>
                </Menu>
            </Segment>
        </Visibility>
    )
}

function MyApp({Component, pageProps}) {
    return (
        <>
            <Navbar/>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp