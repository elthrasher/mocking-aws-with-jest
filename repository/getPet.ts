import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const db = new DocumentClient();

interface Pet {
  legCount: number;
  likesIceCream: boolean;
  name: string;
}

export const getPet = async (tableName: string, petName: string): Promise<Pet> => {
  const response = await db.get({ TableName: tableName, Key: { PK: petName } }).promise();
  if (response.Item) {
    return <Pet>response.Item;
  } else {
    throw new Error(`Couldn't find ${petName}!`);
  }
};
