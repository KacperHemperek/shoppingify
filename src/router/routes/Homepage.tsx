import { useUser } from '../../hooks/useUser';

function Homepage() {
  const { user } = useUser();

  return (
    <div className='mx-auto flex max-w-fit flex-col text-center'>
      {user?.email}
    </div>
  );
}

export default Homepage;
