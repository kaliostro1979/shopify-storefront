/*import { useRouter } from 'next/router'*/
import {client} from "../../utils/shopify";

const Product = ({ product }) => {

/*    const router = useRouter()
    const { id } = router.query*/

    return <p>Product: {product.title}</p>
}

export async function getServerSideProps({ query }) {
    const prodId = query.id
    const product = await client.product.fetch(prodId)
    return { props: { product: JSON.parse(JSON.stringify(product)) } }
}


export default Product