import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const db = new DocumentClient();

interface Pet {
  legCount: number;
  likesIceCream: boolean;
  name: string;
}

export const savePet = async (tableName: string, pet: Pet): Promise<void> => {
  await db
    .put({
      TableName: tableName,
      Item: {
        PK: pet.name,
        ...pet,
      },
    })
    .promise();
};
