import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserProfilePreview from "../Profiles/Previews/UserProfilePreview";
import TalentProfilePreview from "../Profiles/Previews/TalentProfilePreview";
import AuthContext from "../../contexts/AuthContext";

const TalentFeed = () => {
  const [TalentData, setTalentData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const { authToken, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn && authToken) {
      console.log("Attempting to fetch talent profiles...");
      axios
        .get("http://localhost:3000/getAllTalentProfiles", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          console.log("Received response from server:", response);
          if (Array.isArray(response.data)) {
            console.log("Setting TalentData with fetched data:", response.data);
            setTalentData(response.data);
          } else {
            console.log("Received non-array data from server:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching talent data:", error);
        });
    } else {
      console.log("User is not logged in or authToken is not available");
    }
    console.log("authToken", authToken);
  }, [authToken, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && authToken) {
      console.log("Attempting to fetch user profiles...");
      axios
        .get("http://localhost:3000/getAllUserProfiles", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          console.log("Received response from server:", response);
          if (Array.isArray(response.data)) {
            console.log(
              "Setting profileData with fetched data:",
              response.data
            );
            setProfileData(response.data);
          } else {
            console.log("Received non-array data from server:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
    console.log("TalentData", TalentData);
  }, [authToken, isLoggedIn, TalentData]);

  return (
    <div className="flex flex-col items-center">
      {profileData.map((profile) => {
        const talent = TalentData.find(
          (talent) => talent.userId === profile._id
        );
        if (talent) {
          return (
            <div
              className="grid grid-cols-3 gap-4 bg-accent shadow-md rounded-lg p-4 m-4 w-full"
              key={profile._id}
            >
              <UserProfilePreview profile={profile} className="col-span-1" />
              <TalentProfilePreview talent={talent} className="col-span-2" />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default TalentFeed;
