import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useAppContext } from "../../Providers";

//Style
import "./style.scss";

const Loader = () => {
  const { isLoading } = useAppContext();

  return (
    isLoading && (
      <div className="loader-container">
        <ClimbingBoxLoader loading color="#ffffff" size={50} />
      </div>
    )
  );
};

export default Loader;
