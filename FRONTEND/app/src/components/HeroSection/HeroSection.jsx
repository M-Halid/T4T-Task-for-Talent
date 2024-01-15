import videoAsset from "../../assets/videos/video.mp4";

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
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content bg-base-300 bg-opacity-95 rounded-lg">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Task 4 Talent - Talent 4 Task
          </h1>
          <p className="mb-5">
            Die Plattfrom für die Vermittlung von IT Talenten und Aufträgen.
            Werde Teil der Community und finde deinen nächsten Auftrag oder dein
            nächstes Talent.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;