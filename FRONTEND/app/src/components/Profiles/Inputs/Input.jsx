import proptypes from "prop-types";
import { useState } from "react";

const Input = ({
  labelText,
  placeholder,
  name,
  value,
  handleChange,
  type = "text",
  readOnly
}) => {
  // State to hold the preview URL of the uploaded file
  const [preview, setPreview] = useState(null);

  // Function to handle file input changes
  const handleFileChange = (e) => {
    // Call the passed in handleChange function to update the form data
    handleChange(e);

    // Get the uploaded file
    const file = e.target.files[0];
    if (file) {
      // Create a new FileReader object
      const reader = new FileReader();

      // Set the onloadend function of the FileReader object
      reader.onloadend = () => {
        // Set the preview URL to the result of the FileReader object
        setPreview(reader.result);
      };

      // Read the uploaded file as a data URL
      reader.readAsDataURL(file);
    } else {
      // If no file was uploaded, set the preview URL to null
      setPreview(null);
    }
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{labelText}</span>
        {type === "file" ? (
          <>
            <label className="btn cursor-pointer">
              Upload File
              <input
                type={type}
                name={name}
                className="hidden"
                onChange={handleFileChange} // Use the handleFileChange function for file inputs
                readOnly= {readOnly}
              />
            </label>
            {preview && (
              // If a preview URL is available, display the uploaded file
              <object
                data={preview}
                type="application/pdf"
                width="100%"
                height="200px"
                className="mt-2"
                readOnly= {readOnly}
              >
                <p>
                  It appears you don`&apos`t have a PDF plugin for this browser.
                  No biggie... you can{" "}
                  <a href={preview}>click here to download the PDF file.</a>
                </p>
              </object>
            )}
          </>
        ) : type === "textarea" ? (
          <textarea
            placeholder={placeholder}
            className={`textarea textarea-bordered text-base ${
              name === "Beschreibungstext" ? "w-full" : "w-2/3"
            }`} // Conditionally apply w-full class
            name={name}
            value={value}
            onChange={handleChange}
            readOnly= {readOnly}
          ></textarea>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            className="input input-bordered w-2/3"
            name={name}
            value={value}
            onChange={handleChange}
            readOnly= {readOnly}
          />
        )}
      </label>
    </div>
  );
};

Input.propTypes = {
  labelText: proptypes.string.isRequired,
  placeholder: proptypes.string,
  name: proptypes.string.isRequired,
  value: proptypes.oneOfType([proptypes.string, proptypes.number]),
  handleChange: proptypes.func.isRequired,
  type: proptypes.string,
};

export default Input;
