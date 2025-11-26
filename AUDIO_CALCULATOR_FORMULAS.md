# Audio Calculator - Comprehensive Formula Reference

## Overview
This document contains all formulas and calculations useful for audio engineers, organized by category. Each section includes the formula, explanation, practical use cases, and implementation notes.

---

## 1. DECIBEL CALCULATIONS

### 1.1 Voltage/Amplitude to dB
```
dB = 20 × log₁₀(V₁ / V₂)
```
- **Use case**: Converting between linear voltage levels and dB
- **Example**: Compare two signal levels, calculate gain/attenuation
- **Input**: Two voltage values (V₁ = measured, V₂ = reference)
- **Reference**: V₂ typically 1V for dBV, 0.775V for dBu

### 1.2 Power to dB
```
dB = 10 × log₁₀(P₁ / P₂)
```
- **Use case**: Comparing power levels (speakers, amplifiers)
- **Example**: Calculate amplifier power ratio
- **Input**: Two power values in watts

### 1.3 dB to Linear (Voltage/Amplitude)
```
Ratio = 10^(dB / 20)
```
- **Use case**: Convert dB gain to multiplication factor
- **Example**: +6dB = 2× voltage, -6dB = 0.5× voltage

### 1.4 dB to Linear (Power)
```
Ratio = 10^(dB / 10)
```
- **Use case**: Convert dB to power ratio
- **Example**: +3dB = 2× power, +10dB = 10× power

### 1.5 Sum of dB Levels (Uncorrelated Sources)
```
dB_total = 10 × log₁₀(10^(dB₁/10) + 10^(dB₂/10) + ...)
```
- **Use case**: Adding multiple sound sources together
- **Example**: Two speakers playing at 80dB each = 83dB total

### 1.6 dBFS (Full Scale Digital)
```
dBFS = 20 × log₁₀(sample_value / max_sample_value)
```
- **Reference**: 0 dBFS = maximum digital level (clipping point)
- **Note**: Always negative or zero in digital systems

### 1.7 Common dB Reference Conversions
| Standard | Reference | Formula |
|----------|-----------|---------|
| dBu | 0.775V | dBu = 20 × log₁₀(V / 0.775) |
| dBV | 1V | dBV = 20 × log₁₀(V / 1) |
| dBm | 1mW into 600Ω | dBm = 10 × log₁₀(P / 0.001) |
| dBSPL | 20 µPa | dBSPL = 20 × log₁₀(P / 0.00002) |

### 1.8 dBu to dBV Conversion
```
dBV = dBu - 2.21
dBu = dBV + 2.21
```

---

## 2. FREQUENCY & WAVELENGTH

### 2.1 Wavelength from Frequency
```
λ = c / f
```
- **λ** = wavelength (meters)
- **c** = speed of sound (343 m/s at 20°C in air)
- **f** = frequency (Hz)
- **Use case**: Room acoustics, speaker placement, bass trap sizing

### 2.2 Speed of Sound vs Temperature
```
c = 331.3 × √(1 + T/273.15)
```
or simplified:
```
c ≈ 331.3 + (0.606 × T)
```
- **T** = temperature in Celsius
- **Use case**: Precise delay calculations, outdoor events

### 2.3 Frequency to Musical Note
```
n = 12 × log₂(f / 440)
Note = A4 + n semitones
```
- **Use case**: Identify musical note from frequency
- **440 Hz** = A4 (concert pitch)

### 2.4 Musical Note to Frequency
```
f = 440 × 2^((n - 69) / 12)
```
- **n** = MIDI note number (A4 = 69)
- **Use case**: Synthesizers, tuning reference

### 2.5 Octave Relationships
```
f_octave_up = f × 2
f_octave_down = f / 2
Octaves apart = log₂(f₂ / f₁)
```

### 2.6 Cents (Pitch Deviation)
```
cents = 1200 × log₂(f₁ / f₂)
```
- **100 cents** = 1 semitone
- **Use case**: Tuning precision, pitch correction

