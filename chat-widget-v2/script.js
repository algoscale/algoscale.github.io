class ChatWidget {
  constructor(props) {
    this.props = props;
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
    chatWidgetIframeRagify.frameBorder = 0;
    const src = this.createSrc();
    chatWidgetIframeRagify.src = src;
    chatWidgetIframeRagify.style.borderRadius = "16px";
    return chatWidgetIframeRagify;
  }
  createSrc() {
    const searchParams = Object.entries(this.props).reduce(
      (params, [key, value]) => params + `${key}=${value}&`,
      ""
    );
    const hostname =
      this.props?.appHostname || `https://cdn.insighto.ai/chat-widget-v2`;
    return `${hostname}/index.html?${searchParams}`;
  }
}

const createPx = (pixel) => `${pixel}px`;

window.onmessage = (e) => {
  if (!e?.data?.event) return;
  const outerDiv = document.getElementById("chatWidgetRagify");
  const events = {
    toggleVisiblityOfWidget: () => {
      const width = e.data?.data ? 415 : 80;
      outerDiv.style.maxWidth = createPx(width);
      const height = e.data?.data ? 600 : 80;
      outerDiv.style.height = createPx(height);
      e.source.postMessage(e.data, "*");
    },
  };
  const triggerEvent = events[e.data.event];
  triggerEvent();
};
