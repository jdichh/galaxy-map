import React, { useState, useEffect } from "react";

const musicFile = "./heleus.mp3";

const MusicPlayer = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    const music = new Audio();
    music.src = musicFile;
    music.preload = "auto";
    music.loop = true;
    music.volume = volume;

    music.addEventListener("error", (event) => {
      console.error("Error loading audio:", event);
    });

    setAudio(music);
  }, []);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audio) {
      if (isMusicPlaying) {
        audio.currentTime = 0;
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [audio, isMusicPlaying]);

  function toggleMusic() {
    setIsMusicPlaying(!isMusicPlaying);
  }

  return (
    <div>
      <button id="music-toggle-button" onClick={toggleMusic}>
        <i
          className={isMusicPlaying ? "fas fa-stop fa-sm" : "fas fa-play fa-sm"}
        ></i>
      </button>
    </div>
  );
};

export default MusicPlayer;