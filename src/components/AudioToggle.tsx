import { useEffect, useRef } from "react";
import { useUI } from "../context/UIContext";

export default function AudioToggle() {
  const { audioMuted, setAudioMuted } = useUI();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element once on mount
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

  // Play / pause whenever muted state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audioMuted) {
      audio.play().catch(() => {
        // Autoplay blocked by browser; revert to muted
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
      className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
      style={{ color: "var(--fg)", fontFamily: "var(--font-ui)" }}
    >
      {audioMuted ? "Sound Off" : "Sound On"}
    </button>
  );
}
