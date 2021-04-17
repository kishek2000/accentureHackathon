/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import mergeImages from 'merge-images';
import {useState} from 'react';

export function MergedImage({mediaPrefix, media, setRevealItem, themeImage}) {
    if (mediaPrefix != `/shapes/`) {
        return (<img
            src={`${mediaPrefix}${media.src}.png`}
            css={{
              filter: media.hue ? `hue-rotate(${media.hue}deg)` : null,
              cursor: "pointer",
              width: 300,
            }}
            draggable={false}
            onClick={() => {
              setRevealItem(true);
            }}
          />)
    }
    const [imgSrc, setImgSrc] = useState(0);
    mergeImages([
      `${mediaPrefix}${media.src}.png`,
      `/themes/` + themeImage
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