import Earth from "../components/Earth";

const Hero = ({ isDarkMode }) => {
  return (
    <div className="container">
      <div className="hero-div">
        <div className="hero-subdiv">
          <Earth />
        </div>
        <div className="hero-subdiv">
          <h1 style={{ color: isDarkMode ? "#fff" : "#000", fontSize: "4rem" }}>
            Connect the World With Zig3
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
