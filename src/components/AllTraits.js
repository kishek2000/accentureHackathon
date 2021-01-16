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
        paddingLeft: 64,
        width: "50%",
      }}
    >
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: 36,
        }}
      >
        Traits
      </div>
      <GapVertical times={4} />
      <div css={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 24 }}>
        Jeremy is...
      </div>
      <GapVertical times={4} />
      <Trait
        color="green"
        title="Focused"
        description="Attention span 17% above the median"
      />
      <GapVertical times={6} />
      <Trait
        color="orange"
        title="Communicative"
        description="Scores in commmunication tasks 29% above the median"
      />
      <GapVertical times={6} />
      <Trait
        color="blue"
        title="Auditory"
        description="Jeremy responds 30% better to tasks involving auditory stimuli than visual tasks"
      />
      <GapVertical times={6} />
      <Trait
        color="red"
        title="Slow Learner"
        description="Masters tasks 7% slower than the median"
      />
      <GapVertical times={24} />
      <div css={{ display: "flex", flexDirection: "column" }}>
        <div css={{ fontFamily: "Poppins", fontSize: 36, fontWeight: 600 }}>
          Achievements
        </div>
        <GapVertical times={4} />
        <PerformanceSummary childName={childName} />
      </div>
    </div>
  );
}
