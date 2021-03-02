export const emotionsLessonOne = {
  courseId: "emotions",
  lessonId: "level-1",
  lessonTitle: "What's that emotion?",
  lessonType: "identify",
  prompt: "Tap each person to learn what their emotion is!",
  questions: [
    {
      emotions: [{ src: "happy-man", title: "Happy" }],
      correct: {
        emotion: { src: "happy-man", title: "Happy" },
        commentTitle: "Nice!",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [{ src: "surprised-woman", title: "Surprised" }],
      correct: {
        emotion: { src: "surprised-woman", title: "Surprised" },
        commentTitle: "Nice!",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [{ src: "happy-man", title: "Happy" }],
      correct: {
        emotion: { src: "happy-man", title: "Happy" },
        commentTitle: "Nice!",
        subTitle: "This person is ",
      },
    },
  ],
};

export const emotionsLessonTwo = {
  courseId: "emotions",
  lessonId: "level-2",
  lessonTitle: "What's that emotion?",
  lessonType: "identify",
  prompt: "Tap each person to learn more emotions!",
  questions: [
    {
      emotions: [{ src: "excited-boy", title: "Excited" }],
      correct: {
        emotion: { src: "excited-boy", title: "Excited" },
        commentTitle: "Nice!",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [{ src: "sad-woman", title: "Sad" }],
      correct: {
        emotion: { src: "sad-woman", title: "Sad" },
        commentTitle: "Ok.",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [{ src: "scared-woman", title: "Scared" }],
      correct: {
        emotion: { src: "scared-woman", title: "Scared" },
        commentTitle: "Yep.",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [{ src: "sad-man", title: "Sad" }],
      correct: {
        emotion: { src: "sad-man", title: "Sad" },
        commentTitle: "Yep.",
        subTitle: "This person is ",
      },
    },
  ],
};

export const emotionsLessonThree = {
  courseId: "emotions",
  lessonId: "level-3",
  lessonTitle: "Identify the emotion!",
  lessonType: "multi-match",
  prompt: "From the face, determine the emotion.",
  questionTitle: "What is this emotion?",
  questions: [
    {
      emotions: [{ src: "happy-man", contentType: "image", title: "Happy" }],
      choices: ["Sad", "Angry", "Confused", "Happy"],
      correct: {
        emotion: [{ src: "happy-man", contentType: "image", title: "Happy" }],
        commentTitle: "Well Done!",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [
        { src: "surprised-woman", contentType: "image", title: "Surprised" },
      ],
      choices: ["Disappointed", "Angry", "Confused", "Surprised"],
      correct: {
        emotion: [
          { src: "surprised-woman", contentType: "image", title: "Surprised" },
        ],
        commentTitle: "Well Done!",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [{ src: "happy-man", contentType: "image", title: "Happy" }],
      choices: ["Happy", "Interested", "Sad", "Shocked"],
      correct: {
        emotion: [{ src: "happy-man", contentType: "image", title: "Happy" }],
        commentTitle: "Well Done!",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [{ src: "sad-man", contentType: "image", title: "Sad" }],
      choices: ["Sad", "Interested", "Excited", "Happy"],
      correct: {
        emotion: [{ src: "sad-man", contentType: "image", title: "Sad" }],
        commentTitle: "Ok.",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [
        { src: "excited-boy", contentType: "image", title: "Excited" },
      ],
      choices: ["Excited", "Interested", "Sad", "Shocked"],
      correct: {
        emotion: [
          { src: "excited-boy", contentType: "image", title: "Excited" },
        ],
        commentTitle: "Well Done!",
        subTitle: "This person is ",
      },
    },
  ],
};

export const emotionsLessonFour = {
  courseId: "emotions",
  lessonId: "level-4",
  lessonTitle: "What's that emotion?",
  lessonType: "identify",
  prompt: "Tap each person to learn what their emotion is!",
  questions: [
    {
      emotions: [{ src: "confused-man", title: "Confused" }],
      correct: {
        emotion: { src: "confused-man", title: "Confused" },
        commentTitle: "Yep.",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [{ src: "confused-woman", title: "Confused" }],
      correct: {
        emotion: { src: "confused-woman", title: "Confused" },
        commentTitle: "Yep.",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [{ src: "very-happy-man", title: "Very Happy" }],
      correct: {
        emotion: { src: "very-happy-man", title: "Very Happy" },
        commentTitle: "Nice!",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [{ src: "shocked-man", title: "Shocked" }],
      correct: {
        emotion: { src: "shocked-man", title: "Shocked" },
        commentTitle: "Yep.",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [{ src: "focused-woman", title: "Focused" }],
      correct: {
        emotion: { src: "focused-woman", title: "Focused" },
        commentTitle: "Nice!",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [{ src: "focused-man", title: "Focused" }],
      correct: {
        emotion: { src: "focused-man", title: "Focused" },
        commentTitle: "Nice!",
        subTitle: "This person is ",
      },
    },
  ],
};

export const emotionsLessonFive = {
  courseId: "emotions",
  lessonId: "level-5",
  lessonTitle: "Identify the emotion!",
  lessonType: "multi-match",
  prompt: "From the face, determine the emotion.",
  questionTitle: "What is this emotion?",
  questions: [
    {
      emotions: [
        { src: "focused-man", contentType: "image", title: "Focused" },
      ],
      choices: ["Sad", "Shocked", "Confused", "Focused"],
      correct: {
        emotion: [
          { src: "focused-man", contentType: "image", title: "Focused" },
        ],
        commentTitle: "Well Done!",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [
        { src: "confused-woman", contentType: "image", title: "Confused" },
      ],
      choices: ["Very Happy", "Angry", "Happy", "Confused"],
      correct: {
        emotion: [
          { src: "confused-woman", contentType: "image", title: "Confused" },
        ],
        commentTitle: "Well Done.",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [
        { src: "very-happy-man", contentType: "image", title: "Very Happy" },
      ],
      choices: ["Very Happy", "Interested", "Happy", "Shocked"],
      correct: {
        emotion: [
          { src: "very-happy-man", contentType: "image", title: "Very Happy" },
        ],
        commentTitle: "Well Done!",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [
        { src: "confused-man", contentType: "image", title: "Confused" },
      ],
      choices: ["Confused", "Interested", "Excited", "Happy"],
      correct: {
        emotion: [
          { src: "confused-man", contentType: "image", title: "Confused" },
        ],
        commentTitle: "Well Done.",
        subTitle: "This person is ",
      },
    },
    {
      emotions: [
        { src: "shocked-man", contentType: "image", title: "Shocked" },
      ],
      choices: ["Shocked", "Confused", "Sad", "Happy"],
      correct: {
        emotion: [
          { src: "shocked-man", contentType: "image", title: "Shocked" },
        ],
        commentTitle: "Well Done.",
        subTitle: "This person is ",
      },
    },
  ],
};
