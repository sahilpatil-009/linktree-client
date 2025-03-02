import React, { useEffect, useState } from "react";
import styles from "../PageStyles/dashboard.module.css";
import stylesapp from "../PageStyles/apperSetings.module.css";
import stylesrender from "../PageStyles/renderprofile.module.css";
import { GoShare } from "react-icons/go";
import YouTube from "../assets/media/youtube.png";
import Instagram from "../assets/media/instagram.png";
import FaceBook from "../assets/media/facebook.png";
import Twitter from "../assets/media/Xlogo.png";
import darkLogo from "../assets/darkLogo.svg";
import { useParams } from "react-router-dom";
import { getRenderProfile, increaseLinkCount, increaseShopcount } from "../services/dashboardApi";

const RenderProfile = () => {
  const { username } = useParams();

  const [Layout, setLayout] = useState("stack");
  const [InputFontColor, setInputFontColor] = useState("#111");
  const [btnfontColor, setbtnfontColor] = useState("#fff");
  const [btnFill, setbtnFill] = useState("");
  const [btnOutline, setbtnOutline] = useState("");
  const [btnShadow, setbtnShadow] = useState("");
  const [inputFont, setinputFont] = useState("");
  const [theme, setTheme] = useState("");

  const [islink, setIslink] = useState(true);
  const [isAddlink, setIsAddlink] = useState(true);
  const [Username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [bannerColor, setBannerColor] = useState("#342B26");

  // link arr
  const [linksArr, setLinksArr] = useState([]);

  const [shopArr, setShopArr] = useState([]);

  const socialMediaIcons = {
    youtube: YouTube,
    instagram: Instagram,
    facebook: FaceBook,
    twitter: Twitter,
  };

  const getLayoutStyles = () => {
    switch (Layout) {
      case "Grid":
        return {
          container: stylesapp.GridCont,
          link: stylesapp.GridLink,
          para: stylesapp.Gridpara,
          logo: stylesapp.GridLogo,
          logoImg: stylesapp.Gridimg,
        };
      case "Carousel":
        return {
          container: stylesapp.CarouselCont,
          link: stylesapp.CarouseltLink,
          para: stylesapp.Carouselpara,
          logo: stylesapp.CarouselLogo,
          logoImg: stylesapp.Carouselimg,
        };
      default:
        return {
          container: styles.childLinkS,
          link: styles.shortLink,
          para: styles.shortLinkpara,
          logo: styles.linkLogo,
          logoImg: styles.linkLogoimg,
        };
    }
  };

  const { container, link, para, logo, logoImg } = getLayoutStyles();

  const getProfileData = async () => {
    try {
      const res = await getRenderProfile(username);
      const data = await res.json();
      if (res.status == 200) {
        setUsername(data.username);
        const profile = data.profile;
        if (profile) {
          setProfileImage(profile.profileImage || "");
          setBannerColor(profile.bannerColor || "#342B26");
          setLayout(profile.Layout || "stack");
          setInputFontColor(profile.InputFontColor || "#111");
          setbtnfontColor(profile.btnfontColor || "#fff");
          setbtnFill(profile.btnFill || "");
          setbtnOutline(profile.btnOutline || "");
          setbtnShadow(profile.btnShadow || "");
          setinputFont(profile.inputFont || "");
          setTheme(profile.theme || "");
          setLinksArr(profile.linksArr || []);
          setShopArr(profile.shopArr || []);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelCopylink = () => {
    const profileURL = `${window.location.origin}/${Username}`; // Generate link
    navigator.clipboard
      .writeText(profileURL) // Copy to clipboard
      .then(() => alert("Link copied: " + profileURL)) // Show confirmation
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handelLinkClick = async (url, index) =>{
    window.open(url, "_blank");
    try {
      const postData = {
        username,
        index
      }
      const res = await increaseLinkCount(postData);
      if(res.status == 200){
        console.log(res.message);
      }else{
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handelShopClick = async (url, index) =>{
    window.open(url, "_blank");
    try {
      const postData = {
        username,
        index
      }
      const res = await increaseShopcount(postData);
      if(res.status == 200){
        console.log(res.message);
      }else{
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handdelGetStarted = () =>{
    window.open(`${window.location.origin}/`, "_blank");
  }

  useEffect(() => {
    getProfileData(username);
  }, []);

  return (
    <div className={stylesrender.main}>
      <div
        className={`${styles.preview} ${
          theme && stylesapp[theme] ? stylesapp[theme] : ""
        } `}
      >
        <div
          className={styles.profileCover}
          style={{ backgroundColor: `${bannerColor}` }}
        >
          <div className={styles.btnDiv}>
            <button onClick={handelCopylink}>
              <GoShare size={25} />
            </button>
          </div>
          <div className={styles.AvtarDiv}>
            <div className={styles.Avatar}>
              <img src={profileImage} />
            </div>
          </div>
          <div className={styles.UserName}>
            <p>{Username}</p>
          </div>
        </div>
        <div className={styles.linktree}>
          <div className={styles.actionBtns}>
            <button
              className={islink ? styles.activeBtn : styles.defautlBtnColor}
              onClick={() => setIslink(true)}
              style={{ color: btnfontColor || "" }}
            >
              link
            </button>
            <button
              className={islink ? styles.defautlBtnColor : styles.activeBtn}
              onClick={() => setIslink(false)}
              style={{ color: btnfontColor || "" }}
            >
              Shop
            </button>
          </div>
          <div className={container}>
            {islink
              ? linksArr &&
                linksArr.map(
                  (item, index) =>
                    item.showToapp && (
                      <div
                        className={`${link} ${
                          btnFill && stylesapp[btnFill]
                            ? stylesapp[btnFill]
                            : ""
                        } ${
                          btnOutline && stylesapp[btnOutline]
                            ? stylesapp[btnOutline]
                            : ""
                        } ${
                          btnShadow && stylesapp[btnShadow]
                            ? stylesapp[btnShadow]
                            : ""
                        }`}
                        style={{
                          backgroundColor:
                            btnFill && !stylesapp[btnFill] ? btnFill : "",
                          color: btnfontColor || "",
                          fontFamily: inputFont || "",
                        }}
                        key={index}
                        onClick={()=>handelLinkClick(item.url,index)} 
                      >
                        <div className={logo}>
                          <img
                            src={
                              socialMediaIcons[
                                item.socialMedia?.toLowerCase()
                              ] || item.socialMedia
                            }
                            className={logoImg}
                          />
                        </div>
                        <p
                          style={{ color: InputFontColor || "" }}
                          className={para}
                        >
                          {item.title}
                        </p>
                      </div>
                    )
                )
              : shopArr &&
                shopArr.map(
                  (item, index) =>
                    item.showShop && (
                      <div
                        className={`${link} ${
                          btnFill && stylesapp[btnFill]
                            ? stylesapp[btnFill]
                            : ""
                        } ${
                          btnOutline && stylesapp[btnOutline]
                            ? stylesapp[btnOutline]
                            : ""
                        } ${
                          btnShadow && stylesapp[btnShadow]
                            ? stylesapp[btnShadow]
                            : ""
                        }`}
                        style={{
                          backgroundColor:
                            btnFill && !stylesapp[btnFill] ? btnFill : "",
                          color: btnfontColor || "",
                          fontFamily: inputFont || "",
                        }}
                        onClick={() => handelShopClick(item.ShopUrl,index)}
                        key={index}
                      >
                        <p
                          style={{ color: InputFontColor || "" }}
                          className={para}
                        >
                          {item.ShopTitle}
                        </p>
                        {/* <p>{item.ShopUrl}</p> */}
                      </div>
                    )
                )}
          </div>
        </div>
        <div className={styles.mobfooter}>
          <button className={styles.getConnect} onClick={handdelGetStarted}>Get Connected</button>
          <div className={styles.Mobilelogo}>
            <img src={darkLogo} alt="logo" />
            <h2>SPARK</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderProfile;
