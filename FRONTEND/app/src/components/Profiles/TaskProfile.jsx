import React, { useState } from 'react';
import axios from 'axios';

const TaskProfile = () => {
  const [formData, setFormData] = useState({
    taskDescription: '',
    hourlyRate: '',
    totalBidAmount: '',
    requiredSkills: '',
    experienceLevel: 'Beginner',
    clientName: '',
    description: '',
    website: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the server endpoint
      await axios.post('http://localhost:3000/submitTask', formData);

      // Optionally, you can handle success or redirect to another page
      console.log('Task profile submitted successfully');
      console.log(formData);
      
    } catch (error) {
      console.error('Error submitting task profile:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="card bg-base-100 shadow-xl">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-5xl shadow-2xl bg-base-100">
            <form className="card-body grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Task Beschreibung</span>
                    <textarea
                      required
                      placeholder="was brauchst du?"
                      className="textarea textarea-bordered"
                      name="taskDescription"
                      value={formData.taskDescription}
                      onChange={handleChange}
                    ></textarea>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Stundenlohn ca.</span>
                    <input
                      required
                      type="number"
                      placeholder="Stundenlohn"
                      className="input input-bordered"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleChange}
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
                      name="totalBidAmount"
                      value={formData.totalBidAmount}
                      onChange={handleChange}
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
                      name="requiredSkills"
                      value={formData.requiredSkills}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Erfahrungs Level</span>
                    <select
                      className="select select-bordered"
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
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
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Beschreibung</span>
                    <textarea
                      placeholder="Beschreibe dich oder deine Firma"
                      className="textarea textarea-bordered"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
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
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
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
