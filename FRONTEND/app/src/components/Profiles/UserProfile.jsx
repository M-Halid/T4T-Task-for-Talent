import { useState, useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import Input from "../Profiles/Inputs/Input";
import profilePlaceholder from "../../assets/profilePlaceholder.jpg";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(true);
  const { isLoggedIn, authToken, userEmail, setUserEmail } =
    useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "", // Initialize with empty strings
    age: "",
    gender: "",
    location: "",
    Beschreibungstext: "",
    linkedin: "",
    education: "",
    languages: "",
    profilePicture:""
  });
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (isLoggedIn && authToken) {
      console.log(`Sending request with auth token: ${authToken}`);
      fetch("http://localhost:3000/userProfile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            name: data.name,
            age: data.age,
            gender: data.gender,
            location: data.location,
            Beschreibungstext: data.Beschreibungstext,
            linkedin: data.linkedin,
            education: data.education,
            languages: data.languages,
            profilePicture: data.profilePicture
          });
        });
    }
  }, [isLoggedIn, authToken]);

  const uploadToFirebase = (file) =>  {
    const firebaseConfig = {
          apiKey: "AIzaSyAAznTgkrWuDKdzg9iaB_r4C0_JUEzImy0",
          authDomain: "talentfilestore.firebaseapp.com",
          projectId: "talentfilestore",
          storageBucket: "talentfilestore.appspot.com",
          messagingSenderId: "892796460454",
          appId: "1:892796460454:web:001861fc0abb940e6a0367",
          measurementId: "G-1B8JGT8E6C"
       };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage();
  
  const storageRef = ref(storage, '/images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          break;
      }
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setFormData(prevState => ({ ...prevState, profilePicture: downloadURL }))
    
       });
    }
  );
  } 

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
       await uploadToFirebase(file);
     } catch (error) {
      console.error("Error handling image upload:", error);
    }
};

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevFormData) => {
      if (type === "file") {
        return { ...prevFormData, [name]: "" };
      }

      return { ...prevFormData, [name]: value };
    });
  };

  const updateUserProfile = async (event) => {
    event.preventDefault();
    console.log("Anfang update user:", userEmail);
    try {
      console.log(authToken);
      const response = await fetch("http://localhost:3000/updateUserProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      if (result.email) {
        setUserEmail(result.email);
      }
    
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    } finally {
      setIsEditing(!isEditing);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="card bg-base-100 shadow-xl">
        <div className="flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-xxl shadow-2xl bg-base-100">
            <form className="card-body text-base" onSubmit={updateUserProfile}>
              <div className="flex justify-center">
                <div className="w-64 h-64 overflow-hidden relative border-2 border-base-300 rounded-md">
                  <img
                    src={formData.profilePicture ? formData.profilePicture : profilePlaceholder}
                    alt="Profile"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                    
                    disabled={isEditing}
                  />
                </div>
              </div>
              <button type="button" onClick={() => setIsEditing(!isEditing)}>
                Edit Profile
              </button>

              <div className="grid grid-cols-2 gap-x-10">
                {/* Left column */}
                <div>
                  <Input
                    labelText="Name"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    handleChange={handleChange}
                    readOnly={isEditing}
                  />
                  <Input
                    labelText="Alter"
                    placeholder="Alter"
                    name="age"
                    type="number"
                    min="18"
                    value={formData.age}
                    handleChange={handleChange}
                    readOnly={isEditing}
                  />
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Geschlecht</span>
                      <div className="space-x-2">
                        <label>
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            className="radio radio-primary transform scale-75"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                            disabled={isEditing}
                            //disabled
                          />
                          <span className="ml-2 text-sm">Männlich</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            className="radio radio-primary transform scale-75"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                            disabled={isEditing}
                          />
                          <span className="ml-2 text-sm">Weiblich</span>
                        </label>
                      </div>
                    </label>
                  </div>

                  {/* Add other form fields for the left column here */}
                </div>
                {/* Right column */}
                <div>
                  <Input
                    labelText="Ort/Stadt"
                    placeholder="Ort/Stadt"
                    name="location"
                    value={formData.location}
                    handleChange={handleChange}
                    readOnly={isEditing}
                  />
                  <Input
                    labelText="Languages"
                    placeholder="Languages"
                    name="languages"
                    value={formData.languages}
                    handleChange={handleChange}
                    readOnly={isEditing}
                  />
                  <Input
                    labelText="LinkedIn"
                    placeholder="LinkedIn Profile URL"
                    name="linkedin"
                    value={formData.linkedin}
                    handleChange={handleChange}
                    readOnly={isEditing}
                  />

                  {/* Add other form fields for the right column here */}
                </div>
              </div>

              <Input
                labelText="Beschreibungstext"
                placeholder="beschreibe dich"
                name="Description"
                type="textarea"
                value={formData.Description}
                handleChange={handleChange}
                readOnly={isEditing}
              />
              {/* Submit button */}
              {!isEditing ? (
                <div className="form-control col-span-2 mt-6">
                  <input type="submit" value="SPEICHERN" className="btn" />
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
