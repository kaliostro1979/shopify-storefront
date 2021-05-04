import {client} from "../../utils/shopify";
import {Card, Image} from "semantic-ui-react";
import Link from "next/link";



export default function Collection ({collection}){
    return(
        <>
            <h2>Collection: {collection.title}</h2>
            <Card.Group>
                {
                    collection.products.map((product)=>{
                        return(
                            <Link href={`/product/${product.id}`}>
                                <Card>
                                    <Image src={product.images[0].src}/>
                                    <Card.Content>
                                        {product.title}
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


export async function getServerSideProps({query}) {
    const collId = query.id
    const collection = await client.collection.fetchWithProducts(collId, {productsFirst: 10})
    return {props: {collection: JSON.parse(JSON.stringify(collection))}}
}