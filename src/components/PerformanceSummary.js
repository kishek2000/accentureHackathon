import { topicAnalytics } from '../store/data';
import React, { useState} from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
  


const PerformanceSummary = ({ childName }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const items = topicAnalytics.map((eachTopic, i) => {
        return {
            src: 'https://www.robin-noorda.com/uploads/1/6/8/3/16830688/3347022_orig.jpg',
            altText: eachTopic.label,
            header: eachTopic.label,
            caption: `
                ${childName} has improved their proficiency in 
                ${" " + eachTopic.label} by ${eachTopic.lastWeekChange} since last week and
                ${" " + eachTopic.lastMonthChange} since last month. 
                ${" "}Click here for ${childName}'s next challenge in '___COURSE NAME HERE___'`
        }
    });

    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <a href="https://www.google.com">
            <CarouselCaption captionText={item.caption} captionHeader={item.header} />
          </a>
        </CarouselItem>
      );
    });
  
    return (
        <>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </>
    );
  }
  
  export default PerformanceSummary;