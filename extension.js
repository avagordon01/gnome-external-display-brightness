const St = imports.gi.St;
const Main = imports.ui.main;

let overlays;
let aggregateMenu;
let sliderActor;
let connectId;

function _update() {
    overlays.forEach(function(overlay) {
        overlay.opacity = 256 * (1 - sliderActor.value);
    });
}

function enable() {
    aggregateMenu = Main.panel.statusArea.aggregateMenu;
    sliderActor = aggregateMenu._brightness._slider;
    connectId = sliderActor.connect('value-changed', _update)

    overlays = [];
    Main.layoutManager.monitors.forEach(function(monitor) {
        let overlay = new St.Label({
            style_class: 'overlay',
        });
        Main.uiGroup.add_actor(overlay);

        overlay.set_width(monitor.width);
        overlay.set_height(monitor.height);
        overlay.set_x(monitor.x);
        overlay.set_y(monitor.y);

        overlays.push(overlay)
    });

    overlay.opacity = 256 * (sliderActor.value);
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