---

## 3. TIME & DELAY

### 3.1 Distance to Delay Time
```
t = d / c
```
- **t** = time (seconds)
- **d** = distance (meters)
- **c** = speed of sound (343 m/s)
- **Use case**: Speaker alignment, delay compensation

### 3.2 Delay Time to Distance
```
d = t × c
```
- **Use case**: Calculate path length from measured delay

### 3.3 Samples to Milliseconds
```
ms = (samples / sample_rate) × 1000
```
- **Use case**: Convert sample delay to time

### 3.4 Milliseconds to Samples
```
samples = (ms / 1000) × sample_rate
```
- **Use case**: Set precise delay in samples

### 3.5 BPM to Milliseconds
```
ms_per_beat = 60000 / BPM
```
- **Use case**: Sync delays to tempo

### 3.6 Note Value to Milliseconds
```
ms = (60000 / BPM) × note_multiplier
```
| Note Value | Multiplier |
|------------|------------|
| Whole (1/1) | 4 |
| Half (1/2) | 2 |
| Quarter (1/4) | 1 |
| Eighth (1/8) | 0.5 |
| Sixteenth (1/16) | 0.25 |
| Thirty-second (1/32) | 0.125 |
| Dotted | × 1.5 |
| Triplet | × 2/3 |

### 3.7 Haas Effect Threshold
```
Haas threshold: 1-35ms delay
```
- **<1ms**: Comb filtering / phase issues
- **1-35ms**: Perceived as single source (precedence effect)
- **>35ms**: Perceived as echo/distinct sound

### 3.8 Pre-Delay for Reverb (Room Size Estimation)
```
pre_delay_ms ≈ room_size_meters × 2.9
```
- **Use case**: Set reverb pre-delay based on simulated room size

---

## 4. SAMPLE RATE & BIT DEPTH

### 4.1 Nyquist Frequency
```
f_nyquist = sample_rate / 2
```
- **Use case**: Determine maximum recordable frequency
- **Example**: 44.1kHz → 22.05kHz max frequency

### 4.2 Bit Depth to Dynamic Range
```
Dynamic Range (dB) = 6.02 × bit_depth + 1.76
```
| Bit Depth | Dynamic Range |
|-----------|---------------|
| 16-bit | ~96 dB |
| 24-bit | ~144 dB |
| 32-bit float | ~1528 dB (theoretical) |

### 4.3 File Size Calculation
```
Size (bytes) = sample_rate × bit_depth/8 × channels × duration_seconds
Size (MB) = Size (bytes) / 1048576
```
- **Use case**: Estimate recording storage needs

### 4.4 Bitrate (for compressed audio)
```
Bitrate (kbps) = file_size_KB × 8 / duration_seconds
```

### 4.5 Sample Rate Conversion Ratio
```
ratio = target_sample_rate / source_sample_rate
new_sample_count = original_samples × ratio
```

---

## 5. ROOM ACOUSTICS

### 5.1 Room Modes (Axial)
```
f = c / (2 × L)
```
- **f** = fundamental mode frequency
- **L** = room dimension (length, width, or height)
- **Use case**: Identify problematic bass frequencies

### 5.2 All Room Modes (Axial, Tangential, Oblique)
```
f = (c/2) × √((nx/Lx)² + (ny/Ly)² + (nz/Lz)²)
```
- **nx, ny, nz** = mode numbers (0, 1, 2, 3...)
- **Axial**: One dimension varies (e.g., 1,0,0)
- **Tangential**: Two dimensions vary (e.g., 1,1,0)
- **Oblique**: All three vary (e.g., 1,1,1)

### 5.3 RT60 (Sabine Formula)
```
RT60 = 0.161 × V / A
```
- **V** = room volume (m³)
- **A** = total absorption (Sabins) = Σ(surface_area × absorption_coefficient)
- **Use case**: Calculate reverb time

### 5.4 RT60 (Eyring Formula) - for higher absorption
```
RT60 = 0.161 × V / (-S × ln(1 - α_avg))
```
- **S** = total surface area
- **α_avg** = average absorption coefficient

