import { productSchema } from "../schemas/product_schema";
import { orderSchema } from "../schemas/order_schema";
import Ajv from "ajv";
var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

export const validateProduct = product => {
    var valid = ajv.validate(productSchema, product);
    if (!valid) console.log(ajv.errors);
    return valid;
};

export const validateOrder = order => {
    var valid = ajv.validate(orderSchema, order);
    if (!valid) console.log(ajv.errors);
    return valid;
}