import React, {useState, useEffect} from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Grid, Menu, Sidebar, Segment} from 'semantic-ui-react'
import Cart from "../Components/Cart"
import NavBar from "../Components/NavBar"
import '../styles/style.scss'
import 'swiper/swiper.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import Head from "next/head";
import {currencies} from "../utils/currencies";
import {Provider, useDispatch, useSelector} from "react-redux";
import {createWrapper} from 'next-redux-wrapper'
import store from '../redux/store'
import {checkoutIdCreator} from "../redux/actions/createCheckoutIdAction";





function MyApp({Component, pageProps}) {

    const [visible, setVisible] = useState(false)
    const [currencySymbol, setCurrencySymbol] = useState('')

    const dispatch = useDispatch()
    const state = useSelector(state=>state.cart)

    useEffect(async () => {
        dispatch(checkoutIdCreator())

        currencies.forEach((currency)=>{
            if (state.totalPriceV2 && state.totalPriceV2.currencyCode === currency.name){
                setCurrencySymbol(currency.symbol)
            }
        })
    }, [])


    return (
        <>
            <Head>
                <title>Shopify Store with Next JS</title>
            </Head>

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
                            className={'side-cart__main'}
                        >
                            <Cart currencySymbol={currencySymbol}/>
                        </Sidebar>

                        <Sidebar.Pusher dimmed={visible}>
                            <Segment basic>
                                <Provider store={store}>
                                    <NavBar visible={visible} setVisible={setVisible}/>
                                    <Component {...pageProps} />
                                </Provider>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </Grid.Column>
            </Grid>
        </>
    )
}

const makeStore = ()=>store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)