### 5.5 Critical Distance
```
Dc = 0.141 × √(Q × A)
```
- **Dc** = critical distance (meters)
- **Q** = directivity factor of source
- **A** = room absorption
- **Use case**: Where direct sound = reverberant sound

### 5.6 Schroeder Frequency
```
f_s = 2000 × √(RT60 / V)
```
- **Use case**: Below this frequency, room modes dominate

### 5.7 Absorption Coefficient Needs
```
Required_absorption = (0.161 × V) / target_RT60
```

---

## 6. SPEAKER & PA CALCULATIONS

### 6.1 Inverse Square Law
```
dB_change = 20 × log₁₀(d₁ / d₂)
```
- **Rule of thumb**: -6dB per doubling of distance
- **Use case**: SPL prediction at different distances

### 6.2 SPL at Distance
```
SPL_d = SPL_ref - 20 × log₁₀(d / d_ref)
```
- **SPL_ref** = SPL at reference distance (usually 1m)
- **Use case**: Calculate expected SPL at listener position

### 6.3 Required Amplifier Power
```
P_required = P_ref × 10^((SPL_target - SPL_1W_1m) / 10) × (d / d_ref)²
```
- **Use case**: Size amplifier for venue

### 6.4 Speaker Coverage Angle
```
Coverage area width = 2 × d × tan(angle / 2)
```
- **Use case**: Calculate speaker coverage at distance

### 6.5 Subwoofer Coupling (Multiple Subs)
```
SPL_increase = 20 × log₁₀(n)  [coherent sources]
SPL_increase = 10 × log₁₀(n)  [incoherent sources]
```
- **n** = number of subwoofers
- **Coherent**: +6dB per doubling
- **Use case**: Stack/array calculations

### 6.6 Line Array Element Spacing
```
d_max = c / (2 × f_max)
```
- **d_max** = maximum element spacing to avoid grating lobes
- **Use case**: Design line arrays

### 6.7 Crossover Frequency for Subs
```
f_crossover = c / (4 × cabinet_depth)
```
- **Use case**: Estimate crossover point based on sub cabinet

### 6.8 Port Tuning Frequency (Bass Reflex)
```
f_b = (c / 2π) × √(S_v / (V_b × L_v))
```
- **S_v** = port area
- **V_b** = box volume  
- **L_v** = effective port length

---

## 7. MICROPHONE CALCULATIONS

### 7.1 3:1 Rule (Minimum Mic Spacing)
```
d_between_mics ≥ 3 × d_to_source
```
- **Use case**: Prevent phase issues with multiple mics

### 7.2 Proximity Effect
```
Bass boost ≈ 6dB per halving of distance (below ~200Hz)
```
- Applies to cardioid and figure-8 patterns
- **Use case**: Vocal warmth, bass management

### 7.3 Stereo Recording Angles

#### ORTF
- **Spacing**: 17cm between capsules
- **Angle**: 110° between capsules
- **Pickup angle**: ~96°

#### XY
- **Spacing**: Capsules coincident
- **Angle**: 90-135° between capsules
- **Pickup angle**: ~180° (90°) to ~127° (135°)

#### Spaced Pair (A/B)
```
Spacing (cm) ≈ 30 × (wavelength at lowest frequency / 2)
```

#### Mid-Side Decode
```
Left = Mid + Side
Right = Mid - Side
```

### 7.4 Sensitivity Conversion
```
dBV = dBu - 2.21
mV/Pa to dBV: dBV = 20 × log₁₀(sensitivity_mV / 1000)
```

### 7.5 Self-Noise / Equivalent Noise Level
```
S/N ratio = sensitivity_dBV - self_noise_dBA
```

---

## 8. FILTER & EQ CALCULATIONS

### 8.1 Q Factor
```
Q = f_center / bandwidth
bandwidth = f_high - f_low (at -3dB points)
```

