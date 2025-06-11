# Audio Files for Quiz2Play

This directory contains all audio files used in the Quiz2Play application.

## Music Tracks (Background Music)

Place these MP3 files in the `/public/audio/` directory:

### Background Music:

- `quiz-battle-theme.mp3` - Main gameplay background music (3:24)
- `victory-fanfare.mp3` - Victory celebration music (1:45)
- `thinking-time.mp3` - Calm thinking background music (2:15)
- `countdown-rush.mp3` - Intense countdown music (2:55)

## Sound Effects

### UI Interactions:

- `click.mp3` - Button click sound
- `hover.mp3` - Button hover sound

### Game Events:

- `correct.mp3` - Correct answer sound
- `incorrect.mp3` - Wrong answer sound
- `time-warning.mp3` - Time running out warning
- `time-up.mp3` - Time's up sound

### Achievements:

- `level-up.mp3` - Level up sound
- `achievement.mp3` - Achievement unlocked
- `power-up.mp3` - Power-up activation

### Rewards:

- `coin-collect.mp3` - Coin collection sound
- `prize-drop.mp3` - Prize drop sound
- `fanfare.mp3` - Victory fanfare

### Streaks:

- `streak-3.mp3` - 3-answer streak
- `streak-5.mp3` - 5-answer streak
- `streak-10.mp3` - 10-answer streak

### Special Effects:

- `magic.mp3` - Magic/special effect sound
- `explosion.mp3` - Explosion effect
- `whoosh.mp3` - Swipe/transition sound

## Audio Requirements:

- **Format**: MP3 (for best browser compatibility)
- **Quality**: 128kbps - 192kbps (balance between quality and file size)
- **Duration**: Most sound effects should be 0.5-2 seconds
- **Volume**: Normalized to prevent audio clipping

## Sources for Audio:

You can get free game audio from:

- **Freesound.org** - Free sound effects
- **OpenGameArt.org** - Open source game audio
- **YouTube Audio Library** - Royalty-free music
- **Incompetech.com** - Kevin MacLeod's free music
- **Mixkit.co** - Free music and sound effects

## Implementation:

The audio files are automatically loaded by the `MusicPlayer` and `SoundEffectsController` components. Simply place the files in this directory and they will be available for use.

## Testing:

After adding audio files, test them in the application:

1. Background music should auto-loop
2. Sound effects should play on user interactions
3. Volume controls should work properly
4. Audio should respect mute settings

## Notes:

- Some browsers require user interaction before playing audio
- The app gracefully handles missing audio files
- Audio is optimized for web delivery with preloading
- All audio respects the global volume and mute settings
