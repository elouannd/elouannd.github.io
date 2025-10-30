# FFMPEG Natural Language Converter - Implementation Plan

## Overview

A web-based tool that converts natural language descriptions into FFMPEG commands. Accessible at `/ffmpeg` as a public route (not linked from homepage). Uses the same glassmorphism design system as the main site.

## Page Information

- **URL**: `/ffmpeg`
- **Route Type**: Public (available in production)
- **Design**: Glassmorphism matching homepage
- **Component**: `src/components/FFMPEGConverter.jsx`

## Features

### 1. Natural Language Input
- Large textarea for user to describe what they want to do
- Placeholder text with example prompts
- Character counter (optional)
- Auto-resize as user types

### 2. Example Prompts (Quick Actions)
Clickable cards/buttons that populate the input:
- "Convert MP4 to GIF"
- "Extract audio from video as MP3"
- "Resize video to 720p"
- "Compress video to reduce file size"
- "Trim video from 0:30 to 1:45"
- "Convert video to WebM"
- "Extract frames as images"
- "Speed up video 2x"
- "Rotate video 90 degrees clockwise"
- "Add watermark to video"
- "Remove audio from video"
- "Concatenate multiple videos"

### 3. Pattern Matching Engine

**Core Operations to Support**:

#### Format Conversion
- Video: mp4, webm, avi, mov, mkv, flv, ogv, m4v
- Audio: mp3, aac, wav, flac, ogg, m4a
- Image sequences: png, jpg
- GIF creation

#### Video Operations
- Resize/Scale (720p, 1080p, 4K, custom dimensions)
- Crop (center crop, custom crop)
- Rotate (90°, 180°, 270°, flip horizontal/vertical)
- Trim/Cut (by time, by duration)
- Speed adjustment (0.5x - 4x)
- Concatenate multiple files
- Extract frames/thumbnails
- Split video into segments

#### Audio Operations
- Extract audio track
- Remove audio
- Replace audio
- Adjust volume
- Audio normalization
- Change audio codec
- Extract audio segment

#### Compression/Quality
- Reduce file size
- Change bitrate (video/audio)
- Change quality/CRF
- Change codec (h264, h265, vp9, av1)
- Two-pass encoding

#### Advanced Operations
- Add/extract subtitles
- Watermarking
- Color correction
- Aspect ratio changes
- Frame rate changes
- Denoise/filters
- Batch processing hints

**Pattern Matching Strategy**:
1. Keyword detection (convert, resize, compress, trim, etc.)
2. Format detection (mp4, gif, mp3, etc.)
3. Parameter extraction (dimensions, time codes, bitrates)
4. Template-based command generation
5. Fallback to AI if pattern not matched

### 4. Command Output Area

**Features**:
- Monospace font display
- Syntax highlighting for FFMPEG commands
- Copy to clipboard button
- Parameter breakdown/explanation
- Multiple command suggestions (if applicable)
- Warning messages (if lossy conversion, etc.)

**Display Format**:
```
ffmpeg -i input.mp4 [options] output.gif
```

### 5. File Upload & Metadata Detection

**Purpose**: Allow users to upload a sample file to:
- Auto-detect input format
- Show file metadata (resolution, codec, duration, bitrate)
- Suggest optimizations
- Pre-fill input filename in command

**Implementation**:
- Drag & drop zone
- File input button
- File metadata extraction via FileReader
- Display: filename, size, type
- Note: Files stay client-side (no upload to server)

### 6. Command History

**Features**:
- Show last 10-20 generated commands
- Stored in localStorage
- Click to restore a previous command
- Clear history button
- Export history as JSON
- Import history

**Display**:
- Timestamp
- Natural language input (truncated)
- Generated command (truncated)
- Re-use button

### 7. AI Fallback

**When Pattern Matching Fails**:
- Offer AI-powered conversion
- Support for Anthropic Claude or OpenAI GPT
- API key stored in localStorage
- Settings panel for API configuration

**API Key Management**:
- Settings modal/panel
- Input for API key
- Select provider (Anthropic/OpenAI)
- Test connection button
- Secure storage warning

**AI Prompt Template**:
```
Convert this natural language description into a valid FFMPEG command:

User request: {user_input}

Provide only the FFMPEG command without explanation. Use 'input.{ext}' as input filename and 'output.{ext}' as output filename where appropriate.
```

### 8. Additional UI Features

**Header Section**:
- Page title: "FFMPEG Command Generator"
- Subtitle: "Convert natural language to FFMPEG commands"
- Link to FFMPEG documentation
- Back to home button

**Help/Info Panel**:
- Common FFMPEG tips
- Placeholder filename conventions
- Where to run commands
- Installation links

**Settings Panel**:
- AI API configuration
- History settings (retention period)
- Theme toggle (if different from system)
- Export/import preferences

## UI Layout

