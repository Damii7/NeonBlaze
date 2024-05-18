const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");
const axios = require("axios");
const sha256 = require("sha256");

const MERCHANT_ID = "PGTESTPAYUAT";
const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
const SALT_INDEX = 1;
const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";

router.get("/", async (req, res) => {
  try {
    const merchantTransactionId = uniqid();
    const userId = 123;
    const payLoad = {
      merchantId: MERCHANT_ID,
      merchantTransactionId,
      merchantUserId: "MU933037302229373",
      amount: 100, // in paise
      redirectUrl: `http://localhost:3000/redirect-url/${merchantTransactionId}`,
      redirectMode: "REDIRECT",
      mobileNumber: "9999999999",
      deviceContext: {
        deviceOS: "ANDROID",
      },
      paymentInstrument: {
        type: "UPI_INTENT",
        targetApp: "com.phonepe.app",
      },
    };

    const base64EncodedPayload = Buffer.from(JSON.stringify(payLoad)).toString('base64');
    const concatenatedString = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
    const xverify = sha256(concatenatedString) + "###" + SALT_INDEX;

    const options = {
      method: 'post',
      url: `${PHONE_PE_HOST_URL}/pg/v1/pay`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        "X-VERIFY": xverify,
      },
      data: {
        request: base64EncodedPayload,
      },
    };
    // axios.post(
    //   'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
    //   requestBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': ,
    //       'X-VERIFY': xverify,
    //     }
    //   }
    // )
    const response = await axios.request(options);
    const url = response.data.data.instrumentResponse.redirecturl;
    res.send(url);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while processing the request.' });
  }
});
module.exports = router;