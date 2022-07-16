import { UpdateTimeToLiveCommand, UpdateTimeToLiveCommandInput } from "@aws-sdk/client-dynamodb";
import client from "./client";

const urlTTLTableParams : UpdateTimeToLiveCommandInput = {
  TableName: 'Urls',
  TimeToLiveSpecification: {
    Enabled: true,
    AttributeName: 'expDate'
  }
}

const ttlCommand = new UpdateTimeToLiveCommand(urlTTLTableParams);
client.send(ttlCommand).then(r => {
  console.log(r);
}).catch((e) => {
  console.log('error', e);
});