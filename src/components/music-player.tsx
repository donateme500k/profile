import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const TRACK = "/music/ambient.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(TRACK);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audioRef.current = audio;

    const start = () => {
      audio.play().then(() => setPlaying(true)).catch(() => undefined);
    };
    // Phát khi người dùng tương tác lần đầu ở bất kỳ đâu
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => undefined);
    else { audio.pause(); setPlaying(false); }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Tắt nhạc nền" : "Bật nhạc nền"}
      aria-pressed={playing}
      data-on={playing}
      className="ctl-btn"
    >
      {playing ? <Volume2 size={15} className="text-primary" /> : <VolumeX size={15} className="text-muted-foreground" />}
      {playing && <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />}
    </button>
  );
}

// Alias tương thích ngược
export const MusicPlayer = MusicToggle;
export default MusicToggle;
