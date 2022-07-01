import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { Url } from "../../urls/urls.model";
import client from "../client";

const putUrl = (url: Url) => {
  const putUrlParams: PutCommandInput = {
    TableName: 'Urls',
    Item: {
      user_id: url.user_id,
      id: url.id,
      original: url.original,
      exp_date: url.exp_date,
      clicks: 0
    }
  };
  const command = new PutCommand(putUrlParams);
  return client.send(command);
};

export default putUrl;