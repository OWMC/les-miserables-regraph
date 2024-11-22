const { getLinkCount, getCombinedLinkValue, getSourceValue, getTargetValue, getNodeColour } = require('./helpers');

const data = {
    "nodes": [
      {
        "name": "Myriel",
        "group": 1
      },
      {
        "name": "Napoleon",
        "group": 1
      },
      {
        "name": "Mlle.Baptistine",
        "group": 1
      },
      {
        "name": "Mme.Magloire",
        "group": 1
      }
    ],
    "links": [
      {
        "source": 1,
        "target": 0,
        "value": 1
      },
      {
        "source": 0,
        "target": 1,
        "value": 8
      },
      {
        "source": 2,
        "target": 3,
        "value": 1
      }    
    ]
  }

test('Counts number of links affecting Myriel', () => {
  expect(getLinkCount(data, 0)).toBe(2);
});

test('Calculates combined value of all links affecting Myriel', () => {
    expect(getCombinedLinkValue(data, 0)).toBe(9);
});

test('Calculates combined value of all links affecting Baptistine', () => {
    expect(getCombinedLinkValue(data, 2)).toBe(1);
});

test('Calculates value of all links that have Myriel as the source', () => {
    expect(getSourceValue(data, 0)).toBe(8);
});

test('Calculates value of all links that have Myriel as the target', () => {
    expect(getTargetValue(data, 0)).toBe(1);
});

test('Applies altColour to node if either source or target value is 0, or mediumColour if the node target and source values are both different to 0', () => {
    expect(getNodeColour(data, 3)).toBe("#bc6017");
    expect(getNodeColour(data, 1)).toBe("#285078");
});
