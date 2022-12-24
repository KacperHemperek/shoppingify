function useLogin() {
  const login = (email: string, password: string) => {
    console.log('Login with email: ' + email);
  };

  return {
    login,
  };
}

export default useLogin;
