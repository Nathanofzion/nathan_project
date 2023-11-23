import Earth from "../components/Earth";

const Hero = () => {
  return (
    <div className="container">
      <div className="hero-div">
        <div className="hero-subdiv">
          <Earth />
        </div>
        <div className="hero-subdiv">
          <h1 className="hero-text">Connect the World With Zig3</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
