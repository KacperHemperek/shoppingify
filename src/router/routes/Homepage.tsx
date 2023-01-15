import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import Loadingpage from './Loadingpage';

function Homepage() {
  const { user, loading, error } = useUser();

  if (loading) {
    return <Loadingpage />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return (
      <div className='x-auto'>
        <Link to={'/login'}>Login</Link>
      </div>
    );
  }

  return (
    <div className='mx-auto flex max-w-fit flex-col text-center'>
      {user.email}
    </div>
  );
}

export default Homepage;
