import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipForward, Volume2, VolumeX } from 'lucide-react'

export default function SpotifyPlayer() {
  const [player, setPlayer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [deviceId, setDeviceId] = useState(null)
  const [volume, setVolume] = useState(0.5)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMuted, setIsMuted] = useState(false)

  // Your Spotify playlist tracks (fallback data)
  const playlistTracks = [
    {
      name: "Little Deer",
      artist: "SPELLLING",
      preview_url: null, // Most tracks don't have preview URLs
      id: "track1"
    },
    {
      name: "Tiger Cubs",
      artist: "Various Artists ft. Jacob Richards",
      preview_url: null,
      id: "track2"
    },
    // Add more tracks from your discography
  ]

  useEffect(() => {
    // Load Spotify Web Playback SDK
    if (!window.Spotify) {
      const script = document.createElement('script')
      script.src = 'https://sdk.scdn.co/spotify-player.js'
      script.async = true
      document.body.appendChild(script)

      window.onSpotifyWebPlaybackSDKReady = () => {
        initializePlayer()
      }
    } else {
      initializePlayer()
    }

    return () => {
      if (player) {
        player.disconnect()
      }
    }
  }, [])

  const initializePlayer = () => {
    // Note: This requires a Spotify Premium account and access token
    // For demo purposes, we'll use a mock player
    setIsLoading(false)
    setError("Spotify Premium required for full playback. Demo mode active.")
    
    // Mock current track
    setCurrentTrack({
      name: "BATTERY - Electronic Set",
      artists: [{ name: "Jacob Richards" }],
      album: { 
        name: "Live Sessions",
        images: [{ url: '/api/placeholder-album-art' }]
      }
    })
  }

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pause()
      } else {
        player.resume()
      }
    } else {
      // Demo mode toggle
      setIsPlaying(!isPlaying)
    }
  }

  const nextTrack = () => {
    if (player) {
      player.nextTrack()
    } else {
      // Demo mode - cycle through tracks
      const currentIndex = playlistTracks.findIndex(t => t.name === currentTrack?.name) || 0
      const nextIndex = (currentIndex + 1) % playlistTracks.length
      setCurrentTrack({
        name: playlistTracks[nextIndex].name,
        artists: [{ name: playlistTracks[nextIndex].artist }],
        album: { 
          name: "Discography",
          images: [{ url: '/api/placeholder-album-art' }]
        }
      })
    }
  }

  const toggleMute = () => {
    if (player) {
      player.setVolume(isMuted ? volume : 0)
    }
    setIsMuted(!isMuted)
  }

  if (isLoading) {
    return (
      <div className="music-player glass-strong rounded-xl p-4 min-w-80">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
          <span className="text-text-secondary text-sm">Loading Spotify...</span>
        </div>
      </div>
    )
  }

  if (!currentTrack) {
    return null
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
        <div className="w-12 h-12 bg-bg-tertiary rounded-lg flex items-center justify-center flex-shrink-0">
          <Volume2 className="w-6 h-6 text-accent-primary" />
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <div className="text-text-primary font-medium text-sm truncate">
            {currentTrack.name}
          </div>
          <div className="text-text-secondary text-xs truncate">
            {currentTrack.artists.map(artist => artist.name).join(', ')}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-accent-primary hover:bg-accent-secondary rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="w-6 h-6 text-text-secondary hover:text-text-primary transition-colors duration-200"
            aria-label="Next track"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={toggleMute}
            className="w-6 h-6 text-text-secondary hover:text-text-primary transition-colors duration-200"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
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
                height: `${Math.random() * 60 + 20}%`
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}