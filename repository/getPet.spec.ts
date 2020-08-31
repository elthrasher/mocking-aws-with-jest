import { DocumentClient, awsSdkPromiseResponse } from '../__mocks__/aws-sdk/clients/dynamodb';
import { getPet } from './getPet';

const db = new DocumentClient();

describe('getPet method', () => {
  test('Save Fluffy', async () => {
    const fluffy = { legCount: 4, likesIceCream: true, name: 'Fluffy', PK: 'Fluffy' };
    awsSdkPromiseResponse.mockReturnValueOnce({ Item: fluffy });
    const pet = await getPet('Pets', 'Fluffy');
    expect(db.get).toHaveBeenCalledWith({ TableName: 'Pets', Key: { PK: 'Fluffy' } });
    expect(pet).toEqual(fluffy);
  });
  test(`Can't find Rover`, async () => {
    expect.assertions(1);
    try {
      await getPet('Pets', 'Rover');
    } catch (e) {
      expect(e.message).toBe(`Couldn't find Rover!`);
    }
  });
  test(`DynamoDB doesn't work`, async () => {
    awsSdkPromiseResponse.mockReturnValueOnce(Promise.reject(new Error('some error')));
    expect.assertions(1);
    try {
      await getPet('Pets', 'Rover');
    } catch (e) {
      expect(e.message).toBe(`some error`);
    }
  });
});
