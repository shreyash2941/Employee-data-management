import "./App.css"; // Import CSS file for styling
import Navbar from "./Navbar";
import AllRoutes from "./AllRoutes";
import MainForm from "./MainForm";

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <AllRoutes />
    </div>
  );
};

export default App;
