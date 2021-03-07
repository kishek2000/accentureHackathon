/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "../components/GapVertical";
import PerformanceSummary from "./PerformanceSummary";
import "./PerformanceSummary.module.css";
import { Trait } from "./Trait";

export function AllTraits({ childName }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "80%",
        paddingTop: 16,
      }}
    >
      <Trait
        color="green"
        title="Focused"
        description="Attention span 17% above the median"
      />
      <Trait
        color="orange"
        title="Communicative"
        description="Scores in commmunication tasks 29% above the median"
      />
      <Trait
        color="blue"
        title="Auditory"
        description="Jeremy responds 30% better to tasks involving auditory stimuli than visual tasks"
      />
      <Trait
        color="red"
        title="Slow Learner"
        description="Masters tasks 7% slower than the median"
      />
    </div>
  );
}
