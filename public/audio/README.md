# Audio Files for Quiz2Play

This directory contains all audio files used in the Quiz2Play application.

## ⚠️ Current Status: DEMO MODE

The app is currently running in **demo mode** with generated audio tones as placeholders. To get full audio experience, add the MP3 files listed below.

## 🔧 Quick Fix for "No Supported Sources" Error

The app now includes automatic fallback handling:

- ✅ **Missing audio files** → Generated beep tones
- ✅ **Browser compatibility** → Web Audio API fallback
- ✅ **Error indicators** → Visual feedback in music player
- ✅ **No console errors** → Graceful error handling

## 🎵 Required Audio Files

### Background Music (place in `/public/audio/`):

- `quiz-battle-theme.mp3` - Main gameplay background music (3:24)
- `victory-fanfare.mp3` - Victory celebration music (1:45)
- `thinking-time.mp3` - Calm thinking background music (2:15)
- `countdown-rush.mp3` - Intense countdown music (2:55)

### Sound Effects:

#### UI Interactions:

- `click.mp3` - Button click sound
- `hover.mp3` - Button hover sound

#### Game Events:

- `correct.mp3` - Correct answer sound
- `incorrect.mp3` - Wrong answer sound
- `time-warning.mp3` - Time running out warning
- `time-up.mp3` - Time's up sound

#### Achievements:

- `level-up.mp3` - Level up sound
- `achievement.mp3` - Achievement unlocked
- `power-up.mp3` - Power-up activation

#### Rewards:

- `coin-collect.mp3` - Coin collection sound
- `prize-drop.mp3` - Prize drop sound
- `fanfare.mp3` - Victory fanfare

#### Streaks:

- `streak-3.mp3` - 3-answer streak
- `streak-5.mp3` - 5-answer streak
- `streak-10.mp3` - 10-answer streak

#### Special Effects:

- `magic.mp3` - Magic/special effect sound
- `explosion.mp3` - Explosion effect
- `whoosh.mp3` - Swipe/transition sound

## 🚀 Quick Setup Options

### Option 1: Generate Placeholder Audio (Instant)

1. Open browser console on your Quiz2Play app
2. Run the commands from `generate-placeholder-audio.js`
3. Download generated WAV files
4. Convert to MP3 and place in `/public/audio/`

### Option 2: Use Free Audio Sources

- **Freesound.org** - Search for "button click", "success", "error", etc.
- **OpenGameArt.org** - Game-specific audio collections
- **YouTube Audio Library** - Royalty-free background music
- **Mixkit.co** - Free music and sound effects
- **Incompetech.com** - Kevin MacLeod's royalty-free music

### Option 3: Create Silent Placeholders

1. Create a 1-second silent MP3 file
2. Copy it 22 times with the required filenames
3. App will work silently until you replace with real audio

## 💡 Development Tips

### Current App Behavior:

- ✅ **Missing files** → Generates beep tones automatically
- ✅ **Music player** → Shows "Demo mode" when files missing
- ✅ **Sound effects** → Uses Web Audio API fallbacks
- ✅ **Volume controls** → Work with generated audio
- ✅ **No crashes** → Graceful error handling throughout

### Adding Real Audio Files:

1. Place MP3 files in `/public/audio/` directory
2. Use exact filenames from the list above
3. Refresh the app - files will load automatically
4. Music player will switch from "Demo mode" to normal mode

## 🎛️ Audio Specifications

- **Format**: MP3 (best browser compatibility)
- **Quality**: 128kbps - 192kbps
- **Duration**:
  - UI sounds: 0.1-0.5 seconds
  - Game events: 0.3-1 seconds
  - Background music: 2-5 minutes (will loop)
- **Volume**: Normalized to prevent clipping

## 🐛 Troubleshooting

### "The element has no supported sources" Error:

- ✅ **Fixed** - App now handles missing files gracefully
- ✅ **Fallback** - Generated tones replace missing audio
- ✅ **Visual feedback** - Music player shows demo mode

### No Sound Playing:

1. Check browser allows audio (click play button first)
2. Check volume levels in music player
3. Check global mute settings
4. Try clicking a button (generates demo beep)

### Generated Tones Only:

- This is normal without MP3 files
- Add real audio files to get full experience
- Demo tones work for development/testing

## 📱 Browser Compatibility

- ✅ **Chrome/Edge** - Full support
- ✅ **Firefox** - Full support
- ✅ **Safari** - Full support (may need user interaction first)
- ✅ **Mobile browsers** - Supported with user interaction

## 🔄 Auto-Loading

The app automatically:

- Detects missing audio files
- Switches to demo mode
- Loads real files when available
- Updates UI to show current mode
- Handles all audio errors gracefully

**No code changes needed** - just add the MP3 files and they'll work immediately!
