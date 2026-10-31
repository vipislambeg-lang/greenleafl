"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { BASE } from "@/lib/basepath";
import { Reveal } from "./reveal";

// Пути к файлам видео: достаточно положить файлы в public/videos —
// секция сама их найдёт, код менять не нужно.
const VIDEO_SRC = BASE + "/videos/company.mp4";
const POSTER_SRC = BASE + "/videos/company-poster.jpg";

type CheckState = "checking" | "exists" | "missing";

/** Проверяет наличие файла HEAD-запросом, чтобы секция адаптировалась сама. */
function useFileExists(src: string): CheckState {
  const [state, setState] = useState<CheckState>("checking");

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    fetch(src, { method: "HEAD", signal: controller.signal })
      .then((res) => {
        if (alive) setState(res.ok ? "exists" : "missing");
      })
      .catch(() => {
        if (alive) setState("missing");
      });

    return () => {
      alive = false;
      controller.abort();
    };
  }, [src]);

  return state;
}

/**
 * Видео о компании — тёмная секция в стиле forest, сразу под блоком цифр.
 * Вертикальный формат (под видео 560x848), воспроизведение по клику:
 * постер + кнопка Play, после клика включаются нативные контролы.
 */
export function VideoSection() {
  const videoState = useFileExists(VIDEO_SRC);
  const posterState = useFileExists(POSTER_SRC);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Клик по кнопке Play -> запускаем воспроизведение
  useEffect(() => {
    const video = videoRef.current;
    if (isPlaying && video) {
      video.play().catch(() => undefined);
    }
  }, [isPlaying]);

  return (
    <section
      aria-label="Видео о компании"
      className="bg-forest pb-16 text-cream md:pb-20"
    >
      <div className="container-site">
        <Reveal className="flex justify-center" y={36}>
          <div className="relative w-full max-w-[400px] overflow-hidden rounded-[1.6rem] border border-cream/12 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
            <div className="relative aspect-[560/848] w-full bg-forest-deep">
              {videoState === "checking" && (
                <div className="absolute inset-0 animate-pulse bg-cream/[0.045]" />
              )}

              {videoState === "missing" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-cream/30 text-cream/60">
                    <Play className="h-6 w-6 translate-x-[1px]" />
                  </span>
                  <p className="text-sm text-cream/70">
                    Здесь появится видео о компании
                  </p>
                  <p className="rounded-md bg-cream/5 px-3 py-1.5 font-mono text-[11px] text-cream/40">
                    public/videos/company.mp4
                  </p>
                </div>
              )}

              {videoState === "exists" && (
                <>
                  <video
                    ref={videoRef}
                    src={VIDEO_SRC}
                    poster={posterState === "exists" ? POSTER_SRC : undefined}
                    preload="metadata"
                    playsInline
                    controls={isPlaying}
                    onEnded={() => setIsPlaying(false)}
                    className="h-full w-full object-cover"
                  />

                  {!isPlaying && (
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      aria-label="Смотреть видео о компании"
                      className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-gradient-to-t from-forest-deep/60 via-forest-deep/10 to-transparent"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft text-forest-deep ring-8 ring-gold-soft/25 transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                        <Play className="h-7 w-7 translate-x-[1px] fill-current md:h-8 md:w-8" />
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
