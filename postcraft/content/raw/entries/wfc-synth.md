# Wave Function Collapse for Sounds

An LV2 plugin.

Repo : [https://github.com/danja/collapse-lv2](https://github.com/danja/collapse-lv2)

Demo : [YouTube](https://www.youtube.com/watch?v=aXFnkI-dZOA) (hope that works, I got a copyright warning)

It generates signal based on what it's seen, is a kind of machine learning lite. It's very noisy. Which is what I was hoping for. Aside from the obvious noise use, it *may* be useful as waveform shaper.

I stumbled on [WaveFunctionCollapse](https://github.com/mxgmn/WaveFunctionCollapse), "This program generates bitmaps that are locally similar to the input bitmap.". It occurred to me that the same algorithm might be usable on audio streams. I wrote a long prompt for [DeepSeek](https://www.deepseek.com/en) which had a good long discussion with itself before producing the material below. This I passed to [Claude chat](https://claude.ai/new) together with the instructions for it to make an [LV2 plugin](https://en.wikipedia.org/wiki/LV2) for me. I want to use it in [Reaper](https://www.reaper.fm/), my DAW of choice.
(I've already had a go at **vibe coding** with [amen-chaos](https://github.com/danja/amen-chaos) and [midi-chaos-amen](https://github.com/danja/midi-chaos-amen) with considerable success, as far as I took them). Claude gave me some patchy files which I stuck up at [GitHub](https://github.com/danja/collapse-lv2) before setting [Claude Code](https://www.anthropic.com/claude-code) on them.

~~So far I've not got anything usable, I ran out of Claude tokens. Apparently [Google Gemini](https://codeassist.google/) for coding is now free, so I may give that a shot later.~~ Gemini was slow. Went back to Claude and now **it works!**

Anyhow, below is what DeepSeek gave me, it has the basic idea. ~~I've a feeling it won't be any good without taking into account the periodicity of the input. This could potentially operate at the waveform level, or (depending on how it performs) over beats or bars. Dunno.~~

I added period detection with autocorrelation in at the start. It's very picky about which settings will actually produce a processed output. But it really messes things up, which is exactly what I was hoping for.

---

To apply the wave function collapse (WFC) technique to audio waveforms in near real-time, we reinterpret the grid-based approach for time-series data. Here's a conceptual adaptation and JavaScript implementation:

### Core Concept Adaptation:
1. **Grid Representation**:
   - **X-axis**: Represents time (one cycle or window of the waveform).
   - **Y-axis**: Represents **quantized amplitude levels** (discrete buckets for continuous sample values).
   - **Z-axis (optional)**: Encodes **local patterns** (e.g., sequences of amplitude changes).

2. **Pattern Extraction**:
   - Slice the input waveform into overlapping windows (e.g., 10-sample segments).
   - Quantize amplitudes (e.g., 256 levels) to create discrete "tiles".
   - Catalog valid neighbor transitions (e.g., which 10-sample blocks can follow each other).

3. **Real-Time Generation**:
   - Maintain a "collapsing" buffer of recent samples (context window).
   - For each new sample, resolve constraints by selecting valid patterns that match the context.
   - Output the next sample from the chosen pattern.

---

### JavaScript Implementation:
```javascript
class WaveformWFC {
  constructor(inputSamples, patternSize = 10, quantLevels = 256) {
    this.patternSize = patternSize;
    this.quantLevels = quantLevels;
    this.patterns = new Map(); // pattern -> {nextPatterns: Set, count: number}

    // Quantize input [-1, 1] to discrete levels
    this.quantize = (sample) =>
      Math.max(0, Math.min(quantLevels - 1,
        Math.floor((sample + 1) * quantLevels / 2)));

    this.dequantize = (level) =>
      (level / (quantLevels - 1)) * 2 - 1;

    this.extractPatterns(inputSamples);
  }

  extractPatterns(samples) {
    // Build patterns from sliding windows
    for (let i = 0; i < samples.length - this.patternSize; i++) {
      const window = samples.slice(i, i + this.patternSize);
      const quantPattern = window.map(s => this.quantize(s));
      const key = quantPattern.join(',');

      // Track pattern frequency and allowed successors
      if (!this.patterns.has(key)) {
        this.patterns.set(key, { nextPatterns: new Set(), count: 0 });
      }
      const data = this.patterns.get(key);
      data.count++;

      // Record valid next pattern (overlapping window)
      if (i < samples.length - this.patternSize - 1) {
        const nextWindow = samples.slice(i + 1, i + this.patternSize + 1);
        const nextKey = nextWindow.map(s => this.quantize(s)).join(',');
        data.nextPatterns.add(nextKey);
      }
    }
  }

  generateSample(context) {
    // Quantize recent context (patternSize - 1 samples)
    const quantContext = context.map(s => this.quantize(s));
    const contextKey = quantContext.join(',');

    // Find patterns starting with current context
    const candidates = [];
    for (const [pattern, data] of this.patterns) {
      const patternArr = pattern.split(',').map(Number);
      const matchesContext = quantContext.every(
        (val, i) => val === patternArr[i]
      );

      if (matchesContext) {
        // Weight by occurrence frequency
        for (let i = 0; i < data.count; i++) {
          candidates.push(patternArr[patternArr.length - 1]); // Last sample in pattern
        }
      }
    }

    // Fallback: Random sample if no candidates
    if (candidates.length === 0) {
      return Math.random() * 2 - 1; // [-1, 1]
    }

    // Random weighted selection
    const nextLevel = candidates[Math.floor(Math.random() * candidates.length)];
    return this.dequantize(nextLevel);
  }
}

// Usage Example
const audioContext = new AudioContext();
const inputSamples = [...]; // Float32Array from source audio

const wfc = new WaveformWFC(inputSamples);
const outputBuffer = new Float32Array(44100); // 1sec buffer
let context = new Array(wfc.patternSize - 1).fill(0); // Initial silence

for (let i = 0; i < outputBuffer.length; i++) {
  outputBuffer[i] = wfc.generateSample(context);

  // Update context (remove oldest, add new sample)
  context.shift();
  context.push(outputBuffer[i]);
}

// Play generated audio
const buffer = audioContext.createBuffer(1, outputBuffer.length, 44100);
buffer.copyToChannel(outputBuffer, 0);
const source = audioContext.createBufferSource();
source.buffer = buffer;
source.connect(audioContext.destination);
source.start();
```

### Key Optimizations for Real-Time:
1. **Context Hashing**:
   - Precompute lookup tables for quantized context keys to candidate patterns.
2. **Approximate Matching**:
   - Use Euclidean distance thresholds for noisy inputs.
3. **Pattern Pruning**:
   - Discard low-frequency patterns to reduce state space.
4. **Overlap Handling**:
   - Generate samples in blocks (e.g., 128 samples) to amortize lookup costs.

### How Structure is Preserved:
1. **Local Constraints**:
   - Transition rules enforce that amplitude sequences (e.g., attack-decay in notes) replicate input behaviors.
2. **Global Coherence**:
   - Weighted pattern selection maintains statistical properties (e.g., amplitude distribution).
3. **Continuity**:
   - Overlapping context buffers prevent discontinuities between generated segments.

This approach mirrors WFC's constraint-solving in a temporal domain, transforming input waveforms into novel outputs with similar micro/macro structures.
