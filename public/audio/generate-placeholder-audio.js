/**
 * Placeholder Audio Generator for Quiz2Play
 *
 * This script helps generate simple placeholder audio files
 * for development and testing purposes.
 *
 * To use this in a Node.js environment:
 * npm install node-wav
 * node generate-placeholder-audio.js
 */

// Simple beep generator for browsers (paste in browser console)
function generateAndDownloadBeep(
  filename,
  frequency = 440,
  duration = 1,
  sampleRate = 44100,
) {
  // Create audio context
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Create buffer
  const buffer = audioContext.createBuffer(
    1,
    sampleRate * duration,
    sampleRate,
  );
  const channelData = buffer.getChannelData(0);

  // Generate sine wave
  for (let i = 0; i < channelData.length; i++) {
    channelData[i] = Math.sin((2 * Math.PI * frequency * i) / sampleRate) * 0.1;
  }

  // Convert to WAV (simplified)
  const arrayBuffer = new ArrayBuffer(44 + channelData.length * 2);
  const view = new DataView(arrayBuffer);

  // WAV header
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + channelData.length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, channelData.length * 2, true);

  // Convert float samples to 16-bit PCM
  let offset = 44;
  for (let i = 0; i < channelData.length; i++, offset += 2) {
    const sample = Math.max(-1, Math.min(1, channelData[i]));
    view.setInt16(offset, sample * 0x7fff, true);
  }

  // Create blob and download
  const blob = new Blob([arrayBuffer], { type: "audio/wav" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Quick audio files for development
// Run these in browser console to generate placeholder files

console.log(`
To generate placeholder audio files, run these commands in the browser console:

// UI Sounds
generateAndDownloadBeep('click.wav', 800, 0.1);
generateAndDownloadBeep('hover.wav', 600, 0.1);

// Game Sounds  
generateAndDownloadBeep('correct.wav', 1000, 0.3);
generateAndDownloadBeep('incorrect.wav', 300, 0.5);
generateAndDownloadBeep('time-warning.wav', 400, 0.2);
generateAndDownloadBeep('time-up.wav', 200, 0.8);

// Achievement Sounds
generateAndDownloadBeep('level-up.wav', 1200, 0.5);
generateAndDownloadBeep('achievement.wav', 1000, 0.4);
generateAndDownloadBeep('power-up.wav', 1400, 0.3);

// Reward Sounds
generateAndDownloadBeep('coin-collect.wav', 900, 0.2);
generateAndDownloadBeep('prize-drop.wav', 700, 0.4);
generateAndDownloadBeep('fanfare.wav', 1500, 1.0);

// Streak Sounds
generateAndDownloadBeep('streak-3.wav', 800, 0.3);
generateAndDownloadBeep('streak-5.wav', 1000, 0.4);
generateAndDownloadBeep('streak-10.wav', 1200, 0.6);

// Special Effects
generateAndDownloadBeep('magic.wav', 1100, 0.3);
generateAndDownloadBeep('explosion.wav', 150, 0.5);
generateAndDownloadBeep('whoosh.wav', 500, 0.2);

// Background Music (longer tones)
generateAndDownloadBeep('quiz-battle-theme.wav', 220, 10);
generateAndDownloadBeep('victory-fanfare.wav', 440, 5);
generateAndDownloadBeep('thinking-time.wav', 330, 8);
generateAndDownloadBeep('countdown-rush.wav', 550, 6);

After generating, convert WAV files to MP3 using:
- Online converters (CloudConvert, etc.)
- FFmpeg: ffmpeg -i input.wav output.mp3
- Audacity (free audio editor)
`);

// Alternative: Create silent MP3 files as placeholders
console.log(`
Alternative: Create silent placeholder files:

1. Create a 1-second silent MP3 file
2. Copy it to each required filename
3. The app will handle missing audio gracefully

Required files in /public/audio/:
- quiz-battle-theme.mp3
- victory-fanfare.mp3  
- thinking-time.mp3
- countdown-rush.mp3
- click.mp3
- hover.mp3
- correct.mp3
- incorrect.mp3
- time-warning.mp3
- time-up.mp3
- level-up.mp3
- achievement.mp3
- power-up.mp3
- coin-collect.mp3
- prize-drop.mp3
- fanfare.mp3
- streak-3.mp3
- streak-5.mp3
- streak-10.mp3
- magic.mp3
- explosion.mp3
- whoosh.mp3
`);
