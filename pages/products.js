import Link from "next/link";
import {Card, Image} from "semantic-ui-react";
import {client} from "../utils/shopify";

const Products = ({ products })=>{
    return(
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
    )
}

export default Products

export async function getServerSideProps() {
    const products = await client.product.fetchAll()

    return { props: { products: JSON.parse(JSON.stringify(products)) } }
}