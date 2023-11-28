import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import StorageService, { StoragePutOptions } from "./interfaces/storage";
import { mkdir } from "fs/promises";

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

export default class FileStorageService implements StorageService {

  constructor(private readonly basePath: string) {
    this.ensureDirectoryExists();
  }

  private async ensureDirectoryExists(): Promise<void> {
    try {
      await mkdir(this.basePath, { recursive: true });
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while creating the directory");
    }
  }

  public async put(buffer: Buffer, opts?: StoragePutOptions): Promise<string> {
    const randomString = randomBytes(8).toString("hex");
    let filename = opts?.filename
      ? `${Date.now()}-${opts.filename}`
      : `${Date.now()}-${randomString}.png`;

    const filePath = path.join(this.basePath, filename);

    try {
      await writeFile(filePath, buffer);
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while uploading a file");
    }

    return path.resolve(filePath);
  }

  public async get(url: string): Promise<Buffer> {
    try {
      const buffer = await readFile(url);

      return buffer;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while retrieving a file");
    }
  }

  public delete(url: string): Promise<void> {
    try {
      return fs.unlink.__promisify__(url);
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while deleting a file");
    }
  }
}
