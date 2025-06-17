# Quiz2Play Audio Setup Guide

This directory contains all the audio files needed for the Quiz2Play application's enhanced sound system.

## Required Audio Files

### Background Music

- `quiz-background.mp3` - Looping background music during quiz gameplay
  - Duration: 2-5 minutes (will loop)
  - Style: Upbeat, motivational, not distracting
  - Volume: Mixed at moderate level (will be controlled by app)

### Answer Feedback Sounds

- `clapping.mp3` - Played when user answers correctly

  - Duration: 2-3 seconds
  - Style: Applause, clapping, celebration sound
  - Volume: Clear and rewarding

- `aww-sound.mp3` - Played when user answers incorrectly
  - Duration: 1-2 seconds
  - Style: Sympathetic "aww" sound, disappointed but encouraging
  - Volume: Not too harsh, motivational for next attempt

### Additional Quiz Sounds

- `question-start.mp3` - Brief sound when new question appears

  - Duration: 0.5-1 second
  - Style: Soft chime or notification sound

- `tick-tock.mp3` - Warning sound when time is running low

  - Duration: 1-2 seconds
  - Style: Clock ticking or urgent beeping

- `buzzer.mp3` - Sound when time runs out

  - Duration: 1-2 seconds
  - Style: Game show buzzer or alarm

- `victory-fanfare.mp3` - Played when quiz is completed
  - Duration: 3-5 seconds
  - Style: Triumphant fanfare, celebration music

## Audio Format Requirements

- **Format**: MP3 (primary), OGG (optional fallback)
- **Quality**: 128-192 kbps (balance between quality and file size)
- **Sample Rate**: 44.1 kHz
- **Channels**: Stereo preferred, mono acceptable
- **File Size**: Keep under 500KB per file for fast loading

## Fallback System

The application includes a Web Audio API fallback system that generates synthetic sounds if audio files are missing:

- **Correct Answer**: Happy ascending tone sequence
- **Wrong Answer**: Sad descending tone
- **Time Warning**: Urgent beeping
- **Quiz Complete**: Victory fanfare sequence

## Implementation Notes

1. All audio files are loaded asynchronously with error handling
2. User interaction is required before audio can play (browser autoplay policy)
3. Audio controls are provided in the bottom-right corner during quiz
4. Master volume, background music, and sound effects can be controlled independently
5. Audio preferences are saved locally

## Testing Audio

1. Place audio files in this directory
2. Start the quiz application
3. Navigate to a quiz to test background music
4. Answer questions to test feedback sounds
5. Let timer run down to test warning/timeout sounds
6. Complete quiz to test victory sound

## Recommended Audio Sources

- **Free Music**: YouTube Audio Library, Freesound.org, Incompetech
- **Royalty-Free**: AudioJungle, PremiumBeat, Epidemic Sound
- **Creative Commons**: ccMixter, Free Music Archive

## File Naming Convention

All filenames must match exactly as listed above for the audio system to work properly. The application will automatically fall back to generated sounds if files are missing.
