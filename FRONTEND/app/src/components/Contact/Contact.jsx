import { useState } from "react";
import Input from "../Profiles/Inputs/Input";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-xxl shadow-xl bg-base-300 mt-3 mb-10">
          <form className="card-body text-base" onSubmit={handleSubmit}>
            <h3 className="text-primary text-center mb-4">Contact Us</h3>
            <div className="grid grid-cols-2 gap-x-10">
              {/* Left column */}
              <div>
                <Input
                  labelText="Name"
                  placeholder="Enter your name"
                  name="name"
                  type="text"
                  value={formData.name}
                  handleChange={handleChange}
                />
              </div>
              {/* Right column */}
              <div>
                <Input
                  labelText="Email"
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                  value={formData.email}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-8">
              <Input
                labelText="Message"
                placeholder="Enter your message"
                name="message"
                type="textarea"
                value={formData.message}
                handleChange={handleChange}
              />
            </div>
            {/* Submit button */}
            <div className="form-control col-span-2 mt-6">
              <input type="submit" value="Submit" className="btn" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
