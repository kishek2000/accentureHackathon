export const actionsLessonOne = {
  courseId: "actions",
  lessonId: "level-1",
  lessonTitle: "Copy the action!",
  lessonType: "copy",
  prompt: "Copy the action shown, and learn what it's called!",
  questionTitle: "Copy the action:",
  questions: [
    {
      actions: [{ src: "wave.mp4", contentType: "video", title: "Waving" }],
      correct: {
        action: [{ src: "wave.mp4", contentType: "video", title: "Waving" }],
        commentTitle: "Well Done!",
        subTitle: "You just did ",
      },
    },
  ],
};

export const actionsLessonTwo = {
  courseId: "actions",
  lessonId: "level-2",
  lessonTitle: "Copy the action!",
  lessonType: "copy",
  prompt: "Copy the action shown, and learn what it's called!",
  questionTitle: "Copy the action:",
  questions: [
    {
      actions: [
        { src: "handshake.mp4", contentType: "video", title: "Handshaking" },
      ],
      correct: {
        action: [
          { src: "handshake.mp4", contentType: "video", title: "Handshaking" },
        ],
        commentTitle: "Well Done!",
        subTitle: "You just did ",
      },
    },
  ],
};

export const actionsLessonThree = {
  courseId: "actions",
  lessonId: "level-3",
  lessonTitle: "Identify the action!",
  lessonType: "multi-match",
  prompt: "Observe the action and choose the right label!",
  questionTitle: "What is this action?",
  questions: [
    {
      actions: [{ src: "wave.mp4", contentType: "video", title: "Waving" }],
      choices: ["Pointing", "Jumping", "Walking", "Waving"],
      correct: {
        action: [{ src: "wave.mp4", contentType: "video", title: "Waving" }],
        commentTitle: "Well Done!",
        subTitle: "This is ",
      },
    },
    {
      actions: [
        { src: "handshake.mp4", contentType: "video", title: "Handshaking" },
      ],
      choices: ["Pointing", "Jumping", "Walking", "Handshaking"],
      correct: {
        action: [
          { src: "handshake.mp4", contentType: "video", title: "Handshaking" },
        ],
        commentTitle: "Well Done!",
        subTitle: "This is ",
      },
    },
    {
      actions: [
        { src: "boy-pointing", contentType: "image", title: "Pointing" },
      ],
      choices: ["Pointing", "Jumping", "Walking", "Handshaking"],
      correct: {
        action: [
          { src: "boy-pointing", contentType: "image", title: "Pointing" },
        ],
        commentTitle: "Well Done!",
        subTitle: "He is ",
      },
    },
  ],
};

export const actionsLessonFour = {
  courseId: "actions",
  lessonId: "level-4",
  lessonTitle: "Copy the action!",
  lessonType: "copy",
  prompt: "Listen to the instruction, and do the action!",
  questionTitle: "Listen to the audio and do the action.",
  questions: [
    {
      actions: [{ src: "clap.mp3", contentType: "audio", title: "Clap" }],
      correct: {
        action: [{ src: "clap.mp3", contentType: "audio", title: "Clap" }],
        commentTitle: "Well Done!",
        subTitle: "You just did a ",
      },
    },
  ],
};

export const actionsLessonFive = {
  courseId: "actions",
  lessonId: "level-5",
  lessonTitle: "Copy the action!",
  lessonType: "copy",
  prompt: "Listen to the instruction, and do the action!",
  questionTitle: "Listen to the audio and do the action.",
  questions: [
    {
      actions: [
        {
          src: "point-yourself.mp3",
          contentType: "audio",
          title: "Point at yourself",
        },
      ],
      correct: {
        action: [
          {
            src: "point-yourself.mp3",
            contentType: "audio",
            title: "Pointed at yourself",
          },
        ],
        commentTitle: "Nice!",
        subTitle: "You just ",
      },
    },
  ],
};
