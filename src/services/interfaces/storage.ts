export type StoragePutOptions = {
  /** A filename with extension.
   * @default <random-string>.png
   */
  filename: string;
};

/**
 * The StorageService interface defines the methods that enable storage and retrieval of objects from
 * any storage service.
 */
export default interface StorageService {
  /**
   * This method is used to store an object in the storage service.
   * @returns A promise that resolves to the URL of the stored object.
   */
  put(buffer: Buffer, opts?: StoragePutOptions): Promise<string>;

  /**
   * This method is used to retrieve an object from the storage service.
   * @returns A promise that resolves to the object.
   */
  get(url: string): Promise<Buffer>;

  /**
   * This method is used to delete an object from the storage service.
   * @returns A promise that resolves to void.
   */
  delete(url: string): Promise<void>;
}
