const model = {
  widgetId: null,
};

const controller = {
  initWidgetId(widgetId) {
    model.widgetId = widgetId;
  },
  
  getCurrentWidgetId() {
    return model.widgetId;
  },
};

const view = {
  init() {
    const params = new URLSearchParams(window.location.search);
    controller.initWidgetId(
      params.get("widgetId") || this.getCurrentChatWidget().dataset.widgetId
    );
    const widgetId = controller.getCurrentWidgetId();
    view.getCurrentChatWidget().dataset.widgetId = widgetId;
  },
  getCurrentChatWidget() {
    return document.getElementById("chat-widget");
  },
  getWidgetForm() {
    return document.getElementById("widgetForm");
  },
  
};

view.init();