### 8.2 Bandwidth to Q
```
Q = f_center / (f_upper - f_lower)
```

### 8.3 Q to Bandwidth (Octaves)
```
Bandwidth_octaves = 2 × asinh(1 / (2 × Q)) / ln(2)
```
or approximately:
```
Bandwidth_octaves ≈ 1.41 / Q  (for Q > 0.5)
```

### 8.4 Octaves to Q
```
Q = √(2^n) / (2^n - 1)
```
- **n** = bandwidth in octaves

### 8.5 Filter Slope
| Order | Slope |
|-------|-------|
| 1st | 6 dB/octave |
| 2nd | 12 dB/octave |
| 3rd | 18 dB/octave |
| 4th | 24 dB/octave |
| nth | n × 6 dB/octave |

### 8.6 Butterworth -3dB Point
```
-3dB at cutoff frequency (by definition)
```

### 8.7 Linkwitz-Riley Alignment
```
-6dB at crossover frequency (both filters sum to 0dB)
```

### 8.8 Graphic EQ Center Frequencies (ISO)
**1/3 Octave**: 20, 25, 31.5, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1k, 1.25k, 1.6k, 2k, 2.5k, 3.15k, 4k, 5k, 6.3k, 8k, 10k, 12.5k, 16k, 20k Hz

**1 Octave**: 31.5, 63, 125, 250, 500, 1k, 2k, 4k, 8k, 16k Hz

---

## 9. DYNAMICS CALCULATIONS

### 9.1 Compression Ratio
```
Output change = Input change / Ratio
```
- **Example**: 4:1 ratio, 12dB over threshold → 3dB output increase

### 9.2 Gain Reduction
```
GR = (Input - Threshold) × (1 - 1/Ratio)
```
- Only when Input > Threshold

### 9.3 Makeup Gain Estimation
```
Makeup ≈ Threshold × (1 - 1/Ratio) / 2
```
- **Use case**: Starting point for makeup gain

### 9.4 Attack Time to Frequency
```
f = 1 / (2π × attack_time_seconds)
```
- **Use case**: Understand what transients pass through

### 9.5 Release Time Recommendations
```
Release (ms) ≈ 60000 / (BPM × 4)  [for rhythmic pumping]
Release (ms) ≈ 2600 / f_lowest    [for transparent compression]
```

### 9.6 RMS vs Peak
```
RMS = Peak × 0.707  (for pure sine wave)
Peak = RMS × 1.414  (for pure sine wave)
```
- Real audio varies; typical music: Peak ≈ RMS + 12-18dB

### 9.7 Crest Factor
```
Crest Factor (dB) = 20 × log₁₀(Peak / RMS)
```

### 9.8 LUFS / Loudness
```
Loudness (LUFS) = -0.691 + 10 × log₁₀(Σ weighted_channel_powers)
```
- **Target levels**:
  - Streaming: -14 LUFS
  - Broadcast (EBU R128): -23 LUFS
  - Film: -24 LKFS

---

## 10. ELECTRICAL / IMPEDANCE

### 10.1 Ohm's Law
```
V = I × R
I = V / R
R = V / I
```

### 10.2 Power
```
P = V × I = V² / R = I² × R
```

### 10.3 dBm to Watts
```
P_watts = 10^((dBm - 30) / 10)
P_watts = 0.001 × 10^(dBm / 10)
```

### 10.4 Watts to dBm
```
dBm = 10 × log₁₀(P_watts / 0.001)
dBm = 10 × log₁₀(P_watts) + 30
```

### 10.5 Impedance Bridging
```
Voltage transfer = Z_load / (Z_source + Z_load)
```
- **Ideal**: Z_load >> Z_source (10× or more)
- **Pro audio standard**: Low-Z output (<150Ω), High-Z input (>10kΩ)

### 10.6 Parallel Impedances
```
1/Z_total = 1/Z₁ + 1/Z₂ + ...
```
For two impedances:
```
Z_total = (Z₁ × Z₂) / (Z₁ + Z₂)
```

