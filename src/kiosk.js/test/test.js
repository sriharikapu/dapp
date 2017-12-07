var Web3 = require("web3");
var Kiosk = require("../src/index.js");
var assert = require("assert");
var chai = require("chai"),
    expect = chai.expect,
    should = chai.should();
require("dotenv").config();

describe("test", () => {
    let web3;
    let kiosk;
    let buyer;
    let merchant;
    const merchantPrivateKey = "0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f";

    // Product
    const DIN = 1000000001;
    const quantity = 1;
    const price = 8000000;
    const priceValidUntil = 1514160000;
    const affiliateReward = 0;
    const loyaltyReward = 0;
    const loyaltyToken = "0x0000000000000000000000000000000000000000";

    // Order
    const orderID = 1;

    // Signature
    let signature;

    before(async () => {
        web3 = new Web3(
            new Web3.providers.HttpProvider("http://localhost:9545")
        );
        kiosk = new Kiosk(web3, "4447");

        const accounts = await web3.eth.getAccounts();
        buyer = accounts[0];
        merchant = accounts[1];
    });

    it("should return the correct owner of a DIN", async () => {
        const owner = await kiosk.owner(DIN);
        expect(owner).to.equal(merchant);
    });

    it("should get the product URL for a given DIN", async () => {
        const url = await kiosk.productURL(DIN);
        expect(url).to.equal("https://kiosk-shopify.herokuapp.com/products/");
    });

    it("should get the correct merchant for a given DIN", async () => {
        const merchantAccount = await kiosk.merchant(DIN);
        expect(merchantAccount).to.equal(merchant);
    });

    it("should sign a price message", async () => {
        signature = await kiosk.signPriceMessage(
            DIN,
            price,
            priceValidUntil,
            affiliateReward,
            loyaltyReward,
            loyaltyToken,
            merchantPrivateKey
        );
        expect(signature).to.exist;
    });

    it("should validate a signature", async () => {
        const hash = web3.utils.soliditySha3(
            DIN,
            price,
            priceValidUntil,
            affiliateReward,
            loyaltyReward,
            loyaltyToken
        );
        const valid = await kiosk.isValidSignature(
            merchant,
            hash,
            signature.v,
            signature.r,
            signature.s
        );
        expect(valid).to.equal(true);
    });
});