import Client from 'shopify-buy';


const client = Client.buildClient({
    domain: 'mbc-abachyan.myshopify.com',
    storefrontAccessToken: '3d55e1a8965b5d4ffffea269c8cfc056'
});


export { client }