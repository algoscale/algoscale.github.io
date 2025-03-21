class ChatWidget {
  constructor(props) {
    this.props = props;
    this._isOpen = false;
  }
  init() {
    const chatWidgetRagify = document.createElement("div");
    chatWidgetRagify.id = "chatWidgetRagify";
    chatWidgetRagify.className = "chat__widget";
    const chatWidgetIframe = this.createChatWidgetIframe();
    chatWidgetRagify.appendChild(chatWidgetIframe);
    document.body.appendChild(chatWidgetRagify);
  }
  createChatWidgetIframe() {
    const chatWidgetIframeRagify = document.createElement("iframe");
    chatWidgetIframeRagify.id = "chatWidgetIframeRagify";
    chatWidgetIframeRagify.frameBorder = 0;
    const src = this.createSrc();
    chatWidgetIframeRagify.src = src;
    chatWidgetIframeRagify.allow = "microphone";
    chatWidgetIframeRagify.style.borderRadius = "16px";
    return chatWidgetIframeRagify;
  }
  createSrc() {
    const searchParams = Object.entries(this.props).reduce(
      (params, [key, value]) => params + `${key}=${value}&`,
      ""
    );
    const hostname = this.props?.appHostname || `https://cdn.insighto.ai`;
    return `${hostname}/chat-widget-v2/index.html?${searchParams}`;
  }
  static getEventHandler(e) {
    const outerDiv = document.getElementById("chatWidgetRagify");
    const events = {
      toggleVisiblityOfWidget: () => {
        outerDiv.classList.toggle("chat__widgetOpen", e?.data?.data);
        e.source.postMessage(e.data, "*");
      },
    };
    const triggerEvent = events[e?.data?.event];
    return triggerEvent;
  }
  toggle() {
    const response = {
      data: !this._isOpen,
      event: "toggleVisiblityOfWidget",
    };
    document
      .getElementById("chatWidgetIframeRagify")
      .contentWindow.postMessage(response, "*");
    const outerDiv = document.getElementById("chatWidgetRagify");

    outerDiv.classList.toggle("chat__widgetOpen", response.data);
    e.source.postMessage(response, "*");
  }
}

window.onmessage = (e) => {
  if (!e?.data?.event) return;
  const triggerEvent = ChatWidget.getEventHandler(e);
  triggerEvent();
};
