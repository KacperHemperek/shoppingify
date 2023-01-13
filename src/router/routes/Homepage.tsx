import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { auth } from '../../lib/firebase';

function Homepage() {
  const { user, loading, error } = useUser();

  if (loading) {
    return <div className='mx-auto max-w-fit'>Loading...</div>;
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
