import React, { useContext, useEffect, useState } from "react";
import styles from "../PageStyles/register.module.css";
import Cover from "../assets/CoverImg.png";
import Sparklogo from "../assets/sparklogo.svg";
import { useNavigate } from "react-router-dom";
import { BsEyeSlash } from "react-icons/bs";
import { PiEye } from "react-icons/pi";
import { userLogin } from "../services/userApi";
import { jwtDecode } from "jwt-decode";
import { AuthUserContext } from "../Contexts/AutUserProvider";
import toast from "react-hot-toast";

const Login = () => {
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
    emailOrusername: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [emailRquire, setEmailRequire] = useState(false);
  const [passwordRquire, setPasswordRequire] = useState(false);

  const handelLogin = async () => {
    if (!formData.emailOrusername) setEmailRequire(true);
    if (!formData.password) setPasswordRequire(true);
    try {
      const res = await userLogin(formData);
      const data = await res.json();
      // console.log(data);
      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        setUserAuth(true);
        if (data.user.category == null) {
          navigate("/category");
        }else{
          navigate("/dashboard");
        }
      } else {
        toast.error(data.message);;
        formData({
          emailOrusername: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        emailOrusername: "",
        password: "",
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
        <div className={styles.loginContainer}>
          <div className={styles.loginForm}>
            <h1>Sign in to your Spark</h1>
            <div>
              <input
                type="text"
                className={styles.userinput}
                placeholder="Email / Username"
                name="emailOrusername"
                value={formData.emailOrusername}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
              <p
                style={{ visibility: emailRquire ? "visible" : "hidden" }}
                className={styles.loginErr}
              >
                Field is required*
              </p>
            </div>
            <div>
              <div className={styles.userPassed}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.userinput}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
                <label onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <BsEyeSlash size={20} color="#000" />
                  ) : (
                    <PiEye size={20} color="#000" />
                  )}
                </label>
              </div>
              <p
                style={{ visibility: passwordRquire ? "visible" : "hidden" }}
                className={styles.loginErr}
              >
                Field is required*
              </p>
            </div>
            <button className={styles.loginbtn} onClick={handelLogin}>
              Log in
            </button>
            <div className={styles.useroptions}>
              <a href="#">Forgot password ?</a>
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={() => navigate("/register")}>
                  Sign up
                </a>
              </p>
            </div>
          </div>
          <div className={styles.footerMsg}>
            <p>
              This site is protected by reCAPTCHA and the{" "}
              <span>Google Privacy Policy</span> and{" "}
              <span>Terms of Service</span> apply.{" "}
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

export default Login;
