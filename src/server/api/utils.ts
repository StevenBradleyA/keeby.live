import { S3 } from "aws-sdk";
import { env } from "~/env.mjs";

interface AccessTokenResponse {
    access_token: string;
}
interface PayPalUserInfo {
    email: string;
}

const BUCKET_NAME = env.NEXT_PUBLIC_BUCKET_NAME;

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

const PAYPAL_SECRET = env.PAYPAL_SECRET;
const PAYPAL_CLIENT_ID = env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

const exchangeAuthCodeForAccessToken = async (
    authCode: string
): Promise<string> => {
    const response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
    // const response = await fetch("https://api.paypal.com/v1/oauth2/token", {

        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString(
                    "base64"
                ),
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code: authCode,
            redirect_uri: "https://www.keeby.live/verify-seller",
        }).toString(),
    });

    if (!response.ok) {
        throw new Error("Failed to exchange auth code for access token");
    }
    const data = (await response.json()) as AccessTokenResponse;
    return data.access_token;
};

const retrieveUserInfo = async (accessToken: string): Promise<string> => {
    // "https://api.paypal.com/v1/identity/oauth2/userinfo?schema=paypalv1.1",
    const response = await fetch(
        "https://api-m.sandbox.paypal.com/v1/identity/oauth2/userinfo?schema=paypalv1.1",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to retrieve user information");
    }

    const userInfo = (await response.json()) as PayPalUserInfo;
    return userInfo.email;
};

export { removeFileFromS3, exchangeAuthCodeForAccessToken, retrieveUserInfo };
