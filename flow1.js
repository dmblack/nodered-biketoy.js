[
  {
      "id": "41c67f55.eec69",
      "type": "tab",
      "label": "Flow 1"
  },
  {
      "id": "4fe20382.0c7c44",
      "type": "rpi-sensehat in",
      "z": "41c67f55.eec69",
      "name": "Environment Input",
      "motion": false,
      "env": true,
      "stick": false,
      "x": 130,
      "y": 40,
      "wires": [
          [
              "fb4fbb86.c3b0b"
          ]
      ]
  },
  {
      "id": "6b516d2f.7b68ac",
      "type": "function",
      "z": "41c67f55.eec69",
      "name": "parse",
      "func": "var showDisplay = global.get('showDisplay');\nvar displayBike = global.get('displayBike');\nvar displayTemp = global.get('displayTemp');\n\nif (typeof msg.payload.key !== 'undefined') {\n    if (msg.payload.key == 'ENTER' && msg.payload.state == 1) {\n        if (!showDisplay) {\n            global.set('showDisplay', true);\n            global.set('displayBike', true);\n            global.set('displayTemp', false);\n        } else if (displayBike) {\n            global.set('displayBike', false)\n            global.set('displayTemp', true)\n        } else if (displayTemp) {\n            global.set('showDisplay', false);\n            global.set('displayBike', false);\n            global.set('displayTemp', false);\n        }\n    }\n}\n\nif (displayBike) {\n    if (showDisplay) {\n        var message = '> ';\n        \n        node.send({ payload: 'R270'});\n        node.send({ payload: 'D1' });\n        node.send({ payload: message,\n                    speed: 3,\n                    color: 'orange'\n        });\n    }\n}\n\nif (displayTemp) {\n    if (showDisplay && typeof msg.payload.temperature !== 'undefined') {\n        var temp = parseInt(msg.payload.temperature) - 10;\n        var humidity = parseInt(msg.payload.humidity);\n        var pressure = parseInt(msg.payload.pressure);\n        \n        var message = 'T:' + temp + 'c H:' + humidity + '% P:' + pressure;\n        \n        node.send({ payload: 'R270'});\n        node.send({ payload: 'D0' });\n        node.send({ payload: message,\n                    speed: 1,\n                    color: 'orange'\n        });\n    }\n}\n",
      "outputs": 1,
      "noerr": 0,
      "x": 389,
      "y": 186,
      "wires": [
          [
              "c0de0fe5.5cf68"
          ]
      ]
  },
  {
      "id": "c0de0fe5.5cf68",
      "type": "rpi-sensehat out",
      "z": "41c67f55.eec69",
      "name": "Display",
      "x": 580,
      "y": 120,
      "wires": []
  },
  {
      "id": "fb4fbb86.c3b0b",
      "type": "delay",
      "z": "41c67f55.eec69",
      "name": "",
      "pauseType": "rate",
      "timeout": "5",
      "timeoutUnits": "seconds",
      "rate": "1",
      "nbRateUnits": "20",
      "rateUnits": "second",
      "randomFirst": "1",
      "randomLast": "5",
      "randomUnits": "seconds",
      "drop": true,
      "x": 160,
      "y": 120,
      "wires": [
          [
              "6b516d2f.7b68ac"
          ]
      ]
  },
  {
      "id": "40b9c7fd.e6e2a",
      "type": "rpi-sensehat in",
      "z": "41c67f55.eec69",
      "name": "Joystick Toggle",
      "motion": false,
      "env": false,
      "stick": true,
      "x": 160,
      "y": 280,
      "wires": [
          [
              "6b516d2f.7b68ac"
          ]
      ]
  },
  {
      "id": "371078d2.a2962",
      "type": "function",
      "z": "41c67f55.eec69",
      "name": "Global Context",
      "func": "global.set('showDisplay', true);\nglobal.set('displayBike', true);\nglobal.set('displayTemp', false);",
      "outputs": 1,
      "noerr": 0,
      "x": 360,
      "y": 40,
      "wires": [
          []
      ]
  },
  {
      "id": "f5d1dd8d.b929f8",
      "type": "inject",
      "z": "41c67f55.eec69",
      "name": "arrowInterval",
      "topic": "",
      "payload": "",
      "payloadType": "date",
      "repeat": "1",
      "crontab": "",
      "once": true,
      "x": 266,
      "y": 402,
      "wires": [
          [
              "6b516d2f.7b68ac"
          ]
      ]
  }
]