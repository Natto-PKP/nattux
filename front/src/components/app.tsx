import { ReactElement, useEffect, useState } from 'react';

import { UserContext } from '../contextes/user';
import UserAPIService, { User } from '../services/users';
import ConnectionPanel from './ConnectionPanel/component';

export default function App(): ReactElement {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    UserAPIService.register().then(() => UserAPIService.getOne()).then(setUser).catch(() => {
      UserAPIService.disconnect();
      setUser(null);
    });
  }, []);

  return (
    <UserContext.Provider value={{ value: user, set: setUser }}>

      {user && <p />}

      {!user && <ConnectionPanel />}

    </UserContext.Provider>
  );
}
