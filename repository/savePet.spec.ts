import { DocumentClient } from '../__mocks__/aws-sdk/clients/dynamodb';
import { savePet } from './savePet';

const db = new DocumentClient();

describe('savePet method', () => {
  test('Save Fluffy', async () => {
    const fluffy = { legCount: 4, likesIceCream: true, name: 'Fluffy', PK: 'Fluffy' };
    await savePet('Pets', fluffy);
    expect(db.put).toHaveBeenCalledWith({ TableName: 'Pets', Item: fluffy });
  });
});
