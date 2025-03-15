import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
import Bestreads from "./Pages/Bestreads";

export default function App() {
  return (
      <div className="snap-container">
      <div id="home"><Home /></div>
      <div id="about"><About /></div>
      <div id="projects"><Projects /></div>
      <div id="Bestreads"><Bestreads /></div>
      <div id="contact"><Contact /></div>
    </div>
  );
}
