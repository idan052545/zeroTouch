import main from "../assets/images/main.svg";
import HomePageWrapper from "../assets/wrappers/homePage-wrapper";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <HomePageWrapper>
      <nav></nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            ZERO <span>TOUCH</span>
          </h1>
          <p>
            Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up
            fixie raclette taxidermy craft beer. Brunch bitters synth, VHS
            crucifix heirloom meggings bicycle rights.
          </p>
          <Link to="/questions" className="btn btn-hero">
            התחל
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </HomePageWrapper>
  );
};

export default HomePage;
