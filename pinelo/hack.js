var palette, surface, nav;

$(function() {
    
    var $w = $(window),
        w  = $w.width(),
        h  = $w.height(),
        $d = $(document),
        loaded = false;

    $("#background-canvas")
        .height(h)
        .width(w);
    
    palette = new Palette($("#background-canvas"));
    palette.foreground = "#FFFFFF";
    palette.onBrushLoad = function(brushName) {
        if (brushName == "arc") {
            var brush = this.brushset[brushName];
            brush.settings.thickness.value(1);
            brush.settings.dist.value(40);
            palette.setBrush(brush);
            loaded = true;
        }
    }
    palette.loadAvailableBrushes();
    surface = palette.surface();
    
    $d.mousemove(function(e) {
        if (loaded) {
            palette.brush.doStroke(surface, e.pageX, e.pageY - $d.scrollTop());
        }
    });
});
