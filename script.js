document.addEventListener('DOMContentLoaded', () => {
      const keyboard = document.querySelector('.keyboard');
      const computerKeys = document.querySelectorAll('.computer-keyboard .key');
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      const notes = [
        'A0', 'A#0', 'B0', 'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1',
        'A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2',
        'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3',
        'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4',
        'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5',
        'A5', 'A#5', 'B5', 'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6',
        'A6', 'A#6', 'B6', 'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7',
        'A7', 'A#7', 'B7', 'C8'
      ];

      const noteFrequencies = {
        'A0': 27.50, 'A#0': 29.14, 'B0': 30.87,
        'C1': 32.70, 'C#1': 34.65, 'D1': 36.71, 'D#1': 38.89, 'E1': 41.20, 'F1': 43.65, 'F#1': 46.25, 'G1': 49.00, 'G#1': 51.91,
        'A1': 55.00, 'A#1': 58.27, 'B1': 61.74,
        'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83,
        'A2': 110.00, 'A#2': 116.54, 'B2': 123.47,
        'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65,
        'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
        'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30,
        'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
        'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61,
        'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
        'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51, 'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98, 'G6': 1567.98, 'G#6': 1661.22,
        'A6': 1760.00, 'A#6': 1864.66, 'B6': 1975.53,
        'C7': 2093.00, 'C#7': 2217.46, 'D7': 2349.32, 'D#7': 2489.02, 'E7': 2637.02, 'F7': 2793.83, 'F#7': 2959.96, 'G7': 3135.96, 'G#7': 3322.44,
        'A7': 3520.00, 'A#7': 3729.31, 'B7': 3951.07,
        'C8': 4186.01
      };

      const keyToNoteMap = {
        '`': 'C1', '1': 'C#1', '2': 'D1', '3': 'D#1', '4': 'E1', '5': 'F1', '6': 'F#1', '7': 'G1', '8': 'G#1', '9': 'A1', '0': 'A#1', '-': 'B1',
        'q': 'C2', 'w': 'C#2', 'e': 'D2', 'r': 'D#2', 't': 'E2', 'y': 'F2', 'u': 'F#2', 'i': 'G2', 'o': 'G#2', 'p': 'A2', '[': 'A#2', ']': 'B2',
        'a': 'C3', 's': 'C#3', 'd': 'D3', 'f': 'D#3', 'g': 'E3', 'h': 'F3', 'j': 'F#3', 'k': 'G3', 'l': 'G#3', ';': 'A3', '\'': 'A#3', 'Enter': 'B3',
        'z': 'C4', 'x': 'C#4', 'c': 'D4', 'v': 'D#4', 'b': 'E4', 'n': 'F4', 'm': 'F#4', ',': 'G4', '.': 'G#4', '/': 'A4', 'ShiftRight': 'A#4', 'Space': 'B4',
        'ControlLeft': 'C5', 'MetaLeft': 'C#5', 'AltLeft': 'D5', 'AltRight': 'D#5', 'MetaRight': 'E5', 'ContextMenu': 'F5', 'ControlRight': 'F#5',
      };

      const noteToKeyMap = Object.fromEntries(Object.entries(keyToNoteMap).map(([key, note]) => [note, key]));

      notes.forEach(note => {
        const isBlackKey = note.includes('#');
        const key = document.createElement('div');
        key.classList.add(isBlackKey ? 'black-key' : 'white-key');
        key.setAttribute('data-note', note);
        keyboard.appendChild(key);

        key.addEventListener('click', () => {
          playNote(note);
          highlightComputerKey(note);
        });
      });

      function playNote(note) {
        const frequency = noteFrequencies[note];
        if (!frequency) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;

        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
      }

      function highlightComputerKey(note) {
        const computerKey = noteToKeyMap[note];
        if (!computerKey) return;

        computerKeys.forEach(key => {
          key.classList.remove('active');
        });

        const keyElement = document.querySelector(`.computer-keyboard .key[data-key="${computerKey}"]`);
        if (keyElement) {
          keyElement.classList.add('active');
          setTimeout(() => {
            keyElement.classList.remove('active');
          }, 200);
        }
      }

      function highlightPianoKey(key) {
        const note = keyToNoteMap[key];
          if (!note) return;

        const pianoKeys = document.querySelectorAll('.keyboard div');
        pianoKeys.forEach(pianoKey => {
          pianoKey.classList.remove('active');
        });

        const pianoKeyElement = document.querySelector(`.keyboard div[data-note="${note}"]`);
        if (pianoKeyElement) {
          pianoKeyElement.classList.add('active');
          setTimeout(() => {
            pianoKeyElement.classList.remove('active');
          }, 200);
        }
      }

      document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (keyToNoteMap[key]) {
          playNote(keyToNoteMap[key]);
          highlightPianoKey(key);
        }
      });
    });
