import { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import UserProfilePreview from "../Profiles/Previews/UserProfilePreview";
import TalentProfilePreview from "../Profiles/Previews/TalentProfilePreview";
import AuthContext from "../../contexts/AuthContext";
import PropTypes from "prop-types";

const TalentFeed = ({ selectedTags }) => {
  const [TalentData, setTalentData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const { authToken, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    console.log("selectedTags updated:", selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    if (isLoggedIn && authToken) {
      axios
        .get(
          `http://localhost:3000/getAllTalentProfiles?nocache=${Date.now()}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => {
          if (Array.isArray(response.data)) {
            setTalentData(response.data);
            console.log("TalentData:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [authToken, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && authToken) {
      axios
        .get(`http://localhost:3000/getAllUserProfiles?nocache=${Date.now()}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setProfileData(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [authToken, isLoggedIn]);

  const sortedTalentData = useMemo(() => {
    return [...TalentData]
      .filter(
        (talent) =>
          selectedTags.length === 0 ||
          selectedTags.some((tag) =>
            talent.tags
              .map((tag) => tag.toLowerCase())
              .includes(tag.toLowerCase())
          )
      )
      .sort((a, b) => {
        for (let i = 0; i < selectedTags.length; i++) {
          const tag = selectedTags[i].toLowerCase();
          const aHasTag = a.tags.map((tag) => tag.toLowerCase()).includes(tag);
          const bHasTag = b.tags.map((tag) => tag.toLowerCase()).includes(tag);

          if (aHasTag && !bHasTag) return -1;
          if (!aHasTag && bHasTag) return 1;
        }

        return 0;
      });
  }, [TalentData, selectedTags]);

  return (
    <div>
      <div>
        <h2 className="text-primary m-5 justify-center text-center  ">
          Talent Feed
        </h2>
      </div>
      <div className="flex flex-col items-center">
        {sortedTalentData.map((talent) => {
          const profile = profileData.find(
            (profile) => profile._id === talent.userId
          );
          if (profile) {
            return (
              <div
                className="grid grid-cols-3 gap-10 bg-accent shadow-md rounded-lg p-4 m-4 w-3/4"
                key={talent._id}
              >
                <UserProfilePreview profile={profile} className="col-span-1" />
                <TalentProfilePreview talent={talent} className="col-span-2" />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

TalentFeed.propTypes = {
  selectedTags: PropTypes.array.isRequired,
};

export default TalentFeed;
