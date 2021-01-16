export const lesson1 = {
  lesson: "Click the Square",
  questions: [
    {
      shapes: [{ shape: "square", colour: 0 }],
      correctShape: "square",
      difficulty: 1,
      averageTime: 3,
    },
    {
      shapes: [
        { shape: "square", colour: 0 },
        { shape: "circle", colour: 200 },
      ],
      correctShape: "square",
      difficulty: 1,
      averageTime: 5,
    },
    {
      shapes: [
        { shape: "square", colour: 0 },
        { shape: "rectangle", colour: 45 },
        { shape: "rectangle", colour: 300 },
      ],
      correctShape: "square",
      difficulty: 2,
      averageTime: 6,
    },
  ],
};

export const lesson2 = {
  lesson: "Click the Circle",
  questions: [
    {
      shapes: [{ shape: "circle", colour: 200 }],
      correctShape: "circle",
      difficulty: 1,
      averageTime: 3,
    },
    {
      shapes: [
        { shape: "triangle", colour: 90 },
        { shape: "circle", colour: 200 },
      ],
      correctShape: "circle",
      difficulty: 1,
      averageTime: 5,
    },
    {
      shapes: [
        { shape: "circle", colour: 200 },
        { shape: "square", colour: 300 },
        { shape: "triangle", colour: 90 },
        { shape: "explosion", colour: 45 },
      ],
      correctShape: "circle",
      difficulty: 2,
      averageTime: 7,
    },
    {
      shapes: [
        { shape: "circle", colour: 200 },
        { shape: "oval", colour: 300 },
        { shape: "square", colour: 90 },
        { shape: "oval", colour: 45 },
      ],
      correctShape: "circle",
      difficulty: 3,
      averageTime: 7,
    },
  ],
};
