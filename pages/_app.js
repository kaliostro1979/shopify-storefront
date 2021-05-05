import React, {useState, useEffect} from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Grid, Menu, Sidebar, Segment } from 'semantic-ui-react'
import Cart from "../Components/Cart"
import NavBar from "../Components/NavBar"
import {client} from "../utils/shopify";



function MyApp({Component, pageProps}) {

    const [visible, setVisible] = useState(false)
    const [allItems, setAllItems] = useState([])

    useEffect(async ()=>{
        const storage = window.localStorage
        let checkoutId = storage.getItem('checkoutId')
        if (!checkoutId) {
            const checkOut = await client.checkout.create()
            checkoutId = checkOut.id
            storage.setItem('checkoutId', checkoutId)
        }
        const itemsFromCheckout = await client.checkout.fetch(checkoutId)
        setAllItems(itemsFromCheckout.lineItems)
    },[visible])

    console.log(allItems);

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
                            width='wide'
                            direction={'right'}
                        >
                            <Cart allItems={allItems}/>
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