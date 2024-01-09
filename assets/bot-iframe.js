const view = {
    init: function () {
        const widgetId = this.getWidgetId();
        this.setWidgetIdForWidget(widgetId);
    },
    getWidgetId: function () {
        const params = new URLSearchParams(location.search);
        return params.get("widgetId");
    },
    setWidgetIdForWidget: function (widgetId) {
        const widget = document.getElementById("chat-widget");
        widget.dataset.widgetId = widgetId;
    }
}

view.init();