export const playSound = (file: string) => {
  const audio = new Audio(`${file}.mp3`);
  try {
    audio.play();
  } catch {
    throw new URIError(`No file named "${file}.mp3"`);
  }
};
