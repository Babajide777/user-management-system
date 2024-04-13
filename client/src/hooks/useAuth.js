import { useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  console.log(user);
  console.log(token);

  return { user, token };
};

export default useAuth;
