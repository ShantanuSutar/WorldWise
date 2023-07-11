import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

const HomePage = () => {
  return (
    <div>
      <PageNav />
      <h1>HomePage</h1>
      <a href="pricing">Pricing 1</a>
      <br />
      <br />
      <Link to="/pricing">Pricing 2</Link>
    </div>
  );
};

export default HomePage;
