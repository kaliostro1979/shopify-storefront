import Head from "next/head";
import {Button, Card, Header, Image} from "semantic-ui-react";
import { client } from "../utils/shopify";
import Link from "next/link";
import SideCard from "../Components/SideCart";


export default function Home({ products }) {

    return (
        <>
            <Head>
                <title>Shopify with Next JS</title>
            </Head>

            <Card.Group itemsPerRow='4'>
                {
                    products.map((product)=>{
                        return(
                            <Link href={`/product/${product.id}`} key={product.id}>
                                <Card>
                                    <Image src={product.images[0].src} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{product.title}</Card.Header>
                                        <Card.Description>
                                            {product.description}
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Link>
                        )
                    })
                }
            </Card.Group>
        </>
    )
}

export async function getServerSideProps() {
    const products = await client.product.fetchAll()
   
    return { props: { products: JSON.parse(JSON.stringify(products)) } }
}


