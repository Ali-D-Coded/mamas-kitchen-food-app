import { Link } from "react-router-dom";
import FoodList from "../../components/FoodList";
import Loader from "../../components/loadings/Loader";
import useRefreshToken from "../../hooks/useRefreshToken";

const Home = () => {
    //  const refresh = useRefreshToken();
  return (
    <>
        {/* <Loader /> */}
      <FoodList />
    {/* <div className="h-full">
      <Link to="/profile">
        <button>Profile</button>
        </Link>

      <Link to="/payment">
        <button>Payments</button>
      </Link>
    
          <br />
         <button onClick={() => refresh()}>Refresh</button>
    </div> */}
    </>
  );
};

export default Home;
