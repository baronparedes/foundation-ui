import faker from 'faker';

import {AuthProfile, AuthResult, ProfileType, RecordStatus} from '../Api';

export function generateFakeProfile(type?: ProfileType): AuthProfile {
  return {
    name: faker.name.findName(),
    username: faker.random.words(1),
    id: faker.datatype.number(),
    email: faker.internet.email(),
    mobileNumber: faker.phone.phoneNumber(),
    status: faker.random.arrayElement<RecordStatus>(['active', 'inactive']),
    remarks: faker.random.words(),
    type:
      type ??
      faker.random.arrayElement<ProfileType>([
        'unit owner',
        'stakeholder',
        'admin',
      ]),
  };
}

export function generateFakeAuthResult(): AuthResult {
  return {
    profile: generateFakeProfile(),
    token: faker.random.alphaNumeric(100),
  };
}
