import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { ReactElement } from 'react';

import UserAPIService from '../../services/users';
import { UserContext } from '../../contextes/user';

import styles from './component.module.scss';

export default function ConnectionPanel(): ReactElement {
  const [section, setSection] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();
  const user = useContext(UserContext);

  const handleLogin = (data: unknown) => {
    UserAPIService.register(data)
      .then(() => UserAPIService.getOne()).then((response) => {
        user.set(response);
      }).catch((err: Error) => setError(err.message));
  };

  const handleSignup = () => {

  };

  return (
    <main className={styles.background}>
      <div className={styles.panel}>

        {/* Panel nav */}
        <nav className={styles.switch}>
          <button className={section === 'login' ? styles.active : undefined} type="button" onClick={() => setSection('login')}>Login</button>
          <button className={section === 'signup' ? styles.active : undefined} type="button" onClick={() => setSection('signup')}>Signup</button>
        </nav>

        {/* Error */}
        {error && <span className={styles.error}>{error}</span>}

        {/* Login panel */}
        {section === 'login' && (
        <form onSubmit={handleSubmit(handleLogin)}>
          <label htmlFor="email">
            Email:
            <input type="email" {...register('email', { required: true })} />
          </label>

          <label htmlFor="password">
            Password:
            <input type="password" {...register('password', { required: true })} />
          </label>

          <button type="submit">Login</button>
        </form>
        )}

        {/* Signup panel */}
        {section === 'signup' && (
        <form onSubmit={handleSubmit(handleSignup)}>
          <label htmlFor="email">
            Email:
            <input type="email" {...register('email', { required: true })} />
          </label>

          <label htmlFor="pseudo">
            Pseudo:
            <input type="text" {...register('pseudo', { required: true })} />
          </label>

          <label htmlFor="password">
            Password:
            <input type="password" {...register('password', { required: true })} />
            <input type="password" {...register('password', { required: true })} />
          </label>

          <button type="submit">Signup</button>
        </form>
        )}

      </div>
    </main>
  );
}
