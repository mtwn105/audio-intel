import { useState, useEffect } from 'react';

export function useAudioWaveform(audioUrl: string) {
  const [waveform, setWaveform] = useState<number[]>([]);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    let source: AudioBufferSourceNode;

    fetch(audioUrl)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        setDuration(audioBuffer.duration);

        const channelData = audioBuffer.getChannelData(0);
        const samples = window.innerWidth < 768 ? 50 : 100; // Number of samples based on screen width
        const blockSize = Math.floor(channelData.length / samples);
        const waveformData = new Array(samples).fill(0);
        let maxSample = 0;

        const processSamples = (i: number) => {
          if (i < samples) {
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
              sum += Math.abs(channelData[blockSize * i + j]);
            }
            waveformData[i] = sum / blockSize;
            maxSample = Math.max(maxSample, waveformData[i]);
            requestAnimationFrame(() => processSamples(i + 1)); // Process next sample
          } else {
            // Normalize waveform data
            const multiplier = maxSample > 0 ? Math.pow(maxSample, -1) : 1;
            const normalizedData = waveformData.map(n => n * multiplier);
            setWaveform(normalizedData);
          }
        };

        processSamples(0); // Start processing samples
      })
      .catch(err => console.error('Error loading audio', err));

    return () => {
      if (source) {
        source.stop();
      }
      audioContext.close();
    };
  }, [audioUrl]);

  return { waveform, duration };
}


