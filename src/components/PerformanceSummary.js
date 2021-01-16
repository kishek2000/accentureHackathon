/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { topicAnalytics } from "../store/data";
import React, { useState } from "react";
import "./PerformanceSummary.module.css";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

const PerformanceSummary = ({ childName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const items = topicAnalytics.map((eachTopic, i) => {
    return {
      src:
        "https://images.unsplash.com/photo-1473662711507-13345f9d447c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3450&q=80",
      altText: eachTopic.label,
      header: eachTopic.label,
      caption: `
                ${childName} has improved their proficiency in 
                ${" " + eachTopic.label} by ${
        eachTopic.lastWeekChange
      } since last week and
                ${" " + eachTopic.lastMonthChange} since last month. 
                ${" "}Click here for ${childName}'s next challenge in ${
        eachTopic.label
      }`,
    };
  });

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img
          src={item.src}
          alt={item.altText}
          css={{ maxHeight: 400, width: "100%", filter: "brightness(70%)" }}
        />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.header}
          style={{ fontFamily: "Poppins" }}
        />
      </CarouselItem>
    );
  });

  return (
    <div css={{ width: "100%" }}>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};

export default PerformanceSummary;
