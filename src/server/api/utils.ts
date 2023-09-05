import { S3 } from "aws-sdk";
import { env } from "~/env.mjs";

// npm install aws-sdk
// $ npx aws-sdk-js-codemod -t v2-to-v3 PATH...

const BUCKET_NAME = env.NEXT_PUBLIC_BUCKET_NAME!;

export const s3 = new S3({
    region: env.NEXT_PUBLIC_REGION,
    credentials: {
        accessKeyId: env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
        secretAccessKey: env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
});

const removeFileFromS3 = (imageUrl: string): Promise<void> => {
    const key = imageUrl.split("/").pop()!;

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

export { removeFileFromS3 };
