# Music Player Restore Instructions

## Summary

The music player has been temporarily removed from the Quiz2Play application. The component file still exists but is no longer imported or used in any pages.

## What was removed:

- MusicPlayer component from `src/pages/Index.tsx`
- MusicPlayer component from `src/pages/Quiz.tsx` (3 instances)
- Import statements for MusicPlayer in both files
- "Music: ON" reference in the Index footer

## Component location:

The MusicPlayer component still exists at:

- `src/components/ui/music-player.tsx`

## To restore the music player:

### 1. Add imports back to pages:

```typescript
// In src/pages/Index.tsx and src/pages/Quiz.tsx
import { MusicPlayer } from "@/components/ui/music-player";
```

### 2. Add component back to Index.tsx:

```jsx
{
  /* Music Player - Top right corner */
}
<MusicPlayer autoPlay={false} position="top-right" />;
```

### 3. Add component back to Quiz.tsx (3 locations):

```jsx
{
  /* In loading state, main quiz, and results sections */
}
<MusicPlayer position="top-right" />;
```

### 4. Optional: Restore footer reference in Index.tsx:

```jsx
<div className="flex items-center gap-2 text-white/70">
  <span className="text-sm">🎵 Music: ON</span>
</div>
```

## Audio files:

All audio setup instructions and files remain in:

- `public/audio/README.md`
- `public/audio/PIXABAY-MUSIC-SETUP.md`

## Features that were available:

- 5 background music tracks
- Volume control
- Track selection
- Featured Pixabay 8-bit track
- Auto-play controls
- Expandable interface
- Error handling with demo mode

The music player was fully functional with comprehensive audio support before removal.
