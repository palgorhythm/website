import React, { useState } from "react";
import {
  Play,
  ExternalLink,
  Music,
  X,
  SkipForward,
  SkipBack,
  Pause,
} from "lucide-react";

interface Track {
  title: string;
  videoId: string;
  index: number;
}

export default function YouTubePlayer(): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const tracks: Track[] = [
    {
      title: "Dial Up",
      videoId: "ab7NSlilCjY",
      index: 2,
    },
    {
      title: "fish beat",
      videoId: "6NepMDywEVQ",
      index: 3,
    },
    {
      title: "GBA startup",
      videoId: "Cilry5yHBeI",
      index: 4,
    },
    {
      title: "saturn",
      videoId: "1V-4hy1ySyk",
      index: 5,
    },
    {
      title: "Big Blues",
      videoId: "0Iu---0yzso",
      index: 6,
    },
    {
      title: "green mother",
      videoId: "Bws0xrQndeo",
      index: 7,
    },
    {
      title: "roseparade",
      videoId: "7EMVzXaNrE8",
      index: 8,
    },
    {
      title: "LAZER",
      videoId: "yFFJ5nqSV38",
      index: 9,
    },
    {
      title: "A view through the window",
      videoId: "czrDzvjRqG8",
      index: 10,
    },
    {
      title: "Fabrica",
      videoId: "Nh80wN7ep0M",
      index: 11,
    },
    {
      title: "Do u have Wifi",
      videoId: "QNWXW5aPstU",
      index: 12,
    },
  ];

  const currentTrackData = tracks[currentTrack];
  const embedUrl = `https://www.youtube.com/embed/${currentTrackData.videoId}?autoplay=${isPlaying ? 1 : 0}&controls=1&modestbranding=1&rel=0`;

  const togglePlayer = () => {
    setIsExpanded(!isExpanded);
  };

  const playNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const playPrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isExpanded ? "w-96" : "w-80"}`}
    >
      {!isExpanded ? (
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                <Music
                  className="w-5 h-5"
                  style={{ fill: "none", stroke: "white", color: "white" }}
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">
                  BATTERY
                </div>
                <div className="text-xs text-text-secondary">
                  {currentTrackData.title}
                </div>
              </div>
            </div>
            <button
              onClick={togglePlayer}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={playPrevious}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlayback}
                className="bg-accent-primary hover:bg-accent-secondary text-white p-2 rounded-full transition-colors"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                }}
              >
                {isPlaying ? (
                  <Pause
                    className="w-4 h-4"
                    style={{ fill: "white", stroke: "white" }}
                  />
                ) : (
                  <Play
                    className="w-4 h-4"
                    style={{ fill: "white", stroke: "white" }}
                  />
                )}
              </button>

              <button
                onClick={playNext}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-text-muted">
              {currentTrack + 1}/{tracks.length}
            </div>
          </div>
        </div>
      ) : (
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                <Music
                  className="w-4 h-4"
                  style={{ fill: "none", stroke: "white", color: "white" }}
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">
                  {currentTrackData.title}
                </div>
                <div className="text-xs text-text-secondary">
                  BATTERY • dial up
                </div>
              </div>
            </div>
            <button
              onClick={togglePlayer}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative mb-4">
            <iframe
              key={currentTrackData.videoId}
              src={embedUrl}
              width="100%"
              height="200"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={playPrevious}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-accent-primary hover:bg-accent-secondary text-white p-2 rounded-full transition-colors"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                }}
              >
                {isPlaying ? (
                  <Pause
                    className="w-4 h-4"
                    style={{ fill: "white", stroke: "white" }}
                  />
                ) : (
                  <Play
                    className="w-4 h-4"
                    style={{ fill: "white", stroke: "white" }}
                  />
                )}
              </button>

              <button
                onClick={playNext}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-text-muted">
                {currentTrack + 1}/{tracks.length}
              </span>
              <a
                href={`https://www.youtube.com/watch?v=${currentTrackData.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
