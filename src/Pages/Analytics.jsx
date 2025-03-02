import React, { useEffect, useState } from "react";
import { getAnalytics } from "../services/dashboardApi";
import styles from "../PageStyles/analytics.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analytics = () => {
  const [Analtricsdata, setAnaltricsdata] = useState();
  const getAnalyticsData = async () => {
    try {
      const res = await getAnalytics();
      const data = await res.json();
      if (res.status == 200) {
        console.log(data);
        setAnaltricsdata(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"];
  const Clicksdata = months.map((month, index) => {
    const monthKey = `${month}`;
    return {
      name: month,
      uv: Analtricsdata?.monthlyClicks?.[monthKey] || 0,
      pv: Analtricsdata?.totalCTA || 0,
    };
  });

  const deviceClicksArray = Analtricsdata?.deviceClicks
    ? Object.entries(Analtricsdata.deviceClicks).map(([device, clicks]) => ({
        device,
        clicks,
      }))
    : [];

  useEffect(() => {
    getAnalyticsData();
  }, []);

  const socailData = [
    {
      name: "Youtube",
      value: Analtricsdata?.socialMediaClicks?.YouTube || 0,
      color: "#165534",
    },
    {
      name: "Facebook",
      value: Analtricsdata?.socialMediaClicks?.Facebook || 0,
      color: "#3EE58F",
    },
    {
      name: "Instagram",
      value: Analtricsdata?.socialMediaClicks?.Instagram || 0,
      color: "#94E9B8",
    },
    {
      name: "Other",
      value: Analtricsdata?.socialMediaClicks?.Twitter || 0,
      color: "#21AF66",
    },
  ];

  const COLORS = ["#165534", "#3EE58F", "#94E9B8", "#21AF66"];

  const linkTrafficData = Analtricsdata && Analtricsdata?.linkClicks;

  return (
    <div className={styles.main}>
      <div className={styles.OverviewCont}>
        <h2>Overview</h2>
        <div className={styles.Overview}>
          <div className={styles.clickonLink}>
            <h4>Clicks on Links</h4>
            <h3>{Analtricsdata && Analtricsdata.totalLinkClicks}</h3>
          </div>
          <div className={styles.clickonShop}>
            <h4>Clicks on Shop</h4>
            <h3>{Analtricsdata && Analtricsdata.totalShopClicks}</h3>
          </div>
          <div className={styles.clickonShop}>
            <h4>CTA</h4>
            <h3>{Analtricsdata && Analtricsdata.totalCTA}</h3>
          </div>
        </div>
      </div>
      {/* line chart */}
      <div className={styles.barGraph}>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            width={1200}
            height={400}
            data={Clicksdata}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="0 1" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} padding={{ bottom: 20 }} />
            <Legend />
            <Line stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#777" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.MixedGraphs}>
        {/* Bar graph */}
        <div className={styles.deviceGraph}>
          <h3>Traffic by device</h3>
          <ResponsiveContainer width="100%" aspect={1.5}>
            <BarChart
              width={500}
              height={350}
              data={deviceClicksArray}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="0 1" />
              <XAxis dataKey="device" axisLine={false} tickLine={false} />
              <YAxis
                width={10}
                axisLine={false}
                tickLine={false}
                padding={{ bottom: 20 }}
              />
              <Bar dataKey="clicks" barSize={40} radius={10}>
                {" "}
                {linkTrafficData &&
                  linkTrafficData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        [
                          "#92FFC6",
                          "#9BEBC1",
                          "#165534",
                          "#3EE58F",
                          "#A1D4BA",
                          "#21AF66",
                        ][index]
                      }
                    />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pi-chart */}
        <div className={styles.siteGraph}>
          <div className={styles.piChartDiv}>
            <h3>Sites</h3>
              <PieChart width={300} height={400}>
                <Pie
                  data={socailData}
                  cx={130}
                  cy={180}
                  innerRadius={70}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {socailData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
          </div>
          <div className={styles.pichartTable}>
            {socailData &&
              socailData.map((item, index) => (
                <div key={index}>
                  <div>
                    <div
                      className={styles.ytdot}
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <p>{item.name}</p>
                  </div>
                  <p>{item.value}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Bar charts */}
      <div className={styles.trafficbylink}>
        <div className={styles.deviceGraph}>
        <h3>Traffic by links</h3>
            <BarChart
              width={600}
              height={350}
              data={linkTrafficData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="0 1" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis
                width={10}
                axisLine={false}
                tickLine={false}
                padding={{ bottom: 20 }}
              />
              <Bar dataKey="value" barSize={40} radius={10}>
                {" "}
                {/* Adjust barSize for width */}
                {linkTrafficData &&
                  linkTrafficData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        [
                          "#92FFC6",
                          "#9BEBC1",
                          "#165534",
                          "#3EE58F",
                          "#A1D4BA",
                          "#21AF66",
                        ][index]
                      }
                    />
                  ))}
              </Bar>
            </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
