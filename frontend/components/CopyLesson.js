/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";

export function CopyLesson({ questionData, questionTitle, setIsDone }) {
  if (questionData) {
    var mediaData = [];
    if (questionData.actions) {
      console.log({ questionData });
      mediaData = questionData.actions[0];
    }
    return (
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <GapVertical times={24} />
        <div css={{ fontFamily: "Poppins", fontSize: 28, fontWeight: 400 }}>
          {questionTitle}
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <GapVertical times={8} />
          {mediaData.contentType === "video" ? (
            <video
              src={`/action-videos/${mediaData.src}`}
              css={{ width: 480 }}
              controls={true}
            />
          ) : (
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                css={{ fontFamily: "Poppins", fontSize: 48, fontWeight: 500 }}
              >
                {mediaData.title}
              </div>
              <audio
                src={`/action-audios/${mediaData.src}`}
                controls={true}
                controlsList={"nodownload"}
              />
            </div>
          )}
          <GapVertical times={12} />
          <div
            css={{ fontFamily: "Poppins", fontSize: 16, cursor: "pointer" }}
            onClick={() => setIsDone(true)}
          >
            {"DONE"}
          </div>
        </div>
      </div>
    );
  }
  return null;
}
