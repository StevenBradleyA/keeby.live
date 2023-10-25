import { S3 } from "aws-sdk";
import { env } from "~/env.mjs";

// npm install aws-sdk
// $ npx aws-sdk-js-codemod -t v2-to-v3 PATH...

const BUCKET_NAME = env.NEXT_PUBLIC_BUCKET_NAME;

export const s3 = new S3({
    region: env.NEXT_PUBLIC_REGION,
    credentials: {
        accessKeyId: env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
});

const getUniqueFilename = (filename: string): string => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 10);
    const ext = filename.split(".").pop()?.toLowerCase();
    return `${timestamp}-${randomString}.${ext || ""}`;
};

const uploadFileToS3 = async (
    base64Data: string | Buffer
    // acl = "public-read"
): Promise<string> => {
    const uniqueFilename = getUniqueFilename("image.jpg");

    const buffer = Buffer.isBuffer(base64Data)
        ? base64Data
        : Buffer.from(base64Data, "base64");

    const extension = uniqueFilename.split(".").pop()?.toLowerCase();
    const contentTypeMap: Record<string, string> = {
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        gif: "image/gif",
    };
    const defaultContentType = "application/octet-stream";
    let contentType = defaultContentType;
    if (extension) {
        contentType = contentTypeMap[extension] || defaultContentType;
    }

    const params: S3.PutObjectRequest = {
        Bucket: BUCKET_NAME,
        Key: uniqueFilename,
        Body: buffer,
        ContentType: contentType,
    };
    const uploadResult = await s3.upload(params).promise();

    if (!uploadResult || !uploadResult.Location) {
        throw new Error("Failed to upload file to S3");
    }

    return uploadResult.Location;
};

export { uploadFileToS3 };
