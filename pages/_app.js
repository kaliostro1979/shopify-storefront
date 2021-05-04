import React, {useState, useEffect} from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Grid, Menu, Sidebar, Segment } from 'semantic-ui-react'
import Cart from "../Components/Cart"
import NavBar from "../Components/NavBar"



function MyApp({Component, pageProps}) {

    const [visible, setVisible] = useState(false)

    return (
        <>
            <Grid columns={1}>
                <Grid.Column>
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar
                            as={Menu}
                            animation='push'
                            icon='labeled'
                            onHide={() => setVisible(false)}
                            vertical
                            visible={visible}
                            width='thin'
                            direction={'right'}
                        >
                            <Cart/>
                        </Sidebar>

                        <Sidebar.Pusher dimmed={visible}>
                            <Segment basic>
                                <NavBar visible={visible} setVisible={setVisible}/>
                                <Component {...pageProps} />
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default MyApp