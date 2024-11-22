const { reformatData } = require('./reformatData');

const data = {
    "nodes": [
      {
        "name": "Myriel",
        "group": 1
      }
    ],
    "links": [
      {
        "source": 1,
        "target": 0,
        "value": 1
      }   
    ]
}

const expectedOutput = {
    "link1": {
      "end1": {
        "color": "#285078",
      },
      "end2": {
        "arrow": true,
        "color": "#d3e3f3",
      },
      "flow": true,
      "id1": "node2",
      "id2": "node1",
      "velocity": {
        "velocity": 10,
      },
      "width": 2,
    },
    "node1": {
      "color": "#bc6017",
      "data": {
        "connections": 1,
        "group": 1,
        "name": "Myriel",
        "source": 0,
        "target": 1,
        "total": 1,
      },
      "label": [
        {
          "backgroundColor": "#bc6017",
          "border": {
            "radius": 5,
          },
          "color": "#d3e3f3",
          "text": "Myriel",
        }
      ],
      "size": 1,
      "value": 0,
    }        
};


test('reformatData returns correct object', () => {
    expect(reformatData(data, 'source')).toEqual(expectedOutput);
});
