export const productSchema = {
    $schema: "http://json-schema.org/draft-06/schema#",
    title: "Product",
    type: "object",
    properties: {
        name: {
            decription: "Product name",
            type: "string"
        },
        image: {
            description: "Array of product images",
            type: "array"
        },
        brand: {
            description: "Product brand",
            type: "string"
        },
        description: {
            description: "Product description",
            type: "string"
        },
        url: {
            description: "Product URL",
            type: "string"
        },
        checkoutURL: {
            description: "Merchant API endpoint for validating orders",
            type: "string"
        },
        DIN: {
            description: "Product Decentralized Identification Number (DIN)",
            type: "string"
        },
        price: {
            description: "The price of the product, in wei",
            type: "string"
        },
        priceValidUntil: {
            description: "Expiration date, in Unix time",
            type: "string"
        },
        merchant: {
            description: "Merchant Ethereum address",
            type: "string"
        },
        affiliateReward: {
            description: "Affiliate reward, in Market Token base units",
            type: "string"
        },
        loyaltyReward: {
            description: "Loyalty reward, in loyalty token base units",
            type: "string"
        },
        loyaltyToken: {
            description: "Loyalty token address",
            type: "string"
        },
        ecSignature: {
            description:
                "Elliptic curve signature of DIN, price, priceValidUntil, merchant, affiliateReward, loyaltyReward, loyaltyToken",
            type: "object"
        }
    },
    required: [
        "name",
        "DIN",
        "price",
        "priceValidUntil",
        "merchant",
        "affiliateReward",
        "loyaltyReward",
        "loyaltyToken",
        "ecSignature"
    ]
};