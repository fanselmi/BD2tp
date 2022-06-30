import { QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import client from "../client";

const getUrlById = async (id: string) => {
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

export default getUrlById;
