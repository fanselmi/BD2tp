import { CreateTableCommand, CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import client from '../client';

const urlTableParams : CreateTableCommandInput = {
  TableName: 'Urls',
  KeySchema: [
    {AttributeName: 'user_id', KeyType: 'HASH'},
    {AttributeName: 'id', KeyType: 'RANGE'},
  ],
  AttributeDefinitions: [
    {AttributeName: 'user_id', AttributeType: 'N'},
    {AttributeName: 'id', AttributeType: 'S'},
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'gsiIndex',
      KeySchema: [
        {AttributeName: 'id', KeyType: 'HASH'},
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2,
      },
      Projection: {ProjectionType: 'ALL'},
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2,
  },
};

const command = new CreateTableCommand(urlTableParams);
client.send(command).then(r => {
  console.log(r);
}).catch((e) => {
  console.log('error', e);
});