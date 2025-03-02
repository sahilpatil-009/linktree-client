import React, { useState } from "react";
import styles from "../PageStyles/apperance.module.css";
import { FaBars } from "react-icons/fa";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { BiSolidCarousel } from "react-icons/bi";
import AirBlack from "../assets/Themes/AirBlack.svg";
import AirGray from "../assets/Themes/AirGray.svg";
import AirSmoke from "../assets/Themes/AirSmoke.svg";
import AirSnow from "../assets/Themes/AirSnow.svg";
import MineralBlue from "../assets/Themes/MineralBlue.svg";
import MineralGreen from "../assets/Themes/MineralGreen.svg";
import MineralOrange from "../assets/Themes/MineralOrange.svg";
import { useAppearance } from "../Contexts/AppearanceContext";

const Appearance = () => {

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
    setTheme
  } = useAppearance();

  const [userInputFont, setuserInputFont] = useState("");
  const [userFontColor, setUserFontColor] = useState("");
  const [userBtnBack, setUserBtnBack] = useState("#ffffffff");

  return (
    <>
      {/* layout settings */}
      <div className={styles.layoutCont}>
        <h2>Layout</h2>
        <div className={styles.layoutSetting}>
          <button
            onClick={() => setLayout("stack")}
            style={{ border: Layout == "stack" ? "1px solid black" : "" }}
          >
            <FaBars size={40} />
          </button>
          <button
            onClick={() => setLayout("Grid")}
            style={{ border: Layout == "Grid" ? "1px solid black" : "" }}
          >
            <TfiLayoutGrid2Alt size={40} />
          </button>
          <button
            onClick={() => setLayout("Carousel")}
            style={{ border: Layout == "Carousel" ? "1px solid black" : "" }}
          >
            <BiSolidCarousel size={45} />
          </button>
        </div>
      </div>
      {/* Buttons settings */}
      <div className={styles.buttonsCont}>
        <h2>Buttons</h2>
        <div className={styles.buttonSetting}>
          <div className={styles.fillBtn}>
            <p>Fill</p>
            <div className={styles.Btnstyles}>
              <button
                className={styles.btnStylOne}
                onClick={() => setbtnFill("SquareFill")}
                style={{ border: btnFill == "SquareFill" ? "2px solid blue" : "" }}
              ></button>
              <button
                className={styles.btnStylTwo}
                onClick={() => setbtnFill("SemiCylinderFill")}
                style={{
                  border: btnFill == "SemiCylinderFill" ? "2px solid blue" : "",
                }}
              ></button>
              <button
                className={styles.btnStylThree}
                onClick={() => setbtnFill("CylinderFill")}
                style={{
                  border: btnFill == "CylinderFill" ? "2px solid blue" : "",
                }}
              ></button>
            </div>
          </div>
          <div className={styles.fillBtn}>
            <p>Outline</p>
            <div className={styles.Btnstyles}>
              <button
                className={styles.OutlineOne}
                onClick={() => setbtnOutline("SquareOutline")}
                style={{
                  border: btnOutline == "SquareOutline" ? "2px solid blue" : "",
                }}
              ></button>
              <button
                className={styles.OutlineTwo}
                onClick={() => setbtnOutline("SemiCylinderOutline")}
                style={{
                  border: btnOutline == "SemiCylinderOutline" ? "2px solid blue" : "",
                }}
              ></button>
              <button
                className={styles.OutlineThree}
                onClick={() => setbtnOutline("CylinderOutline")}
                style={{
                  border: btnOutline == "CylinderOutline" ? "2px solid blue" : "",
                }}
              ></button>
            </div>
          </div>
          <div className={styles.fillBtn}>
            <p>Hard shadow</p>
            <div className={styles.Btnstyles}>
              <button
                className={styles.shadowOne}
                onClick={() => setbtnShadow("SquareShadow")}
                style={{
                  border: btnShadow == "SquareShadow" ? "2px solid blue" : "",
                }}
              ></button>
              <button
                className={styles.shadowTwo}
                onClick={() => setbtnShadow("SemiCylinderShadow")}
                style={{
                  border: btnShadow == "SemiCylinderShadow" ? "2px solid blue" : "",
                }}
              ></button>
              <button
                className={styles.shadowThree}
                onClick={() => setbtnShadow("CylinderShadow")}
                style={{
                  border: btnShadow == "CylinderShadow" ? "2px solid blue" : "",
                }}
              ></button>
            </div>
          </div>
          <div className={styles.fillBtn}>
            <p>Soft shadow</p>
            <div className={styles.Btnstyles}>
              <button
                className={styles.shadowSoftOne}
                onClick={() => setbtnShadow("SquareSoftShadow")}
                style={{
                  border: btnShadow == "SquareSoftShadow" ? "2px solid blue" : "",
                }}
              ></button>
              <button
                className={styles.shadowSoftTwo}
                onClick={() => setbtnShadow("SemiCylinderSoftShadow")}
                style={{
                  border: btnShadow == "SemiCylinderSoftShadow" ? "2px solid blue" : "",
                }}
              ></button>
              <button
                className={styles.shadowSoftThree}
                onClick={() => setbtnShadow("CylinderSoftShadow")}
                style={{
                  border: btnShadow == "CylinderSoftShadow" ? "2px solid blue" : "",
                }}
              ></button>
            </div>
          </div>
          <div className={styles.uniqueColors}>
            <p className={styles.headline}>Button Color</p>
            <div>
              <div
                className={styles.uniqColor}
                style={{ backgroundColor: `${userBtnBack}` }}
                onClick={() => setbtnFill(userBtnBack)}
              ></div>
              <input
                type="text"
                placeholder="#ffffffff"
                onChange={(e) => setUserBtnBack(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.uniqueColors}>
            <p className={styles.headline}>Button font color</p>
            <div>
              <div
                className={styles.uniqColor}
                style={{ backgroundColor: `${btnfontColor}` }}
                onClick={() => setbtnfontColor(btnfontColor)}
              ></div>
              <input
                type="text"
                placeholder="#8888"
                onChange={(e) => setbtnfontColor(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* fonts settings */}
        <div className={styles.fontsSettng}>
          <h2>Fonts</h2>
          <div className={styles.fontsSettngCont}>
            <div className={styles.fontuserSetings}>
              <p className={styles.headline}>Fonts</p>
              <div className={styles.selectfonts}>
                <div className={styles.uniqFont} style={{fontFamily: userInputFont || ""}} onClick={()=>setinputFont(userInputFont)}>
                  <h2>Aa</h2>
                </div>
                <input type="text" className={styles.userFonts} onChange={(e)=>setuserInputFont(e.target.value)} placeholder="DM Sans" />
              </div>
            </div>
            <div className={styles.uniqueColors}>
              <p className={styles.headline}>Color</p>
              <div>
                <div
                  className={styles.uniqColor}
                  style={{ backgroundColor: `${userFontColor}` }}
                  onClick={() => setInputFontColor(userFontColor)}
                ></div>
                <input
                  type="text"
                  placeholder="#00000000"
                  onChange={(e) => setUserFontColor(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Themes */}
        <div className={styles.themesCont}>
          <h2>Themes</h2>
          <div className={styles.themeSettings}>
            <div className={styles.themeBoxs}>
              <div className={styles.themeBox}>
                <img src={AirSnow} onClick={()=>setTheme("AirSnow")} style={{border: theme == "AirSnow" ? "1px solid #35CA7D" : "" }} />
                <p>Air Snow</p>
              </div>
              <div className={styles.themeBox}>
                <img src={AirGray} onClick={()=>setTheme("AirGray")} style={{border: theme == "AirGray" ? "1px solid #35CA7D" : "" }} />
                <p>Air Gray</p>
              </div>
              <div className={styles.themeBox}>
                <img src={AirSmoke} onClick={()=>setTheme("AirSmoke")} style={{border: theme == "AirSmoke" ? "1px solid #35CA7D" : "" }} />
                <p>Air Smoke</p>
              </div>
              <div className={styles.themeBox}>
                <img src={AirBlack} onClick={()=>setTheme("AirBlack")} style={{border: theme == "AirBlack" ? "1px solid #35CA7D" : "" }} />
                <p>Air Black</p>
              </div>
              <div className={styles.themeBox}>
                <img src={MineralBlue} onClick={()=>setTheme("MineralBlue")} style={{border: theme == "MineralBlue" ? "1px solid #35CA7D" : "" }} />
                <p>Mineral Blue</p>
              </div>
              <div className={styles.themeBox}>
                <img src={MineralGreen} onClick={()=>setTheme("MineralGreen")} style={{border: theme == "MineralGreen" ? "1px solid #35CA7D" : "" }} />
                <p>Mineral Green</p>
              </div>
              <div className={styles.themeBox}>
                <img src={MineralOrange} onClick={()=>setTheme("MineralOrange")} style={{border: theme == "MineralOrange" ? "1px solid #35CA7D" : "" }} />
                <p>Mineral Orange</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appearance;
