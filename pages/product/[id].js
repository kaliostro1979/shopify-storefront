import {useState} from 'react'
import {client} from "../../utils/shopify";
import {Button, Grid, Image, Input, List, Select} from "semantic-ui-react";
import RecommendedProducts from "../../Components/RecommendedProducts";
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs, Zoom} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs, Zoom]);

const Product = ({product, collections}) => {
    const [quantity, setQuantity] = useState(1)
    const [variant, setVariant] = useState(product.variants[0])
    const [thumbsSwiper, setThumbsSwiper] = useState(null);


    const variantOptions = product.variants.map((variant) => {
        return {
            key: variant.title,
            value: variant.title,
            text: variant.title
        }
    })

    const handleChange = (event, data) => {
        const targetValue = data.value
        setVariant(targetValue)
        product.variants.forEach(variant => {
            if (variant.title === targetValue) {
                setVariant(variant)
            }
        });
    }

    const addToCard = async () => {
        const storage = window.localStorage
        let checkoutId = storage.getItem('checkoutId')
        if (!checkoutId) {
            const checkOut = await client.checkout.create()
            checkoutId = checkOut.id
            storage.setItem('checkoutId', checkoutId)
        }

        const cart = await client.checkout.addLineItems(checkoutId, [{
            variantId: variant.id,
            quantity: quantity
        }])

        storage.setItem('cart', JSON.stringify(cart))
    }

    const recommended = collections.map((col) => {
        return col.products.map((prod) => {
            if (prod.id === product.id) {
                return col.products
            }
        })
    })
    const a = []

    recommended.filter((rec) => {
        rec.filter((r) => {
            if (r) {
                a.push(r)
            }
        })
    })

    console.log(product);

    return (
        <Grid container centered>
            <Grid.Row column='2'>
                <Grid.Column width={10}>
                    <Grid.Row>
                        <Swiper
                            thumbs={{ swiper: thumbsSwiper }}
                            zoom
                        >
                            {
                                product.images.map((image)=>{
                                    return(
                                        <SwiperSlide key={image.id}>
                                            <Image src={image.src} fluid/>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </Grid.Row>
                    <Grid.Row>
                        <Swiper
                            id='thumbs'
                            onSwiper={setThumbsSwiper}
                            watchSlidesVisibility
                            watchSlidesProgress
                            spaceBetween={20}
                            slidesPerView={4}
                            navigation
                            zoom
                        >
                            <List horizontal divided>
                                {
                                    product.images.map((image) => {
                                        return (
                                            <SwiperSlide key={Math.random()}>
                                                <List.Item>
                                                    <Image src={image.src} size='small'/>
                                                </List.Item>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </List>
                        </Swiper>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={6} style={{marginTop: 50}}>
                    <h3>{product.title}</h3>
                    <h5>{product.vendor}</h5>
                    <Select placeholder='Select your variant' options={variantOptions} onChange={handleChange}/>
                    <div className="product-price">
                        <span>{variant.priceV2.amount} </span>
                        <span>{variant.priceV2.currencyCode} </span>
                        {
                            variant.compareAtPriceV2 ?
                                <span className='product-comparePrice'>
                                    {variant.compareAtPriceV2.amount}
                                    {variant.compareAtPriceV2.currencyCode}
                            </span> : ''
                        }
                    </div>
                    <div className="addToCardBtn">
                        <Input
                            action={{
                                color: 'red',
                                labelPosition: 'right',
                                icon: 'cart',
                                content: 'Add to Card',
                                onClick: addToCard,
                            }}
                            onChange={(e, {value}) => setQuantity(Number(value))}
                            type='number'
                            actionPosition='left'
                            placeholder='Search...'
                            defaultValue='1'
                        />
                    </div>
                    <p>{product.description}</p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    <RecommendedProducts recommended={a[0]}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}


export async function getServerSideProps({query}) {
    const prodId = query.id
    const product = await client.product.fetch(prodId)
    const collections = await client.collection.fetchAllWithProducts()
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            collections: JSON.parse(JSON.stringify(collections))
        }
    }
}


export default Product