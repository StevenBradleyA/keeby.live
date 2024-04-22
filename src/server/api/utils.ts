import { S3 } from "aws-sdk";
import { env } from "~/env.mjs";
import paypal from "@paypal/checkout-server-sdk";
import { z } from "zod";

const BUCKET_NAME = env.NEXT_PUBLIC_BUCKET_NAME;
const PAYPAL_CLIENT_ID = env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = env.PAYPAL_SECRET;
const base = "https://api-m.sandbox.paypal.com";

const PayPalTokenResponseSchema = z.object({
    scope: z.string(),
    access_token: z.string(),
    token_type: z.string(),
    app_id: z.string(),
    expires_in: z.number(),
    nonce: z.string(),
});
type PayPalTokenResponse = z.infer<typeof PayPalTokenResponseSchema>;

export const s3 = new S3({
    region: env.NEXT_PUBLIC_REGION,
    credentials: {
        accessKeyId: env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
});

const removeFileFromS3 = (imageUrl: string): Promise<void> => {
    const key = imageUrl.split("/").pop()!;
    // const key = imageUrl.split("/").pop()!;

    const params: S3.DeleteObjectRequest = {
        Bucket: BUCKET_NAME,
        Key: key,
    };

    return new Promise((resolve, reject) => {
        s3.deleteObject(params, (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const baseUrl = {
    sandbox: "https://api-m.sandbox.paypal.com",
};

const generateAccessToken = async () => {
    try {
        const auth = Buffer.from(
            `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
        ).toString("base64");
        const response = await fetch(`${baseUrl.sandbox}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch access token");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const jsonData = await response.json();
        const data = PayPalTokenResponseSchema.parse(jsonData);

        return {
            accessToken: data.access_token,
        };
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
};

// async function handleResponse(response) {
//     try {
//         const jsonResponse = await response.json();
//         return {
//             jsonResponse,
//             httpStatusCode: response.status,
//         };
//     } catch (err) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//     }
// }
async function handleResponse(response) {
    try {
        const jsonResponse = await response.json();
        // Extract the approval URL from the response
        const approvalUrl = jsonResponse.links?.find(
            (link) => link.rel === "approve"
        )?.href;

        return {
            jsonResponse,
            approvalUrl, // Add this line to return the approval URL
            httpStatusCode: response.status,
        };
    } catch (err) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}

const createOrder = async ({ price }: { price: string }) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: price,
                },
            },
        ],
    };
    if (accessToken) {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
            method: "POST",
            body: JSON.stringify(payload),
        });

        // return handleResponse(response);
        const orderResponse = await handleResponse(response);

        if (!orderResponse.approvalUrl) {
            throw new Error("Approval URL not found in PayPal response");
        }
        return orderResponse.approvalUrl;
    }
};

const captureOrder = async (orderID: string) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    if (accessToken) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
        });

        return handleResponse(response);
    }
};

export { removeFileFromS3, createOrder, captureOrder };
