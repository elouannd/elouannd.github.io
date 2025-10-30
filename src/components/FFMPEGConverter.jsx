import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCopy, FiCheck, FiUpload, FiSettings, FiTrash2, FiDownload } from 'react-icons/fi';
import './FFMPEGConverter.css';

export default function FFMPEGConverter() {
  // State management
  const [input, setInput] = useState('');
  const [command, setCommand] = useState('');
  const [explanation, setExplanation] = useState([]);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileMetadata, setFileMetadata] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiProvider, setApiProvider] = useState('anthropic');

  // Load history and settings from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('ffmpeg-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    const savedApiKey = localStorage.getItem('ffmpeg-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    const savedProvider = localStorage.getItem('ffmpeg-api-provider');
    if (savedProvider) {
      setApiProvider(savedProvider);
    }
  }, []);

  // Example prompts
  const examples = [
    "Convert MP4 to GIF",
    "Extract audio as MP3",
    "Resize video to 720p",
    "Compress video to reduce file size",
    "Trim video from 0:30 to 1:45",
    "Convert to WebM",
    "Extract frames as images",
    "Speed up video 2x",
    "Rotate video 90 degrees clockwise",
    "Remove audio from video",
    "Convert audio to WAV",
    "Create thumbnail at 5 seconds"
  ];

  // Pattern matching function
  const generateFFMPEGCommand = (userInput) => {
    const input_lower = userInput.toLowerCase();
    let cmd = '';
    let exp = [];

    // Format conversion patterns
    if (input_lower.match(/convert.*(?:to|into)\s*gif/i)) {
      cmd = 'ffmpeg -i input.mp4 -vf "fps=10,scale=720:-1:flags=lanczos" -c:v gif output.gif';
      exp = [
        '-i input.mp4: Input video file',
        '-vf "fps=10,scale=720:-1:flags=lanczos": 10 FPS, scale to 720px width',
        '-c:v gif: GIF codec',
        'output.gif: Output file'
      ];
    }
    else if (input_lower.match(/convert.*(?:to|into)\s*webm/i)) {
      cmd = 'ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm';
      exp = [
        '-i input.mp4: Input video file',
        '-c:v libvpx-vp9: VP9 codec for WebM',
        '-crf 30: Quality level (lower = better)',
        '-b:v 0: Variable bitrate',
        'output.webm: Output file'
      ];
    }
    else if (input_lower.match(/convert.*(?:to|into)\s*(mp4|avi|mov|mkv)/i)) {
      const format = input_lower.match(/(?:to|into)\s*(mp4|avi|mov|mkv)/i)[1];
      cmd = `ffmpeg -i input.ext -c:v libx264 -crf 23 -preset medium output.${format}`;
      exp = [
        '-i input.ext: Input file (replace .ext with actual extension)',
        '-c:v libx264: H.264 video codec',
        '-crf 23: Quality (18-28, lower = better)',
        '-preset medium: Encoding speed',
        `output.${format}: Output file`
      ];
    }

    // Audio extraction
    else if (input_lower.match(/extract\s*audio.*(?:as|to)?\s*mp3/i)) {
      cmd = 'ffmpeg -i input.mp4 -vn -acodec libmp3lame -q:a 2 output.mp3';
      exp = [
        '-i input.mp4: Input video file',
        '-vn: No video (audio only)',
        '-acodec libmp3lame: MP3 codec',
        '-q:a 2: Audio quality (0-9, lower = better)',
        'output.mp3: Output file'
      ];
    }
    else if (input_lower.match(/extract\s*audio.*(?:as|to)?\s*wav/i)) {
      cmd = 'ffmpeg -i input.mp4 -vn -acodec pcm_s16le output.wav';
      exp = [
        '-i input.mp4: Input video file',
        '-vn: No video',
        '-acodec pcm_s16le: PCM codec for WAV',
        'output.wav: Output file'
      ];
    }
    else if (input_lower.match(/extract\s*audio/i)) {
      cmd = 'ffmpeg -i input.mp4 -vn -acodec copy output.aac';
      exp = [
        '-i input.mp4: Input video file',
        '-vn: No video',
        '-acodec copy: Copy audio stream without re-encoding',
        'output.aac: Output file (change extension as needed)'
      ];
    }

    // Resize operations
    else if (input_lower.match(/resize.*(?:to)?\s*(\d+)p/i)) {
      const height = input_lower.match(/(\d+)p/i)[1];
      cmd = `ffmpeg -i input.mp4 -vf scale=-2:${height} -c:v libx264 -crf 23 output.mp4`;
      exp = [
        '-i input.mp4: Input video file',
        `-vf scale=-2:${height}: Scale to ${height}px height, auto width`,
        '-c:v libx264: H.264 codec',
        '-crf 23: Quality level',
        'output.mp4: Output file'
      ];
    }
    else if (input_lower.match(/resize.*(\d+)\s*x\s*(\d+)/i)) {
      const match = input_lower.match(/(\d+)\s*x\s*(\d+)/i);
      const width = match[1];
      const height = match[2];
      cmd = `ffmpeg -i input.mp4 -vf scale=${width}:${height} -c:v libx264 -crf 23 output.mp4`;
      exp = [
        '-i input.mp4: Input video file',
        `-vf scale=${width}:${height}: Resize to ${width}x${height}`,
        '-c:v libx264: H.264 codec',
        'output.mp4: Output file'
      ];
    }

    // Compression
    else if (input_lower.match(/compress|reduce\s*(?:file)?\s*size/i)) {
      cmd = 'ffmpeg -i input.mp4 -vcodec libx264 -crf 28 output.mp4';
      exp = [
        '-i input.mp4: Input video file',
        '-vcodec libx264: H.264 codec',
        '-crf 28: Higher CRF = smaller file (23-28 recommended)',
        'output.mp4: Compressed output'
      ];
    }

    // Trim/Cut
    else if (input_lower.match(/trim.*from\s*([\d:]+).*to\s*([\d:]+)/i)) {
      const match = input_lower.match(/from\s*([\d:]+).*to\s*([\d:]+)/i);
      const start = match[1];
      const end = match[2];
      cmd = `ffmpeg -i input.mp4 -ss ${start} -to ${end} -c copy output.mp4`;
      exp = [
        '-i input.mp4: Input video file',
        `-ss ${start}: Start time`,
        `-to ${end}: End time`,
        '-c copy: Copy streams without re-encoding (fast)',
        'output.mp4: Trimmed output'
      ];
    }
    else if (input_lower.match(/trim.*(?:first|last)\s*(\d+)\s*(?:seconds?|sec)/i)) {
      const match = input_lower.match(/(?:first|last)\s*(\d+)\s*(?:seconds?|sec)/i);
      const duration = match[1];
      const isFirst = input_lower.includes('first');
      if (isFirst) {
        cmd = `ffmpeg -i input.mp4 -t ${duration} -c copy output.mp4`;
        exp = [
          '-i input.mp4: Input video file',
          `-t ${duration}: Duration in seconds`,
          'output.mp4: First ' + duration + ' seconds'
        ];
      } else {
        cmd = `ffmpeg -sseof -${duration} -i input.mp4 -c copy output.mp4`;
        exp = [
          `-sseof -${duration}: Start from end minus ${duration} seconds`,
          '-i input.mp4: Input video file',
          'output.mp4: Last ' + duration + ' seconds'
        ];
      }
    }

    // Speed adjustment
    else if (input_lower.match(/speed\s*up.*?([\d.]+)x?|(?:[\d.]+)x\s*faster/i)) {
      const match = input_lower.match(/([\d.]+)/);
      const speed = match ? match[1] : '2';
      const atempo = 1 / parseFloat(speed);
      cmd = `ffmpeg -i input.mp4 -filter:v "setpts=${atempo}*PTS" -filter:a "atempo=${speed}" output.mp4`;
      exp = [
        '-i input.mp4: Input video file',
        `-filter:v "setpts=${atempo}*PTS": Speed up video ${speed}x`,
        `-filter:a "atempo=${speed}": Speed up audio ${speed}x`,
        'output.mp4: Sped up output'
      ];
    }
    else if (input_lower.match(/slow.*?([\d.]+)x?|slow\s*motion/i)) {
      const match = input_lower.match(/([\d.]+)/);
      const speed = match ? match[1] : '0.5';
      cmd = `ffmpeg -i input.mp4 -filter:v "setpts=${speed}*PTS" -filter:a "atempo=${1/parseFloat(speed)}" output.mp4`;
      exp = [
        '-i input.mp4: Input video file',
        `-filter:v "setpts=${speed}*PTS": Slow down video to ${speed}x`,
        'output.mp4: Slow motion output'
      ];
    }

    // Rotation
    else if (input_lower.match(/rotate.*90.*(?:clockwise|cw)/i) || input_lower.match(/rotate.*(?:clockwise|cw).*90/i)) {
      cmd = 'ffmpeg -i input.mp4 -vf "transpose=1" -c:a copy output.mp4';
      exp = [
        '-i input.mp4: Input video file',
        '-vf "transpose=1": Rotate 90° clockwise',
        '-c:a copy: Copy audio',
        'output.mp4: Rotated output'
      ];
    }
    else if (input_lower.match(/rotate.*90.*(?:counter|ccw)/i) || input_lower.match(/rotate.*(?:counter|ccw).*90/i)) {
      cmd = 'ffmpeg -i input.mp4 -vf "transpose=2" -c:a copy output.mp4';
      exp = [
        '-i input.mp4: Input video file',
        '-vf "transpose=2": Rotate 90° counter-clockwise',
        'output.mp4: Rotated output'
      ];
    }
    else if (input_lower.match(/rotate.*180/i)) {
      cmd = 'ffmpeg -i input.mp4 -vf "transpose=2,transpose=2" -c:a copy output.mp4';
      exp = [
        '-i input.mp4: Input video file',
        '-vf "transpose=2,transpose=2": Rotate 180°',
        'output.mp4: Rotated output'
      ];
    }
    else if (input_lower.match(/flip\s*(?:horizontal|h)/i)) {
      cmd = 'ffmpeg -i input.mp4 -vf "hflip" -c:a copy output.mp4';
      exp = [
        '-i input.mp4: Input video file',
        '-vf "hflip": Flip horizontally',
        'output.mp4: Flipped output'
      ];
    }
    else if (input_lower.match(/flip\s*(?:vertical|v)/i)) {
      cmd = 'ffmpeg -i input.mp4 -vf "vflip" -c:a copy output.mp4';
      exp = [
        '-i input.mp4: Input video file',
        '-vf "vflip": Flip vertically',
        'output.mp4: Flipped output'
      ];
    }

    // Remove audio
    else if (input_lower.match(/remove\s*audio|mute|no\s*audio/i)) {
      cmd = 'ffmpeg -i input.mp4 -an -c:v copy output.mp4';
      exp = [
        '-i input.mp4: Input video file',
        '-an: No audio',
        '-c:v copy: Copy video stream',
        'output.mp4: Video without audio'
      ];
    }

    // Extract frames
    else if (input_lower.match(/extract\s*frames?/i)) {
      cmd = 'ffmpeg -i input.mp4 -vf fps=1 output_%04d.png';
      exp = [
        '-i input.mp4: Input video file',
        '-vf fps=1: Extract 1 frame per second',
        'output_%04d.png: Output images (0001.png, 0002.png, etc.)'
      ];
    }

    // Thumbnail
    else if (input_lower.match(/thumbnail.*(?:at)?\s*([\d:]+)/i)) {
      const time = input_lower.match(/(?:at)?\s*([\d:]+)/i)[1];
      cmd = `ffmpeg -i input.mp4 -ss ${time} -frames:v 1 thumbnail.png`;
      exp = [
        '-i input.mp4: Input video file',
        `-ss ${time}: Seek to timestamp`,
        '-frames:v 1: Extract 1 frame',
        'thumbnail.png: Output image'
      ];
    }
    else if (input_lower.match(/thumbnail|screenshot/i)) {
      cmd = 'ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 thumbnail.png';
      exp = [
        '-i input.mp4: Input video file',
        '-ss 00:00:05: At 5 seconds',
        '-frames:v 1: Extract 1 frame',
        'thumbnail.png: Output image'
      ];
    }

    // Concatenate
    else if (input_lower.match(/concat|combine|merge.*videos?/i)) {
      cmd = 'ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mp4';
      exp = [
        'Create filelist.txt with: file \'video1.mp4\'\\nfile \'video2.mp4\'',
        '-f concat: Concat demuxer',
        '-safe 0: Allow absolute paths',
        '-i filelist.txt: Input file list',
        '-c copy: Copy streams',
        'output.mp4: Combined video'
      ];
    }

    // Audio conversion
    else if (input_lower.match(/convert.*audio.*(?:to|into)\s*(mp3|wav|aac|flac|ogg)/i)) {
      const format = input_lower.match(/(?:to|into)\s*(mp3|wav|aac|flac|ogg)/i)[1];
      const codecs = {
        mp3: 'libmp3lame',
        wav: 'pcm_s16le',
        aac: 'aac',
        flac: 'flac',
        ogg: 'libvorbis'
      };
      cmd = `ffmpeg -i input.ext -acodec ${codecs[format]} output.${format}`;
      exp = [
        '-i input.ext: Input audio file',
        `-acodec ${codecs[format]}: ${format.toUpperCase()} codec`,
        `output.${format}: Output file`
      ];
    }

    // Crop
    else if (input_lower.match(/crop.*(\d+)\s*x\s*(\d+)/i)) {
      const match = input_lower.match(/(\d+)\s*x\s*(\d+)/i);
      const width = match[1];
      const height = match[2];
      cmd = `ffmpeg -i input.mp4 -vf "crop=${width}:${height}" output.mp4`;
      exp = [
        '-i input.mp4: Input video file',
        `-vf "crop=${width}:${height}": Crop to ${width}x${height} from center`,
        'output.mp4: Cropped output'
      ];
    }

    return { command: cmd, explanation: exp };
  };

  // AI Fallback function
  const generateWithAI = async (userInput) => {
    if (!apiKey) {
      setError('No API key configured. Please add one in Settings.');
      return null;
    }

    try {
      setIsLoading(true);
      setError('');

      if (apiProvider === 'anthropic') {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            messages: [{
              role: 'user',
              content: `Convert this natural language description into a valid FFMPEG command. Provide ONLY the command without explanation. Use 'input.ext' as input filename and 'output.ext' as output filename where appropriate:\n\n${userInput}`
            }]
          })
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const command = data.content[0].text.trim();
        return { command, explanation: ['Generated by AI - verify before using'] };
      } else if (apiProvider === 'openai') {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [{
              role: 'user',
              content: `Convert this natural language description into a valid FFMPEG command. Provide ONLY the command without explanation. Use 'input.ext' as input filename and 'output.ext' as output filename where appropriate:\n\n${userInput}`
            }],
            temperature: 0.3
          })
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const command = data.choices[0].message.content.trim();
        return { command, explanation: ['Generated by AI - verify before using'] };
      }
    } catch (err) {
      setError(`AI generation failed: ${err.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle generate command
  const handleGenerate = async () => {
    if (!input.trim()) return;

    setError('');
    setIsLoading(true);

    // Try pattern matching first
    const result = generateFFMPEGCommand(input);

    if (result.command) {
      setCommand(result.command);
      setExplanation(result.explanation);
      addToHistory(input, result.command);
      setIsLoading(false);
    } else {
      // Fallback to AI
      const aiResult = await generateWithAI(input);
      if (aiResult) {
        setCommand(aiResult.command);
        setExplanation(aiResult.explanation);
        addToHistory(input, aiResult.command);
      } else {
        setError('Could not generate command. Try rephrasing or check settings.');
      }
      setIsLoading(false);
    }
  };

  // Add to history
  const addToHistory = (input, command) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      input: input.substring(0, 100),
      command: command.substring(0, 150)
    };
    const newHistory = [newEntry, ...history].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem('ffmpeg-history', JSON.stringify(newHistory));
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('ffmpeg-history');
  };

  // Export history
  const exportHistory = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ffmpeg-history-${Date.now()}.json`;
    a.click();
  };

  // Save settings
  const saveSettings = () => {
    localStorage.setItem('ffmpeg-api-key', apiKey);
    localStorage.setItem('ffmpeg-api-provider', apiProvider);
    setShowSettings(false);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);

      // Extract basic metadata
      const metadata = {
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type
      };
      setFileMetadata(metadata);

      // Try to extract video metadata if it's a video
      if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          metadata.duration = video.duration.toFixed(2) + 's';
          metadata.width = video.videoWidth;
          metadata.height = video.videoHeight;
          setFileMetadata({...metadata});
          URL.revokeObjectURL(video.src);
        };
        video.src = URL.createObjectURL(file);
      }
    }
  };

  return (
    <div className="ffmpeg-page">
      <div className="ffmpeg-container">
        {/* Header */}
        <header className="ffmpeg-header glass">
          <div>
            <h1>FFMPEG Command Generator</h1>
            <p className="subtitle">Convert natural language to FFMPEG commands</p>
          </div>
          <div className="header-actions">
            <button className="icon-btn glass" onClick={() => setShowSettings(true)} title="Settings">
              <FiSettings />
            </button>
            <Link to="/" className="btn-link glass">← Home</Link>
          </div>
        </header>

        <div className="ffmpeg-layout">
          {/* Main content */}
          <div className="ffmpeg-main">
            {/* Input section */}
            <section className="input-section glass">
              <label htmlFor="nl-input">What do you want to do?</label>
              <textarea
                id="nl-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., Convert MP4 to GIF, Extract audio as MP3, Resize video to 720p..."
                rows={4}
              />

              {/* Example prompts */}
              <div className="examples">
                <p className="examples-label">Examples:</p>
                <div className="examples-grid">
                  {examples.map((ex, i) => (
                    <button
                      key={i}
                      className="example-btn glass"
                      onClick={() => setInput(ex)}
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              {/* File upload */}
              <div className="file-upload">
                <label htmlFor="file-input" className="file-upload-label glass">
                  <FiUpload />
                  <span>Upload file to detect metadata</span>
                  <input
                    id="file-input"
                    type="file"
                    onChange={handleFileUpload}
                    accept="video/*,audio/*"
                  />
                </label>
                {fileMetadata && (
                  <div className="file-metadata glass">
                    <p><strong>{fileMetadata.name}</strong></p>
                    <p>Size: {fileMetadata.size}</p>
                    {fileMetadata.width && (
                      <p>Resolution: {fileMetadata.width}x{fileMetadata.height}</p>
                    )}
                    {fileMetadata.duration && (
                      <p>Duration: {fileMetadata.duration}</p>
                    )}
                  </div>
                )}
              </div>

              <button
                className="generate-btn glass"
                onClick={handleGenerate}
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Command'}
              </button>

              {error && <div className="error-msg glass">{error}</div>}
            </section>

            {/* Output section */}
            {command && (
              <section className="output-section glass">
                <div className="output-header">
                  <h2>Generated Command</h2>
                  <button
                    className="copy-btn glass"
                    onClick={handleCopy}
                    title="Copy to clipboard"
                  >
                    {copied ? <FiCheck /> : <FiCopy />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="command-output">{command}</pre>

                {explanation.length > 0 && (
                  <div className="explanation">
                    <h3>Explanation:</h3>
                    <ul>
                      {explanation.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* History sidebar */}
          <aside className="history-sidebar">
            <div className="history-header glass">
              <h3>History</h3>
              <div className="history-actions">
                <button
                  className="icon-btn"
                  onClick={exportHistory}
                  disabled={history.length === 0}
                  title="Export history"
                >
                  <FiDownload />
                </button>
                <button
                  className="icon-btn"
                  onClick={clearHistory}
                  disabled={history.length === 0}
                  title="Clear history"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <div className="history-list">
              {history.length === 0 ? (
                <p className="empty-history">No history yet</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="history-item glass"
                    onClick={() => {
                      setInput(item.input);
                      setCommand(item.command);
                    }}
                  >
                    <p className="history-input">{item.input}</p>
                    <code className="history-command">{item.command}</code>
                    <span className="history-time">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal glass" onClick={(e) => e.stopPropagation()}>
            <h2>Settings</h2>
            <div className="settings-content">
              <div className="form-group">
                <label>API Provider</label>
                <select
                  value={apiProvider}
                  onChange={(e) => setApiProvider(e.target.value)}
                >
                  <option value="anthropic">Anthropic (Claude)</option>
                  <option value="openai">OpenAI (GPT-4)</option>
                </select>
              </div>
              <div className="form-group">
                <label>API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                />
                <small>Used for AI fallback when pattern matching fails. Stored locally.</small>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowSettings(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={saveSettings}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
