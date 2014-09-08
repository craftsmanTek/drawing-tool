var inherit                 = require('scripts/inherit');
var Tool                    = require('scripts/tool');
var lineCustomControlPoints = require('scripts/fabric-extensions/line-custom-control-points');

var BASIC_SELECTION_PROPERTIES = {
  cornerSize: fabric.isTouchSupported ? 22 : 12,
  transparentCorners: false
};

/**
 * Defacto default tool for DrawingTool.
 * When activated it puts the canvas into a selectable state so objects
 * can be moved and manipulated.
 */
function SelectionTool(name, drawTool) {
  Tool.call(this, name, drawTool);

  this.canvas.on("object:selected", function (opt) {
    opt.target.set(BASIC_SELECTION_PROPERTIES);
    this.canvas.renderAll();
    this._setLastObject(opt.target);
  }.bind(this));

  this._lastObject = null;
  this.canvas.on("object:added", function (opt) {
    this._setLastObject(opt.target);
  }.bind(this));
  this.canvas.on("object:removed", function (opt) {
    this._checkLastObject(opt.target);
  }.bind(this));

  // Set visual options of custom line control points.
  lineCustomControlPoints.controlPointColor = '#bcd2ff';
  lineCustomControlPoints.cornerSize = BASIC_SELECTION_PROPERTIES.cornerSize;
}

inherit(SelectionTool, Tool);

SelectionTool.BASIC_SELECTION_PROPERTIES = BASIC_SELECTION_PROPERTIES;

SelectionTool.prototype.activate = function () {
  SelectionTool.super.activate.call(this);
  this.setSelectable(true);
  this.selectLastObject();
};

SelectionTool.prototype.deactivate = function () {
  SelectionTool.super.deactivate.call(this);
  this.setSelectable(false);
};

SelectionTool.prototype.setSelectable = function (selectable) {
  this.canvas.selection = selectable;
  var items = this.canvas.getObjects();
  for (var i = items.length - 1; i >= 0; i--) {
    items[i].selectable = selectable;
  }
};

SelectionTool.prototype.selectLastObject = function () {
  if (this._lastObject) {
    this.canvas.setActiveObject(this._lastObject);
  }
};

SelectionTool.prototype._setLastObject = function (obj) {
  if (obj._dt_sourceObj) {
    // Ignore custom control points.
    return;
  }
  this._lastObject = obj;
};

SelectionTool.prototype._checkLastObject = function (removedObj) {
  if (removedObj === this._lastObject) {
    var remainingObjects = this.canvas.getObjects();
    this._lastObject = remainingObjects[remainingObjects.length - 1];
  }
};

module.exports = SelectionTool;
