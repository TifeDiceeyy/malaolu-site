import { useEffect, useRef } from "react";
import { useUI } from "../context/UIContext";

export default function AudioToggle() {
  const { audioMuted, setAudioMuted } = useUI();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.preload = "none";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audioMuted) {
      audio.play().catch(() => {
        setAudioMuted(true);
        sessionStorage.setItem("audioMuted", "true");
      });
    } else {
      audio.pause();
    }
  }, [audioMuted, setAudioMuted]);

  const toggle = () => {
    const next = !audioMuted;
    setAudioMuted(next);
    sessionStorage.setItem("audioMuted", String(next));
  };

  return (
    <button
      type="button"
      aria-pressed={!audioMuted}
      aria-label={audioMuted ? "Unmute ambient audio" : "Mute ambient audio"}
      onClick={toggle}
      className="fixed bottom-6 left-6 z-30 text-[0.6rem] tracking-[0.28em] uppercase hover:opacity-60 transition-opacity duration-300"
      style={{ color: "var(--fg)", fontFamily: "var(--font-ui)" }}
    >
      {audioMuted ? "unmute" : "mute"}
    </button>
  );
}
