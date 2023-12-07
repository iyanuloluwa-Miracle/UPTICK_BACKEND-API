import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";
import StorageService, { StoragePutOptions } from "./interfaces/storage";

export default class S3StorageService implements StorageService {
  private s3Client: S3Client;
  awsConfig = {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string, // AWS Access Key ID
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string, // AWS Secret Access Key
    },
    region: process.env.AWS_REGION as string, // AWS Region
  };

  constructor(private readonly bucketName: string) {
    this.s3Client = new S3Client(this.awsConfig);
  }

  public async put(
    buffer: Buffer,
    opts?: StoragePutOptions | undefined
  ): Promise<string> {
    const randomString = randomBytes(8).toString("hex");
    const key = opts?.filename
      ? `${Date.now()}-${opts.filename}`
      : `${Date.now()}-${randomString}.png`;

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
      });
      await this.s3Client.send(command);
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while uploading a file");
    }

    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  public async get(url: string): Promise<Buffer> {
    const key = this.getKey(url);
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });
      const res = await this.s3Client.send(command);
      const body = await res.Body?.transformToByteArray();

      return body ? Buffer.from(body) : Buffer.from("");
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while retrieving a file");
    }
  }

  public async delete(url: string): Promise<void> {
    const key = this.getKey(url);
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });
      await this.s3Client.send(command);
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while deleting a file");
    }
  }

  private getKey(url: string) {
    return url.split("amazonaws.com/")[1];
  }
}
