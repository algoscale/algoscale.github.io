const view = {
  init: function () {
    const widgetId = this.getWidgetId();
    const wsHost = this.getWsHost();
    const deployType = this.getDeployType();
    this.setDeployType(deployType);
    this.setWidgetIdForWidget(widgetId);
    this.setWsHost(wsHost);
  },
  getWidgetId: function () {
    return this.getParams("widgetId");
  },
  getDeployType: function () {
    return this.getParams("deployType");
  },
  setDeployType: function (deployType) {
    const widget = document.getElementById("webCallWidget");
    if (deployType) widget.dataset.deployType = deployType;
  },
  setWsHost: function (wsHost) {
    const widget = document.getElementById("webCallWidget");
    if (wsHost) widget.dataset.wsHost = wsHost;
  },
  getWsHost: function () {
    return this.getParams("wsHost");
  },
  setWidgetIdForWidget: function (widgetId) {
    const widget = document.getElementById("webCallWidget");
    if (widgetId) widget.dataset.widgetId = widgetId;
  },
  getParams(key) {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  },
};

view.init();
