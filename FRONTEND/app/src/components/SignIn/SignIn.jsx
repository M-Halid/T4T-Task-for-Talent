import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

const SignIn = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loadUser = (data) => {
    const userInfo = data.user;

    setIsLoggedIn({
      id: userInfo._id,
      name: userInfo.name,
      email: userInfo.email,
    });

    if (data.talent.talent) {
      const talent = data.talent.talent;

      setIsLoggedIn({
        id: talent._id,
        name: talent.name,
        email: talent.email,
        skills: talent.skills,
        workingFields: talent.workingFields,
        age: talent.age,
        gender: talent.gender,
        location: talent.location,
        background: talent.background,
        resume: null,
        portfolio: talent.portfolio,
        github: talent.github,
        linkedin: talent.linkedin,
        education: talent.education,
        certifications: talent.certifications,
        certificationFile: null,
        languages: talent.languages,
      });
    }
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
        if (user.user._id) {
          loadUser(user);
          localStorage.setItem("currentUser", JSON.stringify(user));
          navigate("/UserHub");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-300 mt-3 mb-10 flex-col shrink-0 w-full max-w-md">
        <form className="card-body" onSubmit={handleSignIn}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              onChange={handlePasswordChange}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
