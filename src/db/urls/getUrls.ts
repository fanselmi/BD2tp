import { ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import client from "../client";

const getUrls = async () => {
  const getUrlsParams: ScanCommandInput = {
    TableName: 'Urls',
  }
  const command = new ScanCommand(getUrlsParams);
  return await client.send(command);
}

export default getUrls;
