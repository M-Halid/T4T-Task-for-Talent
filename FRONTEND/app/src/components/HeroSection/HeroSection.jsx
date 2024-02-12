import videoAsset from "../../assets/videos/video.mp4";
import { Link } from "react-router-dom";
import logo from "../../assets/tft.jpg";

const HeroSection = () => {
  return (
    <div className="hero min-h-screen relative">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        src={videoAsset}
        type="video/mp4"
      />

      <div className="hero-content text-center text-primary bg-base-300 bg-opacity-95 rounded-lg shadow-xl ">
        <div className="max-w-md">
          <h3 className="mb-5 text-5xl font-bold">Task 4 Talent</h3>
          <img
            className="w-24 mx-auto border-accent border-2 rounded-full"
            src={logo}
            alt="company logo"
          />
          <h3 className="mb-5 mt-5 text-5xl font-bold">Talent 4 Task</h3>
          <p className="mb-5 ">
            Die Plattform für die Vermittlung von IT Talenten und Aufträgen.
            Werde Teil der Community und finde deinen nächsten Auftrag oder dein
            nächstes Talent.
          </p>
          <Link to="/GetStarted">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
