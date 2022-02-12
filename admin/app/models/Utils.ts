// eslint-disable-next-line camelcase, no-undef
import HTTPResponse = GoogleAppsScript.URL_Fetch.HTTPResponse
import { S3 } from '../types/S3'

export class Utils {
  public static readonly PROPS: { [key: string]: string } = PropertiesService.getScriptProperties().getProperties()

  public static saveToS3 (objectName: string, object: object): void {
    S3.getInstance(this.PROPS.S3_ACCESS_KEY_ID, this.PROPS.S3_SECRET_ACCESS_KEY)
      .putObject(this.PROPS.S3_BUCKET_NAME, objectName, object)

    this.purgeCloudflareCache(`https://${this.PROPS.S3_BUCKET_NAME}/${objectName}`)
  }

  public static purgeCloudflareCache (targetUrl: string): void {
    const apiUrl: string = `https://api.cloudflare.com/client/v4/zones/${this.PROPS.CLOUDFLARE_ZONE_ID}/purge_cache`
    const options: object = {
      method: 'delete',
      contentType: 'application/json',
      headers: {
        'X-Auth-Key': this.PROPS.CLOUDFLARE_API_KEY,
        'X-Auth-Email': this.PROPS.CLOUDFLARE_EMAIL
      },
      payload: JSON.stringify({ files: [targetUrl] })
    }

    const response: HTTPResponse = UrlFetchApp.fetch(apiUrl, options)
    if (JSON.parse(response.getContentText()).success === false) {
      throw new Error(JSON.parse(response.getContentText()).message[0])
    }
  }

  public static stringToBoolean (value: string): boolean {
    return parseInt(value) > 0
  }
}
