import {useState} from 'react'
import {client} from "../../utils/shopify";
import {Button, Grid, Image, Input, List, Select} from "semantic-ui-react";
import Cart, {getAllItems} from "../../Components/Cart";

const Product = ({product}) => {
    const [image, setImage] = useState(product.images[0])
    const [quantity, setQuantity] = useState(1)
    const [variant, setVariant] = useState(product.variants[0])



    const [price, setPrice] = useState(product.variants[0].price)

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
            if(variant.title === targetValue){
                setPrice(variant.price)
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

    return (
        <Grid container centered>
            <Grid.Row column='2'>
                <Grid.Column width={10}>
                    <Grid.Row>
                        <Image src={image.src} fluid/>
                    </Grid.Row>
                    <Grid.Row>
                        <List horizontal divided>
                            {
                                product.images.map((image) => {
                                    return (
                                        <List.Item key={Math.random()} onClick={() => setImage(image)}>
                                            <Image src={image.src} size='small'/>
                                        </List.Item>
                                    )
                                })
                            }
                        </List>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={6} style={{marginTop: 50}}>
                    <h3>{product.title}</h3>
                    <h5>{product.vendor}</h5>
                    <Select placeholder='Select your variant' options={variantOptions} onChange={handleChange}/>
                    <p>{price}</p>
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
        </Grid>
    )
}

export async function getServerSideProps({query}) {
    const prodId = query.id
    const product = await client.product.fetch(prodId)
    return {
        props: {product: JSON.parse(JSON.stringify(product))}
    }
}


export default Product