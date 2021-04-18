/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapHorizontal } from "./GapHorizontal";
import { useState } from "react";
import { GapVertical } from "./GapVertical";
import * as themes from '../store/themes';

export function ThemeSettings() {
    const [currTheme, setTheme] = useState();
    return (
        <div>
            <div css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 600 }}>
                Theme Settings
            </div>
            <div css={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 400 }}>
                Pick a theme your child has interest in.
            </div>
            <GapVertical times={6} />
            <form onChange={(e) => {setTheme(e.target.value)}}>
                <select value={currTheme}>
                {Object.keys(themes).sort().map((theme) => (
                    <option value={theme}>{theme}</option>
                ))}
                </select>
            </form>
            <div>
                {currTheme != null && themes[currTheme].map((picLink) => (
                    <img src={'/themes/' + currTheme + '/' + picLink} css={{
                        width: "100px",
                        height: "100px",
                      }} />
                ))}
            </div>

        </div>
    );
}