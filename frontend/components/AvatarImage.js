/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useState } from "react";

export const Avatars = [
  "bear",
  "beaver",
  "bird",
  "buffalo",
  "bunny",
  "camel",
  "cat",
  "chicken",
  "dog",
  "monkey",
  "mouse",
  "ostrich",
  "panda",
  "penguin",
  "pig",
  "polar-bear",
  "rabbit",
  "wolf",
];

export function AvatarImage({ size }) {
  const [animal, setAnimal] = useState("");
  useEffect(() => {
    setAnimal(JSON.parse(localStorage.getItem("currChild"))["avatar"]);
  }, []);

  const dimension = size === "small" ? "48px" : "96px";
  if (animal) {
    return (
      <div>
        <img
          src={`/avatars/${animal}.png`}
          css={{
            width: dimension,
            height: dimension,
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
      </div>
    );
  }
  return null;
}
