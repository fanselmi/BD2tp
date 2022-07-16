import {
  DeleteCommand,
  DeleteCommandInput, GetCommand, GetCommandInput, PutCommand, PutCommandInput,
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
        userId: url.userId,
        id: url.id,
        original: url.original,
        expDate: url.expDate,
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

  async getUrlByUser (userId: string, id: string) {
    const getUserParams: GetCommandInput = {
      TableName: 'Urls',
      Key: {
        userId: userId,
        id: id,
      },
    };
    const command = new GetCommand(getUserParams);
    return await client.send(command);
  }

  async getUrlsByUser (userId) {
    const getUrlsParams: ScanCommandInput = {
      TableName: 'Urls',
      FilterExpression: 'userId = :userId AND id <> :info',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':info': 'INFO'
      }
    }
    const command = new ScanCommand(getUrlsParams);
    return await client.send(command);
  }

  async deleteUrl (userId: string, id: string) {
    const deleteUrlParams: DeleteCommandInput = {
      TableName: 'Urls',
      Key: {
        userId: userId,
        id: id
      }
    }
    const command = new DeleteCommand(deleteUrlParams);
    return await client.send(command);
  }
}