import React, { useEffect, useState } from "react";
import styles from "../PageStyles/settings.module.css";
import { getUserdata, updateuser } from "../services/userApi";
import toast from "react-hot-toast";

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newError = {};
    if (!formData.firstName.trim()) newError.firstName = "First name required*";
    if (!formData.lastName.trim()) newError.lastName = "Last name required*";
    if (!formData.email.trim()) newError.email = "Email required*";
    if (!formData.password.trim()) {  
      newError.password = "Password required*";
    } else if (formData.password.length < 8) {
      newError.password = "The password must be at least 8 characters long*";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)
    ) {
      newError.password =
        "Please choose a strong password that includes at least 1 lowercase and uppercase letter, a number, as well as a special character (!@#$%^&*)";
    }
    if (!formData.confirmPass.trim())
      newError.confirmPass = "Please enter your password*";
    if (formData.confirmPass.trim() !== formData.password.trim())
      newError.confirmPass = "Password not match";

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handelGetUserData = async () =>{
    try{
      const res = await getUserdata();
      if(res.status == 200){
        const data = await res.json();
        setFormData((prevData) => ({
          ...prevData, // Keep existing values
          firstName: data.firstname || "",
          lastName: data.lastname || "",
          email: data.email || "",
        }));
      }
    }catch(error){
      console.log(error);
    }
  }

  const handelRegister = async () => {
    if (!validateForm()) {
      return console.log("fields required");
    }

    console.log("here");
    try {
      const formattedData = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      const res = await updateuser(formattedData);
      const data = await res.json();
      if (res.status === 200) {
        console.log(data);
        toast.success(data.message || "Register Succefully" );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
       console.log(error);
    }
  };

  useEffect(()=>{
    handelGetUserData();  
  },[]);

  return (
    <div className={styles.main}>
      <h3>Edit Profile</h3>
      <hr />
      <div className={styles.userInputes}>
        <div className={styles.uInput}>
          <p>First name</p>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <p
            style={{
              visibility: errors.firstName ? "visible" : "hidden",
            }}
            className={styles.inpurError}
          >
            {errors.firstName || "Field is required"}
          </p>
        </div>
        <div className={styles.uInput}>
          <p>Last name</p>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <p
            style={{
              visibility: errors.lastName ? "visible" : "hidden",
            }}
            className={styles.inpurError}
          >
            {errors.lastName || "Field is required"}
          </p>
        </div>
        <div className={styles.uInput}>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <p
            style={{
              visibility: errors.email ? "visible" : "hidden",
            }}
            className={styles.inpurError}
          >
            {errors.email || "Field is required"}
          </p>
        </div>
        <div className={styles.uInput}>
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <p
            style={{
              visibility: errors.password ? "visible" : "hidden",
            }}
            className={styles.inpurError}
          >
            {errors.password || "Field is required"}
          </p>
        </div>
        <div className={styles.uInput}>
          <p>Confirm Password</p>
          <input
            type="password"
            name="confirmPass"
            value={formData.confirmPass}
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <p
            style={{
              visibility: errors.confirmPass ? "visible" : "hidden",
            }}
            className={styles.inpurError}
          >
            {errors.confirmPass || "Field is required"}
          </p>
        </div>
        <div className={styles.btnDiv}>
          <button className={styles.createBtn} onClick={handelRegister}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
