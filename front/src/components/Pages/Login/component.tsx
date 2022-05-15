import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { FC } from 'react';

import UserAPIService from '../../../services/users';
import { UserContext } from '../../../contextes/user';

import styles from './component.module.scss';

const ConnectionPanel: FC<{}> = function ConnectionPanel() {
  const [section, setSection] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);

  const user = useContext(UserContext);

  const { register, handleSubmit } = useForm();

  const handleLogin = ({ email, password }: any) => {
    UserAPIService.register({ email, password })
      .then(() => UserAPIService.getOne())
      .then(user.set)
      .catch((err: Error) => setError(err.message));
  };

  const handleSignup = (data: any) => {
    const body = data;

    if (body.password === body['repeat-password']) {
      delete body['repeat-password'];

      UserAPIService.createOne(body)
        .then(() => UserAPIService.register({ email: body.email, password: body.password }))
        .then(() => UserAPIService.getOne())
        .then(user.set)
        .catch((err: Error) => setError(err.message));
    } else setError('Passwords not match');
  };

  return (
    <section className={styles.background}>
      <div className={styles.panel}>

        {/* Panel nav */}
        <nav className={styles.switch}>
          <button className={section === 'login' ? styles.active : undefined} type="button" onClick={() => setSection('login')}>Login</button>
          <button className={section === 'signup' ? styles.active : undefined} type="button" onClick={() => setSection('signup')}>Signup</button>
        </nav>

        <div className={styles.forms}>

          {/* Error */}
          {error && <span className={styles.error}>{error}</span>}

          {section === 'login' && (
          <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
            <label className={styles.field} htmlFor="email">
              <span className={styles.label}>Email:</span>
              <input className={styles.input} type="email" {...register('email', { required: true })} />
            </label>

            <label className={styles.field} htmlFor="password">
              <span className={styles.label}>Password:</span>
              <input className={styles.input} type="password" {...register('password', { required: true })} />
            </label>

            <button className={styles.send} type="submit">Login</button>
          </form>
          )}

          {section === 'signup' && (
          <form className={styles.form} onSubmit={handleSubmit(handleSignup)}>
            <label className={styles.field} htmlFor="email">
              <span className={styles.label}>Email:</span>
              <input className={styles.input} type="email" {...register('email', { required: true })} />
            </label>

            <label className={styles.field} htmlFor="pseudo">
              <span className={styles.label}>Pseudo:</span>
              <input className={styles.input} type="text" {...register('pseudo', { required: true })} />
            </label>

            <label className={styles.field} htmlFor="password">
              <span className={styles.label}>Password:</span>
              <input className={styles.input} type="password" {...register('password', { required: true })} />
              <input className={styles.input} type="password" {...register('repeat-password', { required: true })} />
            </label>

            <button className={styles.send} type="submit">Signup</button>
          </form>
          )}

        </div>

      </div>
    </section>
  );
};

export default ConnectionPanel;
