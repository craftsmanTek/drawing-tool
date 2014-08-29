var StrokeButton    = require('scripts/ui/stroke-button');
var FillButton      = require('scripts/ui/fill-button');
var ColorButton     = require('scripts/ui/color-button');
var LineWidthButton = require('scripts/ui/line-width-button');

var COLORS = [
  '',
  '#efefef',
  '#e66665',
  '#75b792',
  '#076bb6',
  '#ffd605',
  '#f47d43',
  '#ae70af',
  '#a9b2b1',
  '#333333'
];

var STROKE_WIDTHS = [
  1,
  2,
  4,
  8,
  12,
  16,
  20
];

var ui = {
  /***
   * Palettes
   ***/
  palettes: [
    {
      name: 'main',
      permanent: true,
      vertical: true
    },
    {
      name: 'lines',
      anchor: 'linesPalette'
    },
    {
      name: 'shapes',
      anchor: 'shapesPalette'
    },
    {
      name: 'strokeColors',
      anchor: 'strokeColorPalette'
    },
    {
      name: 'fillColors',
      anchor: 'fillColorPalette'
    },
    {
      name: 'strokeWidths',
      anchor: 'strokeWidthPalette'
    }
  ],
  buttons: [
    /***
     * Main tools
     ***/
    {
      label: 's',
      activatesTool: 'select',
      palette: 'main'
    },
    {
      name: 'linesPalette',
      classes: 'dt-expand',
      reflectsTools: ['line', 'arrow', 'doubleArrow'],
      palette: 'main',
      onInit: function () {
        this.setLabel(this.ui.getPaletteActiveButton('lines').getLabel());
      },
      onClick: function () {
        this.ui.togglePalette('lines');
        this.ui.getPaletteActiveButton('lines').click();
      }
    },
    {
      name: 'shapesPalette',
      classes: 'dt-expand',
      reflectsTools: ['rect', 'ellipse', 'square', 'circle'],
      palette: 'main',
      onInit: function () {
        this.setLabel(this.ui.getPaletteActiveButton('shapes').getLabel());
      },
      onClick: function () {
        this.ui.getPaletteActiveButton('shapes').click();
        this.ui.togglePalette('shapes');
      }
    },
    {
      name: 'free',
      label: 'F',
      activatesTool: 'free',
      palette: 'main'
    },
    {
      name: 'text',
      label: 'T',
      activatesTool: 'text',
      palette: 'main'
    },
    {
      name: 'strokeColorPalette',
      buttonClass: StrokeButton,
      classes: 'dt-expand',
      palette: 'main',
      onInit: function () {
        this.setColor(this.dt.state.stroke);
      },
      onStateChange: function (state) {
        this.setColor(state.stroke);
      },
      onClick: function () {
        this.ui.togglePalette('strokeColors');
      }
    },
    {
      name: 'fillColorPalette',
      buttonClass: FillButton,
      classes: 'dt-expand',
      palette: 'main',
      onInit: function () {
        this.setColor(this.dt.state.fill);
      },
      onStateChange: function (state) {
        this.setColor(state.fill);
      },
      onClick: function () {
        this.ui.togglePalette('fillColors');
      }
    },
    {
      name: 'strokeWidthPalette',
      label: 'w',
      classes: 'dt-expand',
      palette: 'main',
      onClick: function () {
        this.ui.togglePalette('strokeWidths');
      }
    },
    {
      name: 'undo',
      label: 'u',
      classes: 'dt-undo-redo',
      palette: 'main',
      onClick: function () {
        this.dt.undo();
      }
    },
    {
      name: 'redo',
      label: 'r',
      classes: 'dt-undo-redo',
      palette: 'main',
      onClick: function () {
        this.dt.redo();
      }
    },
    {
      name: 'sendToFront',
      label: 'l',
      classes: 'dt-send-to',
      palette: 'main',
      onInit: lockWhenNothingIsSelected,
      onClick: function () {
        this.dt.sendSelectionToFront();
      }
    },
    {
      name: 'sendToBack',
      label: 'm',
      classes: 'dt-send-to',
      palette: 'main',
      onInit: lockWhenNothingIsSelected,
      onClick: function () {
        this.dt.sendSelectionToBack();
      }
    },
    {
      name: 'clone',
      label: 'c',
      activatesTool: 'clone',
      palette: 'main',
      onInit: lockWhenNothingIsSelected
    },
    {
      name: 'trash',
      label: 'd',
      activatesTool: 'trash',
      palette: 'main',
      onInit: lockWhenNothingIsSelected
    },
    /***
     * Line tools
     ***/
    {
      name: 'line',
      label: 'L',
      activatesTool: 'line',
      palette: 'lines'
    },
    {
      name: 'arrow',
      label: 'A',
      activatesTool: 'arrow',
      palette: 'lines'
    },
    {
      name: 'doubleArrow',
      label: 'D',
      activatesTool: 'doubleArrow',
      palette: 'lines'
    },
    /***
     * Shape tools
     ***/
    {
      name: 'rect',
      label: 'R',
      activatesTool: 'rect',
      palette: 'shapes'
    },
    {
      name: 'ellipse',
      label: 'E',
      activatesTool: 'ellipse',
      palette: 'shapes'
    },
    {
      name: 'square',
      label: 'S',
      activatesTool: 'square',
      palette: 'shapes'
    },
    {
      name: 'circle',
      label: 'C',
      activatesTool: 'circle',
      palette: 'shapes'
    }
    /***
     * Stroke colors and fill colors are added in a loop below
     ***/
  ]
};

COLORS.forEach(function (color) {
  ui.buttons.push({
    buttonClass: ColorButton,
    color: color,
    type: 'stroke',
    palette: 'strokeColors'
  });
  ui.buttons.push({
    buttonClass: ColorButton,
    color: color,
    type: 'fill',
    palette: 'fillColors'
  });
});

STROKE_WIDTHS.forEach(function (width) {
  ui.buttons.push({
    buttonClass: LineWidthButton,
    width: width,
    palette: 'strokeWidths'
  });
});

// Helper functions that may be used by buttons.
// Note that all listeners are called in the context
// of the button isntance (`this` value).
function lockWhenNothingIsSelected() {
  this.setLocked(true);
  this.dt.canvas.on("object:selected", function () {
    this.setLocked(false);
  }.bind(this));
  this.dt.canvas.on("selection:cleared", function () {
    this.setLocked(true);
  }.bind(this));
}

module.exports = ui;
