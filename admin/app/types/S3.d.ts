export interface S3 {
  getInstance(accessKeyId: string, secretAccessKey: string): object

  putObject(bucket: string, objectName: string, options: object): void
}
