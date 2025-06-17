# Audio Files

This directory should contain background music files for the Quiz2Play application.

## Required files:

- `background-music.mp3` - Main background music track (MP3 format)
- `background-music.ogg` - Fallback background music track (OGG format)

## Music Guidelines:

- Keep volume levels moderate (the app sets volume to 0.2 by default)
- Ensure the music is loopable without obvious breaks
- Use royalty-free music to avoid copyright issues
- Recommended duration: 2-5 minutes for variety

## File Format Support:

- MP3: Primary format for broad browser compatibility
- OGG: Fallback format for browsers that don't support MP3

## Integration:

The background music is controlled by the `BackgroundMusic` component in `/src/components/ui/background-music.tsx` and is added to the main page in `/src/pages/Index.tsx`.

Users can control playback with floating controls that appear in the bottom-right corner of the page.
