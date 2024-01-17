const TaskProfile = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="card bg-base-100 shadow-xl ">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="card shrink-0 w-full max-w-5xl  shadow-2xl bg-base-100">
            <form className="card-body grid grid-cols-2 gap-4">
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Task Beschreibung</span>
                    <textarea
                      placeholder="was brauchst du?"
                      className="textarea textarea-bordered"
                    ></textarea>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Stundenlohn ca.</span>
                    <input
                      type="number"
                      placeholder="Stundenlohn"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Summe Ausschreibung</span>
                    <input
                      type="number"
                      placeholder="für vervollständigten Task"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      erforderliche Fähigkeiten
                    </span>
                    <input
                      type="text"
                      placeholder="Required Skills"
                      className="input input-bordered"
                    />
                  </label>
                </div>
              </div>
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Erfahrungs Level</span>
                    <select className="select select-bordered">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Expert</option>
                    </select>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Auftraggeber</span>
                    <input
                      type="text"
                      placeholder="Auftraggeber"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Beschreibung</span>
                    <textarea
                      placeholder="Beschreibe dich oder deine Firma"
                      className="textarea textarea-bordered"
                    ></textarea>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Website</span>
                    <input
                      type="text"
                      placeholder="Company Website"
                      className="input input-bordered"
                    />
                  </label>
                </div>
              </div>
              <div className="form-control col-span-2 mt-6">
                <input type="submit" value="Submit" className="btn" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskProfile;
