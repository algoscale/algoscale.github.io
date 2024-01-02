const model = {
  code: {
    head: `<head>
        <link rel="stylesheet" crossorigin href="https://cdn.insighto.ai/assets/index.js" />
        <link rel="stylesheet" crossorigin href="https://cdn.insighto.ai/assets/style.css" />
    </head>`,
    body: {
      inADiv: `<body>
      <div id="chat-widget-root">
        <div
          data-widget-id="018c8b8e-4bcc-7083-8494-8db604ff7041"
          id="chat-widget"
        ></div>
      </div>
  </body>`,
      widget: `<body>
      <div id="chat-widget-root">
        <div
          data-floating="true"
          data-widget-id="018c8b8e-4bcc-7083-8494-8db604ff7041"
          id="chat-widget"
        ></div>
      </div>
  </body>`,
    },
  },
};
const controller = {
  getChatWidget: function () {
    return { head: model.code.head, body: model.code.body.widget };
  },
  getHTMLWidget: function () {
    return { head: model.code.head, body: model.code.body.inADiv };
  },
};

const views = {
  init: function () {
    this.initCode(window.location.pathname);
  },
  initCode: function (type) {
    const {head, body} = type === "/chat-widget.html" ? controller.getChatWidget() : controller.getHTMLWidget();
    document.getElementById("head").innerText = head;
    document.getElementById("body").innerText = body;
  },
};
views.init();
