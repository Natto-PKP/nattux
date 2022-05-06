import { createContext } from 'react';

import type { Dispatch, SetStateAction } from 'react';
import type { User } from '../services/users';

export type UserContextInterface = User;
export const UserContext = createContext<{
  value: User | null,
  set: Dispatch<SetStateAction<User | null>>
}>({ value: null, set: () => null });