### 10.7 Speaker Impedance (Multiple Drivers)
**Series**: Z_total = Z₁ + Z₂
**Parallel**: Z_total = (Z₁ × Z₂) / (Z₁ + Z₂)

### 10.8 Cable Capacitance Effect (High-Z)
```
f_cutoff = 1 / (2π × R_source × C_cable)
```
- **Use case**: Calculate high-frequency rolloff with long cables on passive instruments

### 10.9 Maximum Cable Length (Before Signal Loss)
```
L_max ≈ target_cutoff × 10^6 / (C_per_meter × R_source × 2π)
```

---

## 11. PSYCHOACOUSTICS

### 11.1 Equal Loudness (Fletcher-Munson Approximation)
- Human hearing most sensitive: 2-5 kHz
- Need more SPL at low/high frequencies for equal perceived loudness

### 11.2 Critical Bandwidth (Bark Scale)
```
Critical Band (Hz) ≈ 25 + 75 × (1 + 1.4 × (f/1000)²)^0.69
```

### 11.3 Masking Threshold
```
Masking spread ≈ 15-20 dB within critical band
```

### 11.4 Just Noticeable Difference (JND)
| Parameter | JND |
|-----------|-----|
| Level | ~1 dB |
| Frequency | ~0.5% (~8 cents) |
| Time/Delay | ~1-2 ms |

### 11.5 Localization
- **ITD (Interaural Time Difference)**: < 1.5ms, dominant below 1.5kHz
- **ILD (Interaural Level Difference)**: dominant above 1.5kHz

---

## 12. MUSIC THEORY / TIMING

### 12.1 BPM to Hz
```
Hz = BPM / 60
```

### 12.2 Frequency Ratios (Just Intonation)
| Interval | Ratio |
|----------|-------|
| Unison | 1:1 |
| Octave | 2:1 |
| Fifth | 3:2 |
| Fourth | 4:3 |
| Major Third | 5:4 |
| Minor Third | 6:5 |

### 12.3 Equal Temperament Semitone
```
Ratio = 2^(1/12) ≈ 1.05946
```

### 12.4 Tempo to Time Signature
```
Bar duration (ms) = (60000 / BPM) × beats_per_bar
```

---

## 13. DIGITAL AUDIO WORKSTATION (DAW)

### 13.1 Latency Calculation
```
Latency (ms) = (buffer_size / sample_rate) × 1000
Round-trip latency = Input latency + Output latency + Processing
```

### 13.2 Buffer Size Recommendations
| Use Case | Buffer Size |
|----------|-------------|
| Recording/Tracking | 64-128 samples |
| Mixing | 256-512 samples |
| Mastering | 1024-2048 samples |

### 13.3 CPU vs Buffer Tradeoff
- Lower buffer = lower latency, higher CPU
- Higher buffer = higher latency, lower CPU

### 13.4 Plugin Delay Compensation
```
Total PDC = Σ all_plugin_latencies_in_chain
```

### 13.5 Dithering
- Apply when reducing bit depth
- Types: TPDF (flat), POW-r (shaped), MBIT+ (shaped)
- Amount: ~1 LSB of target bit depth

---

## 14. LIVE SOUND SPECIFIC

### 14.1 System Delay for Speaker Alignment
```
Delay (ms) = distance (m) / 0.343
Delay (ms) = distance (ft) / 1.125
```

### 14.2 Feedback Frequency Estimation
```
f_feedback = c / (2 × d_mic_to_speaker)
```

### 14.3 Gain Before Feedback
```
GBF (dB) = 10 × log₁₀(D_critical²) - 10 × log₁₀(Q × V)
```
- Improve by: Reducing distance, adding absorption, using directional mics/speakers

### 14.4 Audience Absorption
```
Absorption per person ≈ 0.4-0.5 Sabins (standing)
Absorption per person ≈ 0.5-0.7 Sabins (seated)
```

### 14.5 Sound System Power Sizing
```
P_required = 10^((SPL_target - Sensitivity + 20 × log₁₀(d)) / 10)
```
- Add 3-6dB headroom for peaks

