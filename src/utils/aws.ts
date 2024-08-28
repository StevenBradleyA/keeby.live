import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { PutObjectCommandOutput } from "@aws-sdk/client-s3";
import { env } from "~/env.mjs";

const BUCKET_NAME = env.NEXT_PUBLIC_BUCKET_NAME;

export const s3Client = new S3Client({
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
const uploadFileToS3 = async (base64Data: string | Buffer): Promise<string> => {
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

    const params = {
        Bucket: BUCKET_NAME,
        Key: uniqueFilename,
        Body: buffer,
        ContentType: contentType,
    };

    const command = new PutObjectCommand(params);

    try {
        const uploadResult: PutObjectCommandOutput =
            await s3Client.send(command);

        if (!uploadResult || !uploadResult.ETag) {
            throw new Error("Failed to upload file to S3");
        }

        const location = `https://s3.us-west-2.amazonaws.com/${BUCKET_NAME}/${uniqueFilename}`;

        return location;
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
    }
};

export { uploadFileToS3 };
