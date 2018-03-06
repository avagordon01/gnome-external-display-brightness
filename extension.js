const St = imports.gi.St;
const Main = imports.ui.main;

let overlays;
let aggregateMenu;
let sliderActor;
let connectId;

function _update() {
    overlays.forEach(function(overlay) {
        //FIXME for some reason sliderActor.value isn't set on refresh
        overlay.opacity = 256 * (1 - sliderActor.value);
    });
}

function enable() {
    aggregateMenu = Main.panel.statusArea.aggregateMenu;
    sliderActor = aggregateMenu._brightness._slider;
    connectId = sliderActor.connect('value-changed', _update)

    overlays = [];
    Main.layoutManager.monitors.forEach(function(monitor) {
        //if the embedded display is not index 0, change this
        if (monitor.index != 0) {
            let overlay = new St.Label({
                style_class: 'overlay',
            });
            Main.uiGroup.add_actor(overlay);

            overlay.set_width(monitor.width);
            overlay.set_height(monitor.height);
            overlay.set_x(monitor.x);
            overlay.set_y(monitor.y);
            overlay.opacity = 0;

            overlays.push(overlay)
        }
    });

    _update();
}

function disable() {
    if (connectId)
        sliderActor.disconnect(connectId)
    overlays.forEach(function(overlay) {
        Main.uiGroup.remove_actor(overlay);
        overlay = null;
    });
    overlays = [];
}
