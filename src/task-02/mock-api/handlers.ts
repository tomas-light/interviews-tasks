import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

faker.seed(1234);

export const handlers = [
  /** @example
   * {
   *   "users": [
   *     {
   *       "id": "397cc44c-fe58-4ab5-b880-ce5915ea6c59",
   *       "firstName": "Hudson",
   *       "lastName": "Considine",
   *       "sex": "male",
   *       "age": 48,
   *       "zodiac": "Aries"
   *     },
   *     {
   *       "id": "e7e020a9-8085-4819-b909-ecffc4973607",
   *       "firstName": "Bradford",
   *       "lastName": "Ritchie",
   *       "sex": "male",
   *       "age": 38,
   *       "zodiac": "Pisces"
   *     },
   *   ]
   * }
   * */
  http.get('https://api.example.com/users', () => {
    return HttpResponse.json({
      users: faker.helpers.multiple(
        () => ({
          id: faker.string.uuid(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          sex: faker.person.sex(),
          age: faker.number.int({ min: 18, max: 60 }),
          zodiac: faker.person.zodiacSign(),
        }),
        { count: 20 }
      ),
    });
  }),
];
