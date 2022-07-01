import { DeleteCommand, DeleteCommandInput } from "@aws-sdk/lib-dynamodb";
import client from "../client";

const deleteUrl = (user_id: number, id: string) => {
  const deleteUrlParams: DeleteCommandInput = {
    TableName: 'Urls',
    Key: {
      user_id: user_id,
      id: id
    }
  }

  const command = new DeleteCommand(deleteUrlParams);
  return client.send(command);
}

export default deleteUrl;