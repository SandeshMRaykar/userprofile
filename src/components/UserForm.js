import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserForm = ({ users, onSaveUser }) => {
  const { id } = useParams(); // Get user ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: { street: "", city: "", zipcode: "" },
  });

  const [imagePreview, setImagePreview] = useState(null); // For previewing the uploaded image
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Get the user by ID and set the form data
  useEffect(() => {
    if (users && users.length > 0) {
      const user = users.find((user) => user.id === parseInt(id));
      if (user) {
        setFormData({
          name: user.name,
          email: user.email,
          address: {
            street: user.address.street,
            city: user.address.city,
            zipcode: user.address.zipcode,
          },
          profilePicture: user.profilePicture || null,
        });
        setImagePreview(user.profilePicture || null);
      }
    }
  }, [id, users]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "zipcode"].includes(name)) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle image file selection

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview the selected image
        setFormData({ ...formData, profilePicture: reader.result }); // Save the image in form data
      };
      reader.readAsDataURL(file);
    }
  };
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation for empty fields
    if (!formData.name || !formData.email) {
      setErrorMessage("Name and Email are required.");
      return;
    }

    onSaveUser({
      id: parseInt(id),
      name: formData.name,
      email: formData.email,
      address: {
        street: formData.address.street,
        city: formData.address.city,
        zipcode: formData.address.zipcode,
      },
      profilePicture: formData.profilePicture, // Include the profile picture
    });
    setSuccessMessage("User details updated successfully!");

    setTimeout(() => {
      navigate("/"); // Redirect back to the users list
    }, 1000);
  };

  // Render form only if user data is available
  // if (!users || users.length === 0) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit User Details</h2>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <h3>Address</h3>

      <label>
        Street:
        <input
          type="text"
          name="street"
          value={formData.address.street}
          onChange={handleChange}
        />
      </label>

      <label>
        City:
        <input
          type="text"
          name="city"
          value={formData.address.city}
          onChange={handleChange}
        />
      </label>

      <label>
        Zipcode:
        <input
          type="text"
          name="zipcode"
          value={formData.address.zipcode}
          onChange={handleChange}
        />
      </label>

      <label>
        Profile Picture:
        <input type="file" name="pic" onChange={handleImageChange} />
      </label>
      {imagePreview && (
        <div>
          <h4>Profile Picture Preview:</h4>
          <img src={imagePreview} alt="Profile Preview" width="100" />
        </div>
      )}
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
