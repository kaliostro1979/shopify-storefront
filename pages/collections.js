import {client} from "../utils/shopify";
import {Card, Image} from "semantic-ui-react";
import Link from "next/link";

export default function Collections({ collections }) {

    return(
        <Card.Group>
            {
                collections.map((collection)=>{
                     return (
                         <Link href={`/collection/${collection.id}`} key={collection.id}>
                             <Card key={collection.id}>
                                 <Image src={collection.image ? collection.image.src : ''} wrapped ui={false} size='small'/>
                                 <Card.Content>
                                     <Card.Header>
                                         {collection.title}
                                     </Card.Header>
                                 </Card.Content>
                             </Card>
                         </Link>
                     )
                })
            }
        </Card.Group>
    )
}


export async function getServerSideProps() {
    const collections = await client.collection.fetchAllWithProducts()
    return { props: { collections: JSON.parse(JSON.stringify(collections)) } }
}