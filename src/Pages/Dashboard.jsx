import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../PageStyles/dashboard.module.css";
import stylesapp from "../PageStyles/apperSetings.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Sparklogo from "../assets/sparklogo.svg";
import { IoShapesOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import BoyMoji from "../assets/Memoji BoysDefault .png";
import { TfiLayoutAccordionSeparated } from "react-icons/tfi";
import { CiShare2 } from "react-icons/ci";
import { GoShare } from "react-icons/go";
import darkLogo from "../assets/darkLogo.svg";
import { CiLogout } from "react-icons/ci";
import YouTube from "../assets/media/youtube.png";
import Instagram from "../assets/media/instagram.png";
import FaceBook from "../assets/media/facebook.png";
import Twitter from "../assets/media/Xlogo.png";
import Addnewlink from "./Addnewlink";
import LinksSettings from "./LinksSettings";
import { useAppearance } from "../Contexts/AppearanceContext";
import { jwtDecode } from "jwt-decode";
import { getLinkData, updateProfile } from "../services/dashboardApi";
import { AuthUserContext } from "../Contexts/AutUserProvider";
import toast from "react-hot-toast";
import { PiEye, PiEyeSlashLight } from "react-icons/pi";

const Dashboard = () => {
  const navigate = useNavigate();

  const { setUserAuth } = useContext(AuthUserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUserAuth(false);
      navigate("/"); // Redirect if token is missing
      return;
    }

    try {
      const userInfo = jwtDecode(token);

      // If token is expired or userInfo is invalid
      if (!userInfo || userInfo.exp * 1000 < Date.now()) {
        localStorage.removeItem("token"); // Remove invalid token
        setUserAuth(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      setUserAuth(false);
      navigate("/");
    }
  }, [navigate, setUserAuth]);

  const userData = jwtDecode(localStorage.getItem("token"));

  const [islink, setIslink] = useState(true);
  const [isAddlink, setIsAddlink] = useState(true);

  const [Username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [bannerColor, setBannerColor] = useState("#342B26");

  const [showLogout, setShowLogout] = useState(false);
  const [showAddModel, setShowAddModel] = useState(false);
  const [userBio, setUserBio] = useState("");

  const [mobilePreview, setMobilePreviw] = useState(false);
  const [previewBtn, setPreview] = useState(false);

  // appearance
  const {
    Layout,
    setLayout,
    InputFontColor,
    setInputFontColor,
    btnfontColor,
    setbtnfontColor,
    btnFill,
    setbtnFill,
    btnOutline,
    setbtnOutline,
    btnShadow,
    setbtnShadow,
    inputFont,
    setinputFont,
    theme,
    setTheme,
  } = useAppearance();

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

  // add link in array of objects
  const [linksArr, setLinksArr] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [showToapp, setShowToapp] = useState(false);
  const [socialMedia, setSocailMedia] = useState("");
  const [linkCount, setLinkCount] = useState(0);
  // addlink in array
  const handeladdLink = () => {
    if (title && url && socialMedia) {
      setLinksArr((prevLinks) => [
        ...prevLinks,
        {
          title,
          url,
          showToapp,
          socialMedia,
          linkCount,
        },
      ]);
      setTitle("");
      setUrl("");
      setShowToapp(false);
      setSocailMedia("");
      setLinkCount(0);
    }
  };

  // console.log("linksArr ->", linksArr);

  // add shop-product link
  const [shopArr, setShopArr] = useState([]);
  const [ShopTitle, setShopTitle] = useState("");
  const [ShopUrl, setShopLinkUrl] = useState("");
  const [showShop, setshowShop] = useState(false);
  const [shopCount, setshopCount] = useState(0);

  const handelShopLink = () => {
    if (ShopTitle && ShopUrl) {
      setShopArr((prevous) => [
        ...prevous,
        { ShopTitle, ShopUrl, showShop, shopCount },
      ]);
      setShopTitle("");
      setShopLinkUrl("");
      setshowShop(false);
      setshopCount(0);
    }
  };

  const socialMediaIcons = {
    youtube: YouTube,
    instagram: Instagram,
    facebook: FaceBook,
    twitter: Twitter,
  };

  // console.log("shoplinksArr ->", shopArr);

  const fileInputRef = useRef(null);

  const handlePickImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "linktree_profile");
    data.append("cloud_name", "djmbp2rwt");

    // Use toast.promise correctly
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/djmbp2rwt/image/upload",
            {
              method: "POST",
              body: data,
            }
          );

          if (!res.ok) throw new Error("Upload failed");

          const uploadImageUrl = await res.json();
          setProfileImage(uploadImageUrl.url);
          resolve(uploadImageUrl); // Resolve with the data
        } catch (error) {
          reject(error); // Reject in case of error
        }
      }),
      {
        loading: "Uploading...",
        success: <b>Upload successful!</b>,
        error: <b>Upload failed.</b>,
      }
    );
  };

  const handleRemoveImage = () => {
    setProfileImage(BoyMoji); // Reset to default image
  };

  const handelLogout = () => {
    localStorage.removeItem("token");
    setShowLogout(false);
    navigate("/");
  };

  const getUserProfile = async () => {
    try {
      const res = await getLinkData();
      const data = await res.json();
      // console.log(data);
      if (res.status == 200) {
        // console.log(data.profile);
        setUsername(data.username);
        const profile = data.profile;

        setProfileImage(profile.profileImage);
        setBannerColor(profile.bannerColor);
        setUserBio(profile.userBio);
        setLayout(profile.Layout);
        setInputFontColor(profile.InputFontColor);
        setbtnfontColor(profile.btnfontColor);
        setbtnFill(profile.btnFill);
        setbtnOutline(profile.btnOutline);
        setbtnShadow(profile.btnShadow);
        setinputFont(profile.inputFont);
        setTheme(profile.theme);
        setLinksArr(profile.linksArr);
        setShopArr(profile.shopArr);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelSave = async () => {
    const profileData = {
      username: Username,
      profileImage: profileImage,
      bannerColor: bannerColor,
      userBio: userBio,
      Layout: Layout,
      InputFontColor: InputFontColor,
      btnfontColor: btnfontColor,
      btnFill: btnFill,
      btnOutline: btnOutline,
      btnShadow: btnShadow,
      inputFont: inputFont,
      theme: theme,
      linksArr: linksArr,
      shopArr: shopArr,
    };
    try {
      const res = await updateProfile(profileData);
      if (res.status == 200) {
        const data = await res.json();
        toast.success(data.message);
        getUserProfile();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelCopylink = () => {
    const profileURL = `${window.location.origin}/${Username}`; // Generate link
    navigator.clipboard
      .writeText(profileURL) // Copy to clipboard
      .then(() => toast.success("Link copied: " + profileURL)) // Show confirmation
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handelShare = () => {
    const shareUrl = `${window.location.origin}/`; // Generate link
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => toast.success("Link copied: " + shareUrl))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const isDashboardActive = location.pathname === "/dashboard";
  const isAnalytics = location.pathname === "/dashboard/analytics";
  const isSettings = location.pathname === "/dashboard/settings";

  return (
    <>
      <div className={styles.main}>
        <div className={styles.sideBar}>
          <div className={styles.logo}>
            <img src={Sparklogo} alt="logo" />
            <h2>Spark</h2>
          </div>
          <div className={styles.sideContainer}>
            <nav className={styles.sidenavbar}>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
                end
              >
                <TfiLayoutAccordionSeparated size={25} /> Links
              </NavLink>
              <NavLink
                to="/dashboard/appearance"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <IoShapesOutline size={25} /> Appearance
              </NavLink>
              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <GrAnalytics size={25} /> Analytics
              </NavLink>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <IoSettingsOutline size={25} /> Settings
              </NavLink>
            </nav>
            <div
              className={styles.UProfile}
              onClick={() => setShowLogout(!showLogout)}
            >
              <div className={styles.ProfileDiv}>
                <img src={profileImage} />
              </div>
              <p>
                {userData.firstname} {userData.lastname}
              </p>
            </div>
            <button
              className={styles.logoutBtn}
              style={{ display: showLogout ? "block" : "none" }}
              onClick={handelLogout}
            >
              <CiLogout />
              Sign out
            </button>
          </div>
        </div>
        <div className={styles.bottomNav}>
          <nav className={styles.bottomnavbar}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
              end
            >
              <TfiLayoutAccordionSeparated size={25} /> Links
            </NavLink>
            <NavLink
              to="/dashboard/appearance"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <IoShapesOutline size={25} /> Appearance
            </NavLink>
            <NavLink
              to="/dashboard/analytics"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <GrAnalytics size={25} /> Analytics
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <IoSettingsOutline size={25} /> Settings
            </NavLink>
          </nav>
        </div>
        <div className={styles.board}>
          <div className={styles.topnav}>
            <div className={styles.userInfo}>
              <h3>
                Hi, {userData.firstname} {userData.lastname}
              </h3>
              <p>Congratulations . You got a great response today . </p>
            </div>
            <button className={styles.shareBtn} onClick={handelCopylink}>
              <CiShare2 size={20} />
              Share
            </button>
          </div>
          <div className={styles.Mobtopnav}>
            <div className={styles.logo}>
              <img src={Sparklogo} alt="logo" />
              <h2>Spark</h2>
            </div>
            <div
              className={styles.UProfileMob}
              onClick={() => setShowLogout(!showLogout)}
            >
              <div className={styles.ProfileDiv}>
                <img src={profileImage} />
              </div>
            </div>
            <button
              className={styles.logoutBtn}
              style={{ display: showLogout ? "block" : "none" }}
              onClick={handelLogout}
            >
              <CiLogout />
              Sign out
            </button>
          </div>
          <div className={styles.workSpaceCont}>
            {!isAnalytics && !isSettings && (
              <div className={styles.previewContainer}>
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
                        className={
                          islink ? styles.activeBtn : styles.defautlBtnColor
                        }
                        onClick={() => setIslink(true)}
                        style={{ color: btnfontColor || "" }}
                      >
                        link
                      </button>
                      <button
                        className={
                          islink ? styles.defautlBtnColor : styles.activeBtn
                        }
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
                                      btnFill && !stylesapp[btnFill]
                                        ? btnFill
                                        : "",
                                    color: btnfontColor || "",
                                    fontFamily: inputFont || "",
                                  }}
                                  key={index}
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
                                      btnFill && !stylesapp[btnFill]
                                        ? btnFill
                                        : "",
                                    color: btnfontColor || "",
                                    fontFamily: inputFont || "",
                                  }}
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
                    <button className={styles.getConnect}>Get Connected</button>
                    <div className={styles.Mobilelogo}>
                      <img src={darkLogo} alt="logo" />
                      <h2>SPARK</h2>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              className={styles.WorkSpace}
              style={{ width: isAnalytics ? "95%" : isSettings ? "95%" : "" }}
            >
              {isDashboardActive ? (
                <LinksSettings
                  profileImage={profileImage}
                  handlePickImage={handlePickImage}
                  handleFileChange={handleFileChange}
                  handleRemoveImage={handleRemoveImage}
                  Username={Username}
                  setUsername={setUsername}
                  userBio={userBio}
                  setUserBio={setUserBio}
                  isAddlink={isAddlink}
                  setIsAddlink={setIsAddlink}
                  setShowAddModel={setShowAddModel}
                  bannerColor={bannerColor}
                  setBannerColor={setBannerColor}
                  fileInputRef={fileInputRef}
                  showToapp={showToapp}
                  setShowToapp={setShowToapp}
                  showShop={showShop}
                  setshowShop={setshowShop}
                  linksArr={linksArr}
                  setLinksArr={setLinksArr}
                  shopArr={shopArr}
                  setShopArr={setShopArr}
                />
              ) : (
                <Outlet />
              )}
            </div>
            <div className={styles.previewBtn}>
              <button onClick={() => setMobilePreviw(!mobilePreview)}>
                <PiEye size={20} /> Preview
              </button>
            </div>
          </div>
          {!isAnalytics && !isSettings && (
            <div className={styles.saveBtn}>
              <button onClick={handelSave}>Save</button>
            </div>
          )}
        </div>
      </div>
      {showAddModel && (
        <Addnewlink
          onClose={() => setShowAddModel(false)}
          isAddlinkShow={isAddlink}
          title={title}
          setTitle={setTitle}
          url={url}
          setUrl={setUrl}
          socialMedia={socialMedia}
          setSocailMedia={setSocailMedia}
          showToapp={showToapp}
          setShowToapp={setShowToapp}
          handeladdLink={handeladdLink}
          ShopTitle={ShopTitle}
          setShopTitle={setShopTitle}
          ShopUrl={ShopUrl}
          setShopLinkUrl={setShopLinkUrl}
          showShop={showShop}
          setshowShop={setshowShop}
          handelShopLink={handelShopLink}
        />
      )}
      {mobilePreview && (
        <>
          <div className={styles.mobilePreviewDiv}>
            <div className={styles.previewContainerMob}>
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
                      className={
                        islink ? styles.activeBtn : styles.defautlBtnColor
                      }
                      onClick={() => setIslink(true)}
                      style={{ color: btnfontColor || "" }}
                    >
                      link
                    </button>
                    <button
                      className={
                        islink ? styles.defautlBtnColor : styles.activeBtn
                      }
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
                                    btnFill && !stylesapp[btnFill]
                                      ? btnFill
                                      : "",
                                  color: btnfontColor || "",
                                  fontFamily: inputFont || "",
                                }}
                                key={index}
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
                                    btnFill && !stylesapp[btnFill]
                                      ? btnFill
                                      : "",
                                  color: btnfontColor || "",
                                  fontFamily: inputFont || "",
                                }}
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
                  <button className={styles.getConnect}>Get Connected</button>
                  <div className={styles.Mobilelogo}>
                    <img src={darkLogo} alt="logo" />
                    <h2>SPARK</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.previewBtn}>
              <button onClick={() => setMobilePreviw(false)}>
                <PiEyeSlashLight size={20} /> Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
