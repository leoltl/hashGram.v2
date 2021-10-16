import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";
import uuid from "uuid";

const FIFTEEN_MINUTES = 15 * 60 * 1000;

class GCloudService {
  private BUCKET_NAME = process.env.GCLOUD_BUCKET_NAME || "hashGram-postImages";
  private SIGNED_URL_OPTION: GetSignedUrlConfig = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + FIFTEEN_MINUTES,
    virtualHostedStyle: true,
  };
  private postImageBucket = new Storage().bucket(this.BUCKET_NAME);

  async generateSignedUrl() {
    const fileId = uuid.v4();

    const [url] = await this.postImageBucket
      .file(fileId)
      .getSignedUrl(this.SIGNED_URL_OPTION);

    console.log(`The signed url for ${fileId} is ${url}.`);
    return url;
  }
}

export default GCloudService;
