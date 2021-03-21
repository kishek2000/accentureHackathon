/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import BarChart from "./BarChart";
import { useEffect, useState } from "react";

export function TimeSpentGraph() {
  const [childName, setChildName] = useState("");
  useEffect(() => {
    setChildName(JSON.parse(localStorage.getItem("currChild"))["name"]);
  });
  return (
    <div css={{ display: "flex", flexDirection: "column", width: "45%" }}>
      <div css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 600 }}>
        Time Spent
      </div>
      <div css={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 400 }}>
        View the amount of time {childName} has spent in each module!
      </div>
      <GapVertical times={4} />
      <BarChart />
    </div>
  );
}
