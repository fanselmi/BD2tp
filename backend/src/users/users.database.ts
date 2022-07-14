import {
  DeleteCommand,
  DeleteCommandInput, GetCommand, GetCommandInput,
  PutCommand,
  PutCommandInput, QueryCommand, QueryCommandInput,
  ScanCommand,
  ScanCommandInput
} from "@aws-sdk/lib-dynamodb";
import client from "../db/client";
import { User } from "./users.model";

export class UsersDatabase {
  async putUser (user: User) {
    const putUserParams: PutCommandInput = {
      TableName: 'Urls',
      Item: {
        user_id: user.user_id,
        id: 'INFO',
        email: user.email,
        password: user.password,
        username: user.username
      }
    };
    const command = new PutCommand(putUserParams);
    return await client.send(command);
  };

  async getUserById (user_id: string) {
    const getUserParams: GetCommandInput = {
      TableName: 'Urls',
      Key: {
        user_id: user_id,
        id: 'INFO',
      },
      ProjectionExpression: 'user_id, email, username'
    };
    const command = new GetCommand(getUserParams);
    return await client.send(command);
  }
}