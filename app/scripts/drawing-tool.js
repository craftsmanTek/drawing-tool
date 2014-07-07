var Tool          = require('scripts/tool');
var ShapeTool     = require('scripts/shape-tool');
var SelectionTool = require('scripts/select-tool');
var LineTool      = require('scripts/line-tool');
var RectangleTool = require('scripts/rect-tool');
var EllipseTool   = require('scripts/ellipse-tool');
var SquareTool    = require('scripts/square-tool');
var CircleTool    = require('scripts/circle-tool');
var FreeDrawTool  = require('scripts/free-draw');
var Util          = require('scripts/util');
var rescale2resize = require('scripts/rescale-2-resize');

// Constructor function.
function DrawingTool (selector) {
  this.canvas = new fabric.Canvas(generateHTML(selector));
  this.canvas.perPixelTargetFind = true;

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.selectable = false;

  // Custom Variables for Shape resizing
  fabric.Object.prototype.minWidth = 15;
  fabric.Object.prototype.minHeight = 15;

  fabric.Object.prototype.perPixelTargetFind = true;
  this.setStrokeWidth(10);
  this.setStrokeColor("rgba(100,200,200,.75)");
  this.setFill("");

  fabric.Line.prototype.hasControls = false;
  fabric.Line.prototype.hasBorders = false;

  // //adding sample shapes
  // var rect3 = new fabric.Rect({
  //   width: 200, height: 100, left: 500, top: 150, angle: 45,
  //   fill: 'rgba(0,0,200,0.5)'
  // });
  // this.canvas.add(rect3);

  this.tools = {};

  // Tools
  var selectionTool = new SelectionTool("Selection Tool", "select", this);
  var lineTool = new LineTool("Line Tool", "line", this);
  var rectangleTool = new RectangleTool("Rectangle Tool", "rect", this);
  var ellipseTool = new EllipseTool("Ellipse Tool", "ellipse", this);
  var squareTool = new SquareTool("Square Tool", "square", this);
  var circleTool = new CircleTool("Circle Tool", "circle", this);
  var freeDrawTool = new FreeDrawTool("Free Draw Tool", "free", this);

  var self = this;
  $('.btn').click(function(){
    var id = $(this).find("input").val();
    self._toolButtonClicked(id);
  });

  // Apply a fix that changes native FabricJS rescaling bahvior into resizing.
  rescale2resize(this.canvas);

  this.chooseTool("select");

  // to help with detecting "deselect" events
  // see https://groups.google.com/d/topic/fabricjs/pcFJOroSkI4/discussion
  this.canvas._selectedItem = undefined;
}

DrawingTool.prototype.chooseTool = function(toolSelector){
  $("#" + toolSelector).click();
};

// Changing the current tool out of this current tool
// to the default tool aka 'select' tool
// TODO: make this better and less bad... add default as drawingTool property
DrawingTool.prototype.changeOutOfTool = function(oldToolSelector){
  this.chooseTool('select');
};


// debugging method to print out all the items on the canvas
DrawingTool.prototype.check = function() {
  var shapes = this.canvas.getObjects();
  for (var i = 0; i < shapes.length; i++) {
    console.log(shapes[i]);
  }
};

DrawingTool.prototype.setStrokeColor = function(color) {
  fabric.Object.prototype.stroke = color;
  this.canvas.freeDrawingBrush.color = color;
}

DrawingTool.prototype.setStrokeWidth = function(width) {
  fabric.Object.prototype.strokeWidth = width;
  this.canvas.freeDrawingBrush.width = width;
}

DrawingTool.prototype.setFill = function(color) {
  fabric.Object.prototype.fill = color;
}

DrawingTool.prototype._toolButtonClicked = function(toolSelector) {
  if (this.currentTool !== undefined && this.currentTool.selector === toolSelector) {
    console.log(this.currentTool.name + " is already the current tool");
    // Some tools may implement .activateAgain() method and enable some special behavior.
    this.currentTool.activateAgain();
    return;
  }
  var newTool = this.tools[toolSelector];
  if (newTool === undefined){
    console.warn("Warning! Could not find tool with selector \"" + toolSelector +
      "\"\nExiting tool chooser.");
    return;
  }
  if (this.currentTool !== undefined) {
    this.currentTool.setActive(false);
  }
  newTool.setActive(true);
  this.currentTool = newTool;
  this.canvas.renderAll(false);
};

function generateHTML(selector) {
  var html = '<div id="tools" class="btn-group-vertical" data-toggle="buttons">\
    <label class="btn btn-primary" id="select">\
      <input type="radio" name="options" value="select"> S\
    </label>\
    <label class="btn btn-primary" id="line">\
      <input type="radio" name="options" value="line"> L\
    </label>\
    <label class="btn btn-primary" id="rect">\
      <input type="radio" name="options" value="rect"> R\
    </label>\
    <label class="btn btn-primary" id="square">\
      <input type="radio" name="options" value="square"> Sq\
    </label>\
    <label class="btn btn-primary" id="ellipse">\
      <input type="radio" name="options" value="ellipse"> E\
    </label>\
    <label class="btn btn-primary" id="circle">\
      <input type="radio" name="options" value="circle"> C\
    </label>\
    <label class="btn btn-primary" id="free">\
      <input type="radio" name="options" value="free"> F\
    </label>\
  </div>\
  <canvas id="draw" width="700px" height="500px"\
  style="border: 3px solid;"></canvas>';
  $("#" + selector).append(html);
  return "draw";
}

module.exports = DrawingTool;