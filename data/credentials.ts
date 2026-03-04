export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countryValue: string; // select option value (id)
  zoneValue: string; // select option value (id)
  cityValue: string;
  addressValue: String;
  zip: string;
  userName: string;
}

// base template for registration; can be used as starting point
export const baseRegistration: Omit<RegistrationData, 'email' | 'userName' | 'password'> & {
  password: string;
} = {
  firstName: 'John',
  lastName: 'Doe',
  password: 'P@ssw0rd!',
  countryValue: '1', // country id from dropdown
  zoneValue: '1', // zone id from dropdown
  cityValue: 'SomeCity', // free text input
  addressValue: 'Somewhere',
  zip: '12345',
  // email and userName will be generated uniquely per test
};

/**
 * create a unique registration data object by appending a timestamp
 */
export function makeUniqueRegistration(): RegistrationData {
  const unique = Date.now();
  return {
    ...baseRegistration,
    email: `test${unique}@example.com`,
    userName: `user${unique}`,
    password: baseRegistration.password,
  } as RegistrationData;
}

