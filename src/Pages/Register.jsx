import React, { useContext, useEffect, useState } from "react";
import styles from "../PageStyles/register.module.css";
import Cover from "../assets/CoverImg.png";
import Sparklogo from "../assets/sparklogo.svg";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../services/userApi";
import { AuthUserContext } from "../Contexts/AutUserProvider";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const Register = () => {

  const navigate = useNavigate();

  const { userAuth, setUserAuth } = useContext(AuthUserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let userInfo = jwtDecode(localStorage.getItem("token"));
      if (userInfo.category == null) {
        navigate("/category");
        setUserAuth(true);
      }else{
        navigate("/dashboard");
        setUserAuth(true);
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
    checkbox: false,
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
    if (!formData.checkbox) newError.checkbox = "You must agree to the trems.";

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handelRegister = async () => {
    if (!validateForm()) {
      return console.log("fields required");
    }
    try {
      const formattedData = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      const res = await userRegister(formattedData);
      const data = await res.json();
      if (res.status === 200) {
        console.log(data);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPass: "",
        checkbox: false,
      });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.register}>
        <div className={styles.logo}>
          <img src={Sparklogo} alt="logo" />
          <h2>
            SPARK<span>&trade;</span>
          </h2>
        </div>
        <div className={styles.registerContainer}>
          <div className={styles.registerForm}>
            <h1>Sign up to your Spark</h1>
            <div className={styles.userDecide}>
              <h2>Create an account</h2>
              <a href="" onClick={() => navigate("/login")}>
                Sign in instead
              </a>
            </div>
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
              <div className={styles.uInputcheck}>
                <input
                  type="checkbox"
                  name="checkbox"
                  checked={formData.checkbox}
                  onChange={handleChange}
                />
                <p
                  style={{
                    color: errors.checkbox ? "red" : "",
                  }}
                >
                  By creating an account, I agree to our
                  <span>Terms of use</span>
                  and <span>Privacy Policy</span>
                </p>
              </div>
              <button className={styles.createBtn} onClick={handelRegister}>
                Create an account
              </button>
            </div>
          </div>
          <div className={styles.footerMsg}>
            <p>
              This is protected by reCAPTCHA and the{" "}
              <span>Google Privacy Policy</span> and
              <span>Terms of Service</span> apply.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cover}>
        <div className={styles.imageSection}>
          <img src={Cover} alt="cover image" />
        </div>
      </div>
    </div>
  );
};

export default Register;
