export const getRandomColor = (count: number = 25): string => {
  const colors: string[] = [];

  for (let i = 0; i < count; i++) {
    const r = Math.floor(200 + Math.random() * 55); // High red value
    const g = Math.floor(200 + Math.random() * 55); // High green value
    const b = Math.floor(200 + Math.random() * 55); // High blue value

    const hex = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    colors.push(hex);
  }

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
