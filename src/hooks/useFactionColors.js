
export const useFactionColors = () => {
  const getFactionColor = (factionName) => {
    if (!factionName) return "#5F0629";

    let hash = 0;
    const name = factionName.toLowerCase();

    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 75%, 55%)`;
  };

  return { getFactionColor };
};