// src/docs/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Demo Wallet API",
      version: "1.0.0",
      description: "API documentation for the Demo Wallet application",
    },
    servers: [
      {
        url: "https://oladimeji-abdulrazaq-lendsqr-be-test.onrender.com:8080/api",
      },
    ],
    components: {
      schemas: {
        CreateUser: {
          type: "object",
          required: [
            "phone_number",
            "email",
            "name",
          ],
          properties: {
            phone_number: { type: "string" },
            name: { type: "string" },
            // bvn: { type: "string" },
            // bvn_phone_number: { type: "string" },
            // dob: { type: "string", format: "date" },
            email: { type: "string", format: "email" },
            // account_number: { type: "string" },
            // bank_code: { type: "string" },
            // state: { type: "string" },
            // lga: { type: "string" },
            // city: { type: "string" },
            // address: { type: "string" },
            // photo_url: { type: "string", format: "uri" },
            // documents: {
            //   type: "array",
            //   items: {
            //     type: "object",
            //     required: ["url", "type_id", "sub_type_id"],
            //     properties: {
            //       url: { type: "string", format: "uri" },
            //       type_id: { type: "integer" },
            //       sub_type_id: { type: "integer" },
            //     },
            //   },
            // },
          },
        },
        FundWallet: {
          type: "object",
          required: ["userId", "amount", "receiverAccount"],
          properties: {
            // userId: { type: "integer" },
            amount: { type: "number" },
            receiverAccount: { type: "string" },
          },
        },
        TransferWallet: {
          type: "object",
          required: ["senderId", "receiverId", "amount", "senderAccount", "receiverAccount"],
          properties: {
            senderId: { type: "integer" },
            receiverId: { type: "integer" },
            amount: { type: "number" },
            senderAccount: { type: "string" },
            receiverAccount: { type: "string" },
          },
        },
        WithdrawWallet: {
          type: "object",
          required: ["userId", "amount", "senderAccount"],
          properties: {
            // userId: { type: "integer" },
            amount: { type: "number" },
            senderAccount: { type: "string" },
          },
        },
      },
    },
  },
  apis: [__dirname + "/../../routes/*.ts"]
  // apis: ["../../routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
