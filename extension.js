const St = imports.gi.St;
const Main = imports.ui.main;

let overlay;
let aggregateMenu;
let sliderActor;
let connectId;

function _update() {
    overlay.opacity = 256 * (1 - sliderActor.value);
}

function enable() {
    aggregateMenu = Main.panel.statusArea.aggregateMenu;
    sliderActor = aggregateMenu._brightness._slider;
    connectId = sliderActor.connect('value-changed', _update)

    overlay = new St.Label({
        style_class: 'overlay',
    });
    Main.uiGroup.add_actor(overlay);

    let monitor = Main.layoutManager.primaryMonitor;
    overlay.set_width(monitor.width);
    overlay.set_height(monitor.height);

    //overlay.opacity = 256 * (sliderActor.value);
    _update();
}

function disable() {
    if (connectId)
        sliderActor.disconnect(connectId)
    Main.uiGroup.remove_actor(overlay);
    overlay = null;
}
