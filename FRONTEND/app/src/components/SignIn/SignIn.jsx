import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const SignIn = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserProfile,
    setTalentProfile,
    setTaskProfile,
    setAuthToken, // Add this to your context
  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/UserHub");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = (userProfile, talentProfile, taskProfile, token) => {
    setUserProfile(userProfile);
    setTalentProfile(talentProfile);
    setTaskProfile(taskProfile);
    setIsLoggedIn({ name: userProfile.name }); // Assuming userProfile has a name property
    setAuthToken(token); // Set the authToken in your context
    localStorage.setItem("authToken", token); // Store the authToken in localStorage
  };

  const loadUser = (data) => {
    if (data && data.user && data.user._id) {
      const userProfile = data.user;
      console.log("userProfile data:", userProfile);
      const talentProfile = data.talent ? data.talent.talent : null;
      const taskProfile = data.task ? data.task.task : null;
      const token = data.token; // Get the token from the response

      handleLogin(userProfile, talentProfile, taskProfile, token);

      localStorage.setItem("currentUser", JSON.stringify(data));
      navigate("/UserHub");
    } else {
      console.error("Error: No data received or user data is incorrect");
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
        console.log("User data:", user);
        loadUser(user);
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
