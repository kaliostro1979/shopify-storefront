import Head from "next/head";
import {Button, Card, Header, Image} from "semantic-ui-react";
import { client } from "../utils/shopify";
import Link from "next/link";


export default function Home({ products }) {

    return (
        <>
            <Head>
                <title>Shopify with Next JS</title>
            </Head>
            <Button color='violet'>Violet</Button>
            <Card.Group itemsPerRow='3'>
                {
                    products.map((product)=>{
                        console.log(product);
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