```
┌─────────────────────────────────────────────────┐
│  FFMPEG Command Generator                       │
│  Convert natural language to FFMPEG commands    │
│                                    [⚙️ Settings] │
└─────────────────────────────────────────────────┘

┌──────────────────────┬──────────────────────────┐
│                      │                          │
│  Natural Language    │   Command History        │
│  Input (textarea)    │   ┌──────────────────┐   │
│                      │   │ Previous command │   │
│                      │   └──────────────────┘   │
│  [Example Prompts]   │   ┌──────────────────┐   │
│  [Convert MP4 to GIF]│   │ Previous command │   │
│  [Extract Audio]     │   └──────────────────┘   │
│  [Resize to 720p]    │                          │
│  ...                 │   [Clear History]        │
│                      │                          │
│  [📎 Upload File]    │                          │
│                      │                          │
│  [Generate Command]  │                          │
│                      │                          │
└──────────────────────┴──────────────────────────┘

┌─────────────────────────────────────────────────┐
│  Generated Command                   [📋 Copy]  │
│  ┌───────────────────────────────────────────┐  │
│  │ ffmpeg -i input.mp4 -vf scale=1280:720   │  │
│  │        -c:v libx264 output.mp4           │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  💡 Explanation:                                │
│  • -i input.mp4: Input file                    │
│  • -vf scale=1280:720: Resize to 720p          │
│  • -c:v libx264: H.264 video codec             │
│  • output.mp4: Output file                     │
└─────────────────────────────────────────────────┘
```

## Component Structure

```
src/components/FFMPEGConverter.jsx
├── State Management
│   ├── naturalLanguageInput
│   ├── generatedCommand
│   ├── commandHistory
│   ├── uploadedFile
│   ├── fileMetadata
│   ├── apiKey
│   ├── isLoading
│   └── error
│
├── Pattern Matching Logic
│   ├── parseInput()
│   ├── detectOperation()
│   ├── detectFormats()
│   ├── extractParameters()
│   └── generateCommand()
│
├── AI Fallback
│   ├── callAnthropicAPI()
│   └── callOpenAIAPI()
│
├── File Handling
│   ├── handleFileUpload()
│   └── extractMetadata()
│
├── History Management
│   ├── saveToHistory()
│   ├── loadHistory()
│   ├── clearHistory()
│   └── exportHistory()
│
└── UI Components
    ├── Header
    ├── NaturalLanguageInput
    ├── ExamplePrompts
    ├── FileUpload
    ├── CommandOutput
    ├── CommandHistory
    ├── SettingsModal
    └── HelpPanel
```

## Styling (Glassmorphism)

Use existing design tokens from `src/index.css`:
- `.glass` class for all cards/panels
- `var(--accent-1)`, `var(--accent-2)` for highlights
- `var(--text)`, `var(--muted)` for typography
- `var(--radius)` for border radius
- Monospace: `var(--font-mono)` for commands

**Custom Styles Needed**:
- Code block styling with glass effect
- Example prompt cards (hover effects)
- History items (compact glass cards)
- File upload dropzone (dashed border)
- Copy button (glass with icon)
- Settings modal (glass overlay)

## Pattern Matching Examples

### Example 1: Format Conversion
**Input**: "Convert MP4 to GIF"
**Pattern**: `/convert.*(?:to|into)\s*(gif|mp4|webm)/i`
**Output**:
```bash
ffmpeg -i input.mp4 -vf "fps=10,scale=720:-1:flags=lanczos" -c:v gif output.gif
```

### Example 2: Resize
**Input**: "Resize video to 720p"
**Pattern**: `/resize.*(?:to)?\s*(\d+)p?/i`
**Output**:
```bash
ffmpeg -i input.mp4 -vf scale=-2:720 -c:v libx264 -crf 23 output.mp4
```

### Example 3: Trim
**Input**: "Trim video from 0:30 to 1:45"
**Pattern**: `/trim.*from\s*(\d+:\d+).*to\s*(\d+:\d+)/i`
**Output**:
```bash
ffmpeg -i input.mp4 -ss 00:00:30 -to 00:01:45 -c copy output.mp4
```

### Example 4: Extract Audio
**Input**: "Extract audio as MP3"
**Pattern**: `/extract\s*audio.*(?:as|to)?\s*(mp3|wav|aac)/i`
**Output**:
```bash
ffmpeg -i input.mp4 -vn -acodec libmp3lame -q:a 2 output.mp3
```

## Implementation Steps

1. ✅ **Create plan document**
2. **Setup component structure**
   - Create FFMPEGConverter.jsx
   - Add basic layout with glass styling
   - Add route to App.jsx

3. **Build UI components**
   - Natural language textarea
   - Example prompts grid
   - Command output area
   - File upload zone
   - History sidebar

4. **Implement pattern matching**
   - Create pattern library
   - Build command templates
   - Add parameter extraction
   - Test with example inputs

5. **Add copy functionality**
   - Clipboard API
   - Success toast/feedback

6. **Implement history**
   - localStorage integration
   - History UI
   - Clear/export functions

7. **File upload & metadata**
   - File input handling
   - Metadata extraction
   - Display file info

8. **AI fallback**
   - API key management
   - Anthropic/OpenAI integration
   - Error handling

9. **Polish & test**
   - Loading states
   - Error messages
   - Responsive design
   - Cross-browser testing

## Testing Checklist

- [ ] Pattern matching works for common operations
- [ ] Example prompts generate correct commands
- [ ] Copy to clipboard works
- [ ] History persists across page reloads
- [ ] File upload shows metadata
- [ ] AI fallback works with API key
- [ ] Settings save correctly
- [ ] Glassmorphism styling matches homepage
- [ ] Responsive on mobile
- [ ] Error states display properly
- [ ] Loading states work
- [ ] Dark/light mode both work

## Future Enhancements

- Batch command generation
- Visual command builder (drag & drop blocks)
- Command validation (check syntax)
- Preset templates library
- Community-shared patterns
- Direct FFMPEG execution (via WASM)
- Progress estimation
- Command explanation generator
- Multi-language support
- Keyboard shortcuts
