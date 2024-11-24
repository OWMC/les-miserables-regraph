import { getLinkCount, getCombinedLinkValue, getSourceValue, getTargetValue, getNodeColour } from './helpers';

const lightColour = "#d3e3f3";
const mediumColour = "#285078";
const labelStyle = {
  color: lightColour,
  border: {
    radius: 5,
  },
};

let initialData = [1, 2, 3];

export function reformatData(initialData, importanceStandard) {
    const items = {};
    let nodeId = 1;
    let linkId = 1;
    let importanceValue = '';
    // Nodes
    initialData.nodes.forEach((node, index) => {
        if (importanceStandard === 'combined') {
          importanceValue = getCombinedLinkValue(initialData, index) 
        } else if (importanceStandard === 'source') {
          importanceValue = getSourceValue(initialData, index) 
        } else if (importanceStandard === 'target') {
          importanceValue = getTargetValue(initialData, index) 
        } else {
          importanceValue = getLinkCount(initialData, index);
        }
        items[`node${nodeId}`] = {
          label: [
            {
              ...labelStyle,
              text: node.name, 
              backgroundColor: getNodeColour(initialData, index),
            }
          ],
          size: Math.round((importanceValue - 1) * 0.1 + 1), // Proportional scaling to limit extreme size differences
          color: getNodeColour(initialData, index),
          value: importanceValue,
          data: {
            name: node.name,
            group: node.group,
            source: getSourceValue(initialData, index),
            target: getTargetValue(initialData, index),
            connections: getLinkCount(initialData, index),
            total: getCombinedLinkValue(initialData, index),
          },
        };
        nodeId++;
    });
    // Links
    initialData.links.forEach((link, index) => {
      items[`link${linkId}`] = {
        id1: `node${link.source + 1}`,
        id2: `node${link.target + 1}`,
        width: link.value * 2,
        flow: true,
        velocity: { velocity: 10},
        end1: {
          color: mediumColour,
        },
        end2: {
          arrow: true,
          color: lightColour,
        },
      };
      linkId++;
    });
    return items;
}
