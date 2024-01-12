const view = {
  init: function () {
    const widgetId = this.getWidgetId();
    this.setWidgetIdForWidget(widgetId);
    this.setThemeForWidget();
  },
  getWidgetId: function () {
    return this.getParams("widgetId");
  },
  setWidgetIdForWidget: function (widgetId) {
    const widget = document.getElementById("chat-widget");
    widget.dataset.widgetId = widgetId;
  },
  setThemeForWidget: function () {
    const widget = document.getElementById("chat-widget");
    const theme = this.getTheme() || "";
    console.log(theme);
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
