import { useEffect, useState } from 'react';

import type { FC } from 'react';

import { UserContext } from '../contextes/user';
import UserAPIService, { User } from '../services/users';

import LoginPage from './Pages/Login/component';
import Desktop from './Pages/Desktop/component';

import styles from './app.module.scss';

const App: FC<{}> = function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    UserAPIService.register().then(() => UserAPIService.getOne()).then(setUser).catch(() => {
      UserAPIService.disconnect();
      setUser(null);
    });
  }, []);

  return (
    <UserContext.Provider value={{ value: user, set: setUser }}>
      <main id={styles.main}>
        {/* Desktop page */}
        {user && <Desktop />}

        {/* Login page */}
        {!user && <LoginPage />}
      </main>
    </UserContext.Provider>
  );
};

export default App;
