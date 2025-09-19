import React, { useState, useEffect, useRef } from "react";

// Declare global types
declare global {
  interface Window {
    Spotify: any;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";

export default function SpotifyPlayer(): React.JSX.Element | null {
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(0.5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Your Spotify playlist tracks (fallback data)
  const playlistTracks = [
    {
      name: "Little Deer",
      artist: "SPELLLING",
      preview_url: null, // Most tracks don't have preview URLs
      id: "track1",
    },
    {
      name: "Tiger Cubs",
      artist: "Various Artists ft. Jacob Richards",
      preview_url: null,
      id: "track2",
    },
    // Add more tracks from your discography
  ];

  useEffect(() => {
    // Load Spotify Web Playback SDK
    if (!window.Spotify) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        initializePlayer();
      };
    } else {
      initializePlayer();
    }

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, []);

  const initializePlayer = () => {
    // Note: This requires a Spotify Premium account and access token
    // For demo purposes, we'll use a mock player
    setIsLoading(false);
    setError("Spotify Premium required for full playback. Demo mode active.");

    // Mock current track
    setCurrentTrack({
      name: "BATTERY - Electronic Set",
      artists: [{ name: "Jacob Richards" }],
      album: {
        name: "Live Sessions",
        images: [{ url: "/api/placeholder-album-art" }],
      },
    });
  };

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pause();
      } else {
        player.resume();
      }
    } else {
      // Demo mode toggle
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    if (player) {
      player.nextTrack();
    } else {
      // Demo mode - cycle through tracks
      const currentIndex =
        playlistTracks.findIndex((t) => t.name === currentTrack?.name) || 0;
      const nextIndex = (currentIndex + 1) % playlistTracks.length;
      setCurrentTrack({
        name: playlistTracks[nextIndex].name,
        artists: [{ name: playlistTracks[nextIndex].artist }],
        album: {
          name: "Discography",
          images: [{ url: "/api/placeholder-album-art" }],
        },
      });
    }
  };

  const toggleMute = () => {
    if (player) {
      player.setVolume(isMuted ? volume : 0);
    }
    setIsMuted(!isMuted);
  };

  if (isLoading) {
    return (
      <div className="music-player glass-strong rounded-xl p-4 min-w-80">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
          <span className="text-text-secondary text-sm">
            Loading Spotify...
          </span>
        </div>
      </div>
    );
  }

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="music-player glass-strong rounded-xl p-4 min-w-80 max-w-sm">
      {error && (
        <div className="text-xs text-accent-primary mb-2 opacity-75">
          {error}
        </div>
      )}

      <div className="flex items-center space-x-3">
        {/* Album Art */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #d1477a, #3ba49a)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            stroke="white"
            strokeWidth="2"
            style={{
              filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))",
            }}
          >
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <div className="text-text-primary font-medium text-sm truncate">
            {currentTrack.name}
          </div>
          <div className="text-text-secondary text-xs truncate">
            {currentTrack.artists.map((artist: any) => artist.name).join(", ")}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <div
            onClick={togglePlay}
            className="cursor-pointer flex items-center justify-center transition-all duration-200"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d1477a, #3ba49a)",
              color: "white",
              border: "none",
              boxShadow: "0 3px 12px rgba(255, 107, 157, 0.4)",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.background =
                "linear-gradient(135deg, #b93d6e, #328b82)";
              target.style.transform = "scale(1.1)";
              target.style.boxShadow = "0 6px 16px rgba(255, 107, 157, 0.5)";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.background =
                "linear-gradient(135deg, #d1477a, #3ba49a)";
              target.style.transform = "scale(1)";
              target.style.boxShadow = "0 3px 12px rgba(255, 107, 157, 0.4)";
            }}
            role="button"
            tabIndex={0}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="white"
                style={{ strokeWidth: 0 }}
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="white"
                style={{ marginLeft: "2px" }}
              >
                <polygon points="5,3 19,12 5,21"></polygon>
              </svg>
            )}
          </div>

          <button
            onClick={nextTrack}
            className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-accent-primary transition-all duration-200 hover:scale-110"
            style={{ border: "none", background: "none" }}
            aria-label="Next track"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={toggleMute}
            className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-accent-secondary transition-all duration-200 hover:scale-110"
            style={{ border: "none", background: "none" }}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Audio Visualizer */}
      {isPlaying && (
        <div className="flex items-center justify-center space-x-1 mt-3 h-6">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="visualizer-bar h-full"
              style={{
                animationDelay: `${i * 0.1}s`,
                height: `${Math.random() * 60 + 20}%`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
