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

export function AvatarImage({ avatar, size }) {
  const [chosenAvatar, setChosenAvatar] = useState("");
  useEffect(() => {
    setChosenAvatar(JSON.parse(localStorage.getItem("currChild"))["avatar"]);
  }, []);

  const dimension = size === "small" ? "48px" : "96px";
  const imgSrc = avatar
    ? `/avatars/${avatar}.png`
    : `/avatars/${chosenAvatar}.png`;

  if (chosenAvatar) {
    return (
      <div>
        <img
          src={imgSrc}
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
