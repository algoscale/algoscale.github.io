const view = {
  init: function () {
    const widgetId = this.getWidgetId();
    this.setWidgetIdForWidget(widgetId);
  },
  getWidgetId: function () {
    return this.getParams("widgetId");
  },
  setWidgetIdForWidget: function (widgetId) {
    const widget = document.getElementById("callWidgetInsighto");
    widget.dataset.widgetId = widgetId;
  },
  getParams(key) {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  },
};

view.init();
