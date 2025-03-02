import React, { useContext, useEffect, useState } from "react";
import styles from "../PageStyles/categories.module.css";
import cover from "../assets/CoverImg.png";
import Sparklogo from "../assets/sparklogo.svg";
import { updateCategoryUsername } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthUserContext } from "../Contexts/AutUserProvider";
import toast from "react-hot-toast";

const Categories = () => {
  const navigate = useNavigate();
  const [selectCat, setSelectCat] = useState("");
  const [username, setUsername] = useState("");

  const { userAuth, setUserAuth } = useContext(AuthUserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let userInfo = jwtDecode(localStorage.getItem("token"));
      if (userInfo.category == null) {
        navigate("/category");
        setUserAuth(true);
      } else {
        navigate("/dashboard");
        setUserAuth(true);
      }
    }
  }, []);

  const categories = [
    "🏨 Business",
    "🎨 Creative",
    "📚 Education",
    "🎵 Entertainment",
    "👗 Fashion & Beauty",
    "🍕 Food & Beverage",
    "⚖️ Government & Politics",
    "🍎 Health & Wellness",
    "❤️ Non-Profit",
    "❤️ Other",
    "🖥️ Tech",
    "✈️ Travel & Tourism",
  ];

  const handelContinue = async () => {
    // console.log(username);
    // console.log(selectCat);
    if (!username && !selectCat) {
      return toast.error("Please Select Username and Category");
    }
    if (!username) {
      return toast.error("Please Select username");
    }
    if (!selectCat) {
      return toast.error("Please Select category");
    }

    try {
      let datatoUpdate = {
        category: selectCat,
        username: username,
      };
      const res = await updateCategoryUsername(datatoUpdate);
      const data = await res.json();
      if (res.status === 200) {
        // console.log(data);
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSelectCat("");
      setUsername("");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.category}>
        <div className={styles.logo}>
          <img src={Sparklogo} alt="logo" />
          <h2>
            SPARK<span>&trade;</span>{" "}
          </h2>
        </div>
        <div className={styles.catbody}>
          <div className={styles.catMain}>
            <h1>Tell us about yourself</h1>
            <p>For a personalized SPark experience</p>
            <input
              type="text"
              placeholder="Tell us your username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className={styles.catoptions}>
              <h4>Select one Category that best describes your Linktree:</h4>
              <div className={styles.catBtns}>
                {categories.map((item, index) => (
                  <button
                    key={index}
                    name="choice"
                    onClick={() => setSelectCat(item)}
                    style={{
                      backgroundColor: selectCat === item ? "#3ca36e" : "white",
                      color: selectCat === item ? "white" : "black",
                      borderColor: selectCat === item ? "black" : "",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button className={styles.continueBtn} onClick={handelContinue}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.coverImg}>
        <img src={cover} alt="cover image" />
      </div>
    </div>
  );
};

export default Categories;
