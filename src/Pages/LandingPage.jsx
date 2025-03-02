import React from "react";
import styles from "../PageStyles/landinpage.module.css";
import sparklogo from "../assets/sparklogo.svg";
import analyticsBanner from "../assets/Analytics 1.png";
import price from "../assets/price.svg";
import squareBan1 from "../assets/square01.webp.png";
import squareBan2 from "../assets/square02.webp.png";
import squareBan3 from "../assets/squarklogo03.png";
import Staricon from "../assets/Staricon.svg";
import Integ1 from "../assets/Integrations/Integ1.svg";
import Integ2 from "../assets/Integrations/Integ2.svg";
import Integ3 from "../assets/Integrations/Integ3.svg";
import Integ4 from "../assets/Integrations/Integ4.svg";
import Integ5 from "../assets/Integrations/Integ5.svg";
import Integ6 from "../assets/Integrations/Integ6.svg";
import Integ7 from "../assets/Integrations/Integ7.svg";
import Integ8 from "../assets/Integrations/Integ8.svg";
import Integ9 from "../assets/Integrations/Integ9.svg";
import SparkBlack from "../assets/SparkiconBlack.svg";
import { FaTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.headnav}>
        <div className={styles.logo}>
          <img src={sparklogo} alt="Spark Logo" />
          <h2>
            SPARK<span>&trade;</span>
          </h2>
          <p>Marketplace</p>
        </div>
        <button className={styles.adminBtn}>Admin</button>
        <button
          className={styles.signButton}
          onClick={() => navigate("/register")}
        >
          Sign up free
        </button>
        <FaBars size={30} className={styles.burgerBar} />
      </div>
      <div className={styles.heroSection}>
        <div className={styles.herotop}>
          <div className={styles.herotopinfo}>
            <h1>
              The easiest place to <br /> update and share your <br />{" "}
              Connection
            </h1>
            <p>
              Help your followers discover everything you’re sharing  all
              over the internet, in one simple place. They’ll thank  you
              for it!
            </p>
            <button onClick={() => navigate("/register")}>
              Get your free spark
            </button>
          </div>
          <div className={styles.imageDiv}>
            <img src={analyticsBanner} alt="Analytics Banner" />
          </div>
        </div>
        <div className={styles.heroSecond}>
          <div className={styles.secondBanner}>
            <img src={price} alt="Price banner" />
            <p>
              Sell products and collect payments. It’s <br /> monetization made
              simple.
            </p>
          </div>
          <div className={styles.secondInfo}>
            <h1>Analyze your audience and keep your followers engaged</h1>
            <p>
              Track your engagement over time, monitor revenue and learn <br />
              what’s converting your audience. Make informed updates on the fly
              <br /> to keep them coming back.
            </p>
          </div>
        </div>
        <div className={styles.heroThird}>
          <div className={styles.secondInfo}>
            <h1>Share limitless content in limitless ways</h1>
            <p>
              Connect your content in all its forms and help followers find more
              of what they’re looking for. Your TikToks, Tweets, YouTube videos,
              music, articles, recipes, podcasts and more… It all comes together
              in one powerful place
            </p>
          </div>
          <div className={styles.thirdBanner}>
            <div className={styles.thirdBannerImgDiv}>
              <img src={squareBan1} alt="squarebanner1" />
              <img src={squareBan2} alt="squarebanner2" />
              <img src={squareBan3} alt="squarebanner3" />
            </div>
            <p>Share your content in limitless <br /> ways on  your Spark</p>
          </div>
        </div>
        <div className={styles.heroFour}>
          <div className={styles.herofourhedline}>
            <h1>
              Here's what our <span>customer</span> <br />
              has to says
            </h1>
            <button>Read customer stories</button>
          </div>
          <div className={styles.herofourInfo}>
            <img src={Staricon} alt="star logo" />
            <p>
              [short description goes in here] lorem <br /> ipsum is a
              placeholder text to <br /> demonstrate.
            </p>
          </div>
        </div>
        <div className={styles.heroFive}>
          <div className={styles.girdtestmonilas}>
            <div className={styles.testimonials}>
              <h2>Amazing tool! Saved me months</h2>
              <p>
                This is a placeholder for your testimonials and what your client
                has to  say, put them here and make sure its 100% true and
                meaningful.
              </p>
              <div className={styles.avtar}>
                <div></div>
                <p>
                  John Master <br />
                  Director, Spark.com
                </p>
              </div>
            </div>
            <div className={styles.testimonials}>
              <h2>Amazing tool! Saved me months</h2>
              <p>
                This is a placeholder for your testimonials and what your client
                has to <br /> say, put them here and make sure its 100% true and
                meaningful.
              </p>
              <div className={styles.avtar}>
                <div></div>
                <p>
                  John Master <br />
                  Director, Spark.com
                </p>
              </div>
            </div>
            <div className={styles.testimonials}>
              <h2>Amazing tool! Saved me months</h2>
              <p>
                This is a placeholder for your testimonials and what your client
                has to <br /> say, put them here and make sure its 100% true and
                meaningful.
              </p>
              <div className={styles.avtar}>
                <div></div>
                <p>
                  John Master <br />
                  Director, Spark.com
                </p>
              </div>
            </div>
            <div className={styles.testimonials}>
              <h2>Amazing tool! Saved me months</h2>
              <p>
                This is a placeholder for your testimonials and what your client
                has to <br /> say, put them here and make sure its 100% true and
                meaningful.
              </p>
              <div className={styles.avtar}>
                <div></div>
                <p>
                  John Master <br />
                  Director, Spark.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heroSix}>
          <h1>All Link Apps and Integrations</h1>
          <div className={styles.heroSixGrid}>
            <div className={styles.Integ}>
              <img src={Integ1} alt="Integ1" />
              <div className={styles.IntegName}>
                <h4>Audiomack</h4>
                <p>
                  Add an Audiomack player to your <br /> Linktree
                </p>
              </div>
            </div>
            <div className={styles.Integ}>
              <img src={Integ2} alt="Integ2" />
              <div className={styles.IntegName}>
                <h4>Bandsintown</h4>
                <p>Drive ticket sales by listing your events</p>
              </div>
            </div>
            <div className={styles.Integ}>
              <img src={Integ3} alt="Integ3" />
              <div className={styles.IntegName}>
                <h4>Bonfire</h4>
                <p>Display and sell your custom merch</p>
              </div>
            </div>
            <div className={styles.Integ}>
              <img src={Integ4} alt="Integ4" />
              <div className={styles.IntegName}>
                <h4>Books</h4>
                <p>Promote books on your Linktree</p>
              </div>
            </div>
            <div className={styles.Integ}>
              <img src={Integ5} alt="Integ5" />
              <div className={styles.IntegName}>
                <h4>Buy Me A Gift</h4>
                <p>Let visitors support you with a small gift</p>
              </div>
            </div>
            <div className={styles.Integ}>
              <img src={Integ6} alt="Integ6" />
              <div className={styles.IntegName}>
                <h4>Cameo</h4>
                <p>
                  Make impossible fan connections <br /> possible
                </p>
              </div>
            </div>
            <div className={styles.Integ}>
              <img src={Integ7} alt="Integ7" />
              <div className={styles.IntegName}>
                <h4>Clubhouse</h4>
                <p>
                  Let your community in on the <br /> conversation
                </p>
              </div>
            </div>
            <div className={styles.Integ}>
              <img src={Integ8} alt="Integ8" />
              <div className={styles.IntegName}>
                <h4>Community</h4>
                <p>Build an SMS subscriber list</p>
              </div>
            </div>
            <div className={styles.Integ}>
              <img src={Integ9} alt="Integ9" />
              <div className={styles.IntegName}>
                <h4>Contact Details</h4>
                <p>
                  Easily share downloadable <br /> contact details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerLanding}>
        <div className={styles.options}>
          <div className={styles.footerBtns}>
            <button
              className={styles.footerLogin}
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
            <button
              className={styles.footerSignUp}
              onClick={() => navigate("/register")}
            >
              Sign up free
            </button>
          </div>
          <div className={styles.OptinList}>
            {["About Spark", "Blog", "Press", "Social Good", "Contact"].map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </div>
          <div className={styles.OptinList}>
            {[
              "Careers",
              "Getting Started",
              "Features and How-Tos",
              "FAQs",
              "Report a Violation",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </div>
          <div className={styles.OptinList}>
            {[
              "Terms and Conditions",
              "Privacy Policy",
              "Cookie Notice",
              "Trust Center",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </div>
        </div>
        <div className={styles.bottomOptn}>
          <p>
            We acknowledge the Traditional Custodians of the land on which our
            office stands, The Wurundjeri <br /> people of the Kulin Nation, and
            pay our respects to Elders past, present and emerging.
          </p>
          <div className={styles.footerDownbtns}>
            <button
              className={styles.adminBtnfoot}
            >
              Admin
            </button>
            <button
              className={styles.footerSignUp}
              onClick={() => navigate("/register")}
            >
              Sign up free
            </button>
          </div>
          <div>
            <FaTwitter size={30} />
            <RiInstagramFill size={30} />
            <FaYoutube size={30} />
            <FaTiktok size={30} />
            <img src={SparkBlack} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
