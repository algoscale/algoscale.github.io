const model = {
  widgetId: null,
};

const controller = {
  initWidgetId(widgetId) {
    model.widgetId = widgetId;
  },
  widgetIdFormSubmitHandler(e) {
    e.preventDefault();
    const form = new FormData(view.getWidgetForm());
    const body = {};
    for (const [key, value] of form.entries()) body[key] = value;
    if (body.widgetId && body.widgetId.length < 8) {
      view.updateErrorMessageForWidgetId("This can't be a correct widget id");
      return;
    }
    model.widgetId = body.widgetId;
    view.viewWidget(model.widgetId);
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
    view.getDisplayCurrentWidgetId().innerText = widgetId;
    view.getWidgetForm().onsubmit = controller.widgetIdFormSubmitHandler;
  },
  getCurrentChatWidget() {
    return document.getElementById("chat-widget");
  },
  getWidgetForm() {
    return document.getElementById("widgetForm");
  },
  viewWidget(widgetId) {
    window.location.href = `/widget.html?widgetId=${widgetId}`;
  },
  getDisplayCurrentWidgetId() {
    return document.getElementById("widgetIdDisplay");
  },
  updateErrorMessageForWidgetId(message) {
    document.getElementById("widgetErrorMessage").innerText = message;
    setTimeout(() => {
      document.getElementById("widgetErrorMessage").innerText = "";
    }, 1000);
  },
};

view.init();
