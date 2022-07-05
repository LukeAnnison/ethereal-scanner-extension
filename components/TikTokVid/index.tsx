// build a component to display a tik tok video and information about the video
import React from "react";
import { useState, useEffect } from "react";
import styles from "./tikTokVid.module.scss";
import Router, { useRouter } from "next/router";

interface Props {
  video: any;
  setExit: (e: any) => void;
  setHovered: (e: any) => void;
  hovered: boolean;
}

const TikTokVid = ({ video, setHovered, hovered, setExit }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(
      `https://www.tiktok.com/@${video.author}/video/${video.video.id}?is_copy_url=1&is_from_webapp=v1`
    );
  };

  // hover and detects state

  return (
    <div
      onMouseEnter={setHovered}
      onMouseLeave={setExit}
      className={styles.container}
      onClick={handleClick}
    >
      {!hovered ? (
        <img className={styles.video} src={video.video.dynamicCover}></img>
      ) : (
        <video
          controls
          autoPlay
          className={styles.video}
          src={video.video.playAddr}
        ></video>
      )}
    </div>
  );
};

export default TikTokVid;
