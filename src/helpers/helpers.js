const mediumColour = "#285078";
const altColour = "#bc6017";

// count links: source and destination.
export function getLinkCount(data, index) {
  return data.links.filter(link => link.source === index || link.target === index).length;
};

// count value of each link: combined value as source and destination.
export function getCombinedLinkValue(data, index) {
  return data.links.filter(link => link.source === index || link.target === index).map(link => link.value).reduce((a, b) => a + b, 0);
};

// Get value of each link where node is source.
export function getSourceValue(data, index) {
  return data.links.filter(link => link.source === index).map(link => link.value).reduce((a, b) => a + b, 0);
};

// Get value of each link where node is target.
export function getTargetValue(data, index) {
  return data.links.filter(link => link.target === index).map(link => link.value).reduce((a, b) => a + b, 0);
};

// Colours for nodes
export function getNodeColour(data, index) {
   if (getSourceValue(data, index) === 0 || getTargetValue(data, index) === 0) {
    return altColour;
  } else {
    return mediumColour;
  }
}
