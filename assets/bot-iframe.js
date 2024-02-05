const model = {
  widgetTheme: null,
};
const view = {
  init: function () {
    const widgetId = this.getWidgetId();
    const wsHost = this.getWsHost();
    this.setWsHost(wsHost);
    this.setWidgetIdForWidget(widgetId);
    this.setThemeForWidget();
  },
  setWsHost: function (wsHost) {
    const widget = document.getElementById("chat-widget");
    if (wsHost) {
      widget.dataset.wsHost = wsHost;
    }
  },
  getWidgetId: function () {
    return this.getParams("widgetId");
  },
  getWsHost: function () {
    return this.getParams("wsHost");
  },
  setWidgetIdForWidget: function (widgetId) {
    const widget = document.getElementById("chat-widget");
    widget.dataset.widgetId = widgetId;
  },
  setThemeForWidget: function () {
    const widget = document.getElementById("chat-widget");
    const theme = this.getTheme();
    widget.dataset.theme = theme;
  },
  getTheme() {
    const theme = this.getParams("theme");
    return theme;
  },
  getParams(key) {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  },
};

view.init();