---

## 15. NOISE & INTERFERENCE

### 15.1 Noise Floor
```
Thermal noise floor = -174 dBm/Hz (at 20°C)
```

### 15.2 Signal-to-Noise Ratio
```
SNR (dB) = 20 × log₁₀(V_signal / V_noise)
SNR (dB) = Signal level (dB) - Noise level (dB)
```

### 15.3 CMRR (Common Mode Rejection Ratio)
```
CMRR (dB) = 20 × log₁₀(V_differential / V_common_mode)
```
- Balanced connections: typically 60-80dB CMRR

### 15.4 Noise from Multiple Sources
```
Noise_total = √(N₁² + N₂² + N₃²...)
```

### 15.5 Hum Frequencies
- **50Hz regions**: 50, 100, 150, 200, 250 Hz... (and harmonics)
- **60Hz regions**: 60, 120, 180, 240, 300 Hz... (and harmonics)

---

## 16. UNIT CONVERSIONS

### 16.1 Length
- 1 meter = 3.281 feet
- 1 foot = 0.3048 meters
- 1 inch = 2.54 cm

### 16.2 Temperature
```
°F = (°C × 9/5) + 32
°C = (°F - 32) × 5/9
```

### 16.3 Frequency to Period
```
Period (s) = 1 / frequency (Hz)
Period (ms) = 1000 / frequency (Hz)
```

### 16.4 Angular Frequency
```
ω = 2π × f
```

### 16.5 Data Storage
- 1 KB = 1024 bytes
- 1 MB = 1024 KB = 1,048,576 bytes
- 1 GB = 1024 MB

---

## CALCULATOR FEATURE CATEGORIES

Based on the above formulas, the AudioCalculator should include these main sections:

### Category 1: Decibel Calculator
- dB addition/subtraction
- Voltage/Power to dB
- dB to linear conversion
- dB reference conversions (dBu, dBV, dBFS, dBSPL)

### Category 2: Frequency & Wavelength
- Frequency to wavelength
- Note to frequency / Frequency to note
- Cents calculator
- Speed of sound at temperature

### Category 3: Time & Delay
- Distance to delay
- BPM to delay (with note values)
- Samples to ms conversion
- Haas effect reference

### Category 4: Sample Rate & Bit Depth
- Nyquist frequency
- Dynamic range calculator
- File size estimator
- Bitrate calculator

### Category 5: Room Acoustics
- Room mode calculator
- RT60 calculator (Sabine/Eyring)
- Critical distance
- Schroeder frequency

### Category 6: Speaker & PA
- SPL at distance
- Inverse square law
- Speaker coverage
- Subwoofer coupling

### Category 7: Filter & EQ
- Q to bandwidth converter
- Filter slope reference
- Crossover calculator

### Category 8: Dynamics
- Compression ratio calculator
- Gain reduction estimator
- Attack/Release to frequency

### Category 9: Electrical
- Ohm's law calculator
- Impedance (series/parallel)
- dBm to Watts
- Cable capacitance

### Category 10: Music & Timing
- BPM calculator
- Note duration calculator
- Frequency ratios

### Category 11: Loudness
- LUFS targets reference
- Peak vs RMS
- Crest factor

---

## IMPLEMENTATION NOTES

### Priority Features (Most Used)
1. ⭐ dB Calculator (conversions, addition)
2. ⭐ Delay/BPM Calculator
3. ⭐ Frequency/Wavelength
4. ⭐ Sample/Time Converter
5. ⭐ Room Modes
6. ⭐ File Size Calculator

### UI Suggestions
- Tabbed interface for categories
- Real-time calculation as user types
- Copy result button
- Common presets/quick values
- Mobile-friendly
- Dark mode option
- Save favorite calculations

### Precision
- Display 2-4 decimal places
- Use appropriate units (Hz/kHz, ms/s, etc.)
- Handle edge cases (division by zero, negative logs)
