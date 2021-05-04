/*import { useRouter } from 'next/router'*/
import {useState} from 'react'
import {client} from "../../utils/shopify";
import {Grid, Image, Input, List} from "semantic-ui-react";

const Product = ({product}) => {
    const [image, setImage] = useState(product.images[0])
    const [quantity, setQuantity] = useState(0)


    const addToCard = async () => {
        const storage = window.localStorage
        let checkoutId = storage.getItem('checkoutId')
        if (!checkoutId) {
            const checkOut = await client.checkout.create()
            checkoutId = checkOut.id
            storage.setItem('checkoutId', checkoutId)
        }
        const cart = await client.checkout.addLineItems(checkoutId, [{
            variantId: product.variants[0].id,
            quantity: quantity
        }])

        storage.setItem('cart', JSON.stringify(cart))
    }


    return (
        <Grid container centered>
            <Grid.Row column='2'>
                <Grid.Column width={10}>
                    <Grid.Row>
                        <Image src={image.src} wrapped ui={false}/>
                    </Grid.Row>
                    <Grid.Row>
                        <List horizontal divided>
                            {
                                product.images.map((image) => {
                                    return (
                                        <List.Item key={Math.random()} onClick={() => setImage(image)}>
                                            <Image src={image.src} wrapped ui={false} size='small'/>
                                        </List.Item>
                                    )
                                })
                            }
                        </List>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={6} style={{marginTop: 50}}>
                    <Input
                        action={{
                            color: 'teal',
                            labelPosition: 'left',
                            icon: 'cart',
                            content: 'Checkout',
                            onClick: addToCard,
                        }}
                        onChange = {(e, {value})=>setQuantity(Number(value))}
                        type='number'
                        actionPosition='left'
                        placeholder='Search...'
                        defaultValue='52.03'
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export async function getServerSideProps({query}) {
    const prodId = query.id
    const product = await client.product.fetch(prodId)
    return {props: {product: JSON.parse(JSON.stringify(product))}}
}


export default Product