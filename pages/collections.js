import {client} from "../utils/shopify";
import {Card, Image} from "semantic-ui-react";

export default function Collections({ collections }) {
    console.log(collections);
    return(
        <Card.Group>
            {
                collections.map((collection)=>{
                     return (
                         <Card key={collection.id}>
                             <Image src={collection.image ? collection.image.src : ''} wrapped ui={false} size='small' key={Math.random()}/>
                             <Card.Content>
                                 <Card.Header>
                                     {collection.title}
                                 </Card.Header>
                             </Card.Content>
                         </Card>
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