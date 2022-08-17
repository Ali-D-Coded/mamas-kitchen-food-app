import { Link } from "react-router-dom";
import FoodList from "../../components/FoodList";
import Loader from "../../components/loadings/Loader";
import useRefreshToken from "../../hooks/useRefreshToken";

const Home = () => {
    //  const refresh = useRefreshToken();
  return (
    <>
      <FoodList />
    </>
  );
};

export default Home;
