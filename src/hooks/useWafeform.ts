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
        const waveformData = [];

        for (let i = 0; i < samples; i++) {
          const start = blockSize * i;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(channelData[start + j]);
          }
          waveformData.push(sum / blockSize);
        }

        // Normalize waveform data
        const multiplier = Math.pow(Math.max(...waveformData), -1);
        const normalizedData = waveformData.map(n => n * multiplier);

        setWaveform(normalizedData);
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


