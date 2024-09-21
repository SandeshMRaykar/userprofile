import React, { useState } from "react";

const ProfilePicUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <h2>Upload Profile Picture</h2>
      <input type="file" onChange={handleImageUpload} />
      {image && (
        <img
          src={image}
          alt="Profile"
          style={{ width: "150px", height: "150px" }}
        />
      )}
    </div>
  );
};

export default ProfilePicUpload;
