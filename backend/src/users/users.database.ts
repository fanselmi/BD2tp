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
        userId: user.userId,
        id: 'INFO',
        email: user.email,
        password: user.password,
        username: user.username
      }
    };
    const command = new PutCommand(putUserParams);
    return await client.send(command);
  };

  async getUserByEmail(email) {
    const getUsersParams: ScanCommandInput = {
      TableName: 'Urls',
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      }
    }
    const command = new ScanCommand(getUsersParams);
    return await client.send(command);
  }
}