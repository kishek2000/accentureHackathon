export const coloursLessonOne = {
  courseId: "colours",
  lessonId: "level-1",
  lessonTitle: "What's that colour?",
  lessonType: "identify",
  prompt: "Tap on the colour to discover what it is!",
  questions: [
    {
      colours: [{ src: "square", title: "Red", hue: 0 }],
      correct: {
        colour: { src: "square", title: "Red", hue: 0 },
        commentTitle: "Nice!",
        subTitle: "This is ",
      },
    },
    {
      colours: [{ src: "square", title: "Blue", hue: 240 }],
      correct: {
        colour: { src: "square", title: "Blue", hue: 240 },
        commentTitle: "Nice!",
        subTitle: "This is ",
      },
    },
    {
      colours: [{ src: "square", title: "Red", hue: 0 }],
      correct: {
        colour: { src: "square", title: "Red", hue: 0 },
        commentTitle: "Nice!",
        subTitle: "This is ",
      },
    },
  ],
};

export const coloursLessonTwo = {
  courseId: "colours",
  lessonId: "level-2",
  lessonTitle: "What's that Colour?",
  lessonType: "match",
  prompt: "Select the right colour from the prompt.",
  questionTitle: "Select ",
  questions: [
    {
      colours: [
        { src: "square", title: "Red", hue: 0 },
        { src: "circle", title: "Blue", hue: 240 },
      ],
      correct: {
        colour: { src: "square", title: "Red", hue: 0 },
        commentTitle: "Correct!",
        subTitle: "You clicked ",
      },
    },
    {
      colours: [
        { src: "square", title: "Red", hue: 0 },
        { src: "circle", title: "Blue", hue: 240 },
      ],
      correct: {
        colour: { src: "circle", title: "Blue", hue: 240 },
        commentTitle: "Correct!",
        subTitle: "You clicked ",
      },
    },
    {
      colours: [
        { src: "square", title: "Blue", hue: 240 },
        { src: "circle", title: "Red", hue: 0 },
      ],
      correct: {
        colour: { src: "square", title: "Blue", hue: 240 },
        commentTitle: "Correct!",
        subTitle: "You clicked ",
      },
    },
    {
      colours: [
        { src: "square", title: "Red", hue: 0 },
        { src: "rectangle", title: "Green", hue: 120 },
      ],
      correct: {
        colour: { src: "rectangle", title: "Green", hue: 120 },
        commentTitle: "Correct!",
        subTitle: "You clicked ",
      },
    },
  ],
};

export const coloursLessonThree = {
  courseId: "colours",
  lessonId: "level-3",
  lessonTitle: "What's that Colour?",
  lessonType: "match",
  prompt: "Select the right colour from the prompt.",
  questionTitle: "Select ",
  questions: [
    {
      colours: [
        { src: "square", title: "Red", hue: 0 },
        { src: "circle", title: "Blue", hue: 240 },
        { src: "rectangle", title: "Green", hue: 120 },
      ],
      correct: {
        colour: { src: "square", title: "Red", hue: 0 },
        commentTitle: "Correct!",
        subTitle: "You clicked ",
      },
    },
    {
      colours: [
        { src: "square", title: "Red", hue: 0 },
        { src: "circle", title: "Blue", hue: 240 },
        { src: "triangle", title: "Green", hue: 120 },
      ],
      correct: {
        colour: { src: "circle", title: "Blue", hue: 240 },
        commentTitle: "Correct!",
        subTitle: "You clicked ",
      },
    },
    {
      colours: [
        { src: "triangle", title: "Blue", hue: 240 },
        { src: "circle", title: "Red", hue: 0 },
        { src: "circle", title: "Red", hue: 120 },
      ],
      correct: {
        colour: { src: "triangle", title: "Blue", hue: 240 },
        commentTitle: "Correct!",
        subTitle: "You clicked ",
      },
    },
    {
      colours: [
        { src: "square", title: "Red", hue: 0 },
        { src: "pentagon", title: "Green", hue: 120 },
        { src: "rectangle", title: "Blue", hue: 240 },
      ],
      correct: {
        colour: { src: "pentagon", title: "Green", hue: 120 },
        commentTitle: "Correct!",
        subTitle: "You clicked ",
      },
    },
  ],
};

export const coloursLessonFour = {
  courseId: "colours",
  lessonId: "level-4",
  lessonTitle: "What's that Colour?",
  lessonType: "identify",
  prompt: "Tap on some harder colours to learn what they are!",
  questions: [
    {
      colours: [{ src: "circle", title: "Cyan", hue: 176 }],
      correct: {
        colour: { src: "circle", title: "Cyan", hue: 176 },
        commentTitle: "Nice!",
        subTitle: "You clicked ",
      },
    },
    {
      colours: [{ src: "triangle", title: "Purple", hue: 277 }],
      correct: {
        colour: { src: "triangle", title: "Purple", hue: 240 },
        commentTitle: "Nice!",
        subTitle: "You clicked ",
      },
    },
    {
      colours: [{ src: "square", title: "Pink", hue: 318 }],
      correct: {
        colour: { src: "square", title: "Pink", hue: 318 },
        commentTitle: "Nice!",
        subTitle: "You clicked ",
      },
    },
  ],
};

export const coloursLessonFive = {
  courseId: "colours",
  lessonId: "level-5",
  lessonTitle: "What's that Colour?",
  lessonType: "match",
  prompt: "Select the right colour from the prompt.",
  questionTitle: "Select ",
  questions: [
    {
      colours: [
        { src: "circle", title: "Cyan", hue: 176 },
        { src: "square", title: "Pink", hue: 318 },
      ],
      correct: {
        colour: { src: "circle", title: "Cyan", hue: 176 },
        commentTitle: "Correct!",
        subTitle: "You clicked ",
      },
    },
    {
      colours: [
        { src: "triangle", title: "Purple", hue: 277 },
        { src: "square", title: "Pink", hue: 318 },
      ],
      correct: {
        colour: { src: "triangle", title: "Purple", hue: 277 },
        commentTitle: "Correct!",
        subTitle: "You clicked ",
      },
    },
    {
      colours: [
        { src: "square", title: "Pink", hue: 318 },
        { src: "triangle", title: "Purple", hue: 277 },
        { src: "triangle", title: "Blue", hue: 240 },
      ],
      correct: {
        colour: { src: "square", title: "Pink", hue: 318 },
        commentTitle: "Correct!",
        subTitle: "You clicked ",
      },
    },
    {
      colours: [
        { src: "pentagon", title: "Pink", hue: 318 },
        { src: "circle", title: "Purple", hue: 277 },
        { src: "rectangle", title: "Blue", hue: 240 },
        { src: "rectangle", title: "Red", hue: 0 },
      ],
      correct: {
        colour: { src: "pentagon", title: "Pink", hue: 318 },
        commentTitle: "Correct!",
        subTitle: "You clicked ",
      },
    },
  ],
};
