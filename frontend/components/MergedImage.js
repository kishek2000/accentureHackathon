/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import mergeImages from 'merge-images';
import {useState} from 'react';

export function MergedImage({mediaPrefix, media, setRevealItem, themeImage}) {
    const [imgSrc, setImgSrc] = useState(0);
    console.log(themeImage);
    mergeImages([
      `${mediaPrefix}${media.src}.png`,
      `/themes/pets/` + themeImage
    ])
      .then((src) => {
        setImgSrc(src);
      }).catch(err => console.log(err.toString()));
    return (<img
      src={imgSrc}
      css={{
        filter: media.hue ? `hue-rotate(${media.hue}deg)` : null,
        cursor: "pointer",
        width: 300,
      }}
      draggable={false}
      onClick={() => {
        setRevealItem(true);
      }}
    />);
  }