import {
  DeleteCommand,
  DeleteCommandInput, PutCommand, PutCommandInput,
  QueryCommand,
  QueryCommandInput, ScanCommand,
  ScanCommandInput
} from "@aws-sdk/lib-dynamodb";
import client from "../db/client";
import { Url } from "./urls.model";

export class UrlsDatabase {
  async putUrl (url: Url) {
    const putUrlParams: PutCommandInput = {
      TableName: 'Urls',
      Item: {
        user_id: url.user_id,
        id: url.id,
        original: url.original,
        exp_date: url.exp_date,
        clicks: url.clicks
      }
    };
    const command = new PutCommand(putUrlParams);
    return await client.send(command);
  };

  async getUrlById (id: string) {
    const getUrlParams: QueryCommandInput = {
      TableName: 'Urls',
      IndexName: 'gsiIndex',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    }
    const command = new QueryCommand(getUrlParams);
    return await client.send(command);
  }

  async getUrls (user_id) {
    const getUrlsParams: ScanCommandInput = {
      TableName: 'Urls',
      FilterExpression: 'user_id = :user_id AND id <> :info',
      ExpressionAttributeValues: {
        ':user_id': user_id,
        ':info': 'INFO'
      }
    }
    const command = new ScanCommand(getUrlsParams);
    return await client.send(command);
  }

  async deleteUrl (user_id: string, id: string) {
    const deleteUrlParams: DeleteCommandInput = {
      TableName: 'Urls',
      Key: {
        user_id: user_id,
        id: id
      }
    }
    const command = new DeleteCommand(deleteUrlParams);
    return await client.send(command);
  }
}