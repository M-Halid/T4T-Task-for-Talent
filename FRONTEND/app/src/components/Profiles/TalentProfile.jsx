const TalentProfile = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="card bg-base-100 shadow-xl ">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="card shrink-0 w-full max-w-xxl  shadow-2xl bg-base-100">
            <form className="card-body grid grid-cols-2 gap-4">
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Fähigkeiten</span>
                    <input
                      type="text"
                      placeholder="Fähigkeiten"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Arbeitsfelder</span>
                    <input
                      type="text"
                      placeholder="Arbeitsfelder"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Alter</span>
                    <input
                      type="number"
                      placeholder="Alter"
                      className="input input-bordered"
                      min="18"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Geschlecht</span>
                    <div className="space-x-2">
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          className="radio radio-primary"
                        />
                        <span className="ml-2">Männlich</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          className="radio radio-primary"
                        />
                        <span className="ml-2">Weiblich</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="diverse"
                          className="radio radio-primary"
                        />
                        <span className="ml-2">Divers</span>
                      </label>
                    </div>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Ort/Stadt</span>
                    <input
                      type="text"
                      placeholder="Ort/Stadt"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Hintergrund</span>
                    <textarea
                      placeholder="Hintergrund"
                      className="textarea textarea-bordered"
                    ></textarea>
                  </label>
                </div>
              </div>
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Resume/CV</span>
                    <input type="file" className="input input-bordered" />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Portfolio</span>
                    <input
                      type="text"
                      placeholder="Portfolio URL"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">GitHub</span>
                    <input
                      type="text"
                      placeholder="GitHub Profile URL"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">LinkedIn</span>
                    <input
                      type="text"
                      placeholder="LinkedIn Profile URL"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Education</span>
                    <textarea
                      placeholder="Education"
                      className="textarea textarea-bordered w-full"
                    ></textarea>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Certifications</span>
                    <textarea
                      placeholder="Certifications"
                      className="textarea textarea-bordered w-full"
                    ></textarea>
                    <input type="file" className="input input-bordered" />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Languages</span>
                    <input
                      type="text"
                      placeholder="Languages"
                      className="input input-bordered"
                    />
                  </label>
                </div>
              </div>
              <div className="form-control col-span-2 mt-6">
                <input type="submit" value="Einreichen" className="btn" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
