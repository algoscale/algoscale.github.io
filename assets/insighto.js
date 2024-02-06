const api = {
  async fetchTheme() {
    try {
      const data = await fetch(
        `https://ragify-be.azurewebsites.net/api/v1/widget/${insighto_ai_widget_id}/parameters`
      ).then((response) => response.json());
      return data;
    } catch (error) {
      return null;
    }
  },
};
const model = {
  iframeOpen: false,
  host: "https://cdn.insighto.ai",
  botIcon: {
    bubbleBotIcon: "https://cdn.insighto.ai/assets/bot.svg",
    bubbleColor: "#3b81f6",
    bubbleText: "Hi! I am Insighto.ai, how can I help you? ",
  },
};
const helper = {
  getHostName(url) {
    return model.host + url;
  },
};
const controller = {
  getBotIconTheme() {
    return model.botIcon;
  },
  async setBotThemeColorAndIcon() {
    const data = await api.fetchTheme();
    if (data) {
      model.botIcon.bubbleBotIcon =
        data?.data.bubble_bot_icon || model.botIcon.bubbleBotIcon;
      model.botIcon.bubbleColor =
        data?.data.bubble_color || model.botIcon.bubbleColor;
      model.botIcon.bubbleText =
        data?.data.bubble_text || model.botIcon.bubbleText;
    }
  },
  toggleIframe: async function () {
    if (model.iframeOpen) {
      views.removeWidget();
      views.changeIconOfOpenClose(model.botIcon.bubbleBotIcon);
      views.hideCloseWidgetBtn();
    } else {
      if (!document.getElementById("chatWidget")) {
        views.insertIframeWidget();
      }
      if (document.getElementById("greetMe")) {
        views.initateAnimationForGreetRemove(200);
        views.initiateRemove(500);
      }
      views.changeIconOfOpenClose(helper.getHostName("/assets/down.svg"));
      views.displayIframe();
    }
    model.iframeOpen = !model.iframeOpen;
  },
};

const views = {
  init: async function () {
    await controller.setBotThemeColorAndIcon();
    this.insertOpenCloseBtn();
    this.insertGreet();
    this.inseretCloseWidgetBtn();
    if (sessionStorage.getItem("greeted")) {
      this.removeGreetMessage();
      return;
    }
    this.showGreetForOneSession();
  },
  showGreetForOneSession() {
    sessionStorage.setItem("greeted", 1);
    this.initateAnimationForGreetRemove();
    this.initiateRemove();
  },
  initateAnimationForGreetRemove(time = 9700) {
    setTimeout(() => {
      this.animateGreetRemove();
    }, time);
  },
  initiateRemove(time = 10000) {
    setTimeout(() => {
      this.removeGreetMessage();
    }, time);
  },
  createIframeWidget: function (src) {
    const iframe = document.createElement("iframe");
    iframe.id = "chatWidget";
    iframe.src = src;
    iframe.allow = "microphone";
    iframe.style.border = "none";
    iframe.style.display = "none";
    return iframe;
  },
  insertGreet: function () {
    const greet = this.createGreet();
    document.body.append(greet);
  },
  createGreet: function () {
    function createCloseIcon() {
      const img = document.createElement("img");
      img.onclick = function () {
        views.initateAnimationForGreetRemove(200);
        views.initiateRemove(500);
      };
      img.src = helper.getHostName("/assets/close.svg");
      img.alt = "closeIcon";
      img.width = 20;
      img.height = 20;
      return img;
    }
    function createMessage() {
      const botIcon = controller.getBotIconTheme();
      const messageDiv = document.createElement("div");
      messageDiv.className = "greetMe__bannerMsg";
      const para = document.createElement("p");
      para.innerText = botIcon.bubbleText;
      messageDiv.append(para);
      return messageDiv;
    }
    const greetDiv = document.createElement("div");
    greetDiv.id = "greetMe";
    greetDiv.className = "greetMe__banner";
    const img = createCloseIcon();
    const messageDiv = createMessage();
    greetDiv.append(img);
    greetDiv.append(messageDiv);
    return greetDiv;
  },
  removeGreetMessage: function () {
    if (document.getElementById("greetMe")) {
      document.getElementById("greetMe").style.display = "none";
    }
  },
  animateGreetRemove: function () {
    if (document.getElementById("greetMe")) {
      document
        .getElementById("greetMe")
        .classList.toggle("greetMe__bannerRemove");
    }
  },
  removeWidget: function () {
    document.getElementById("chatWidget").style.display = "none";
    this.hideCloseWidgetBtn();
  },
  displayIframe: function () {
    this.decideWidthOfIframe(document.getElementById("chatWidget"));
    document.getElementById("chatWidget").style.display = "block";
  },
  decideWidthOfIframe: function (chatWidget) {
    const width = document.body.clientWidth;
    const isSmallScreen = width < 720;
    chatWidget.className = isSmallScreen
      ? "chat__WidgetSmall"
      : "chat__WidgetBig";
    if (isSmallScreen) this.showCloseWidgetBtn();
  },
  createBtn: function (src) {
    const botIcon = controller.getBotIconTheme();
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.style.backgroundColor = botIcon.bubbleColor;
    img.id = "floatingIconBottom";
    div.id = "openCloseWidget";
    img.width = 34;
    img.height = 34;
    img.src = src;
    div.append(img);
    div.onclick = controller.toggleIframe;
    return div;
  },
  insertIframeWidget: function () {
    const src = helper.getHostName(
      `/bot-iframe.html?widgetId=${insighto_ai_widget_id}`
    );
    const widget = this.createIframeWidget(src);
    document.body.append(widget);
  },
  insertOpenCloseBtn: function () {
    const botIcon = controller.getBotIconTheme();
    const openClose = this.createBtn(botIcon.bubbleBotIcon);
    document.body.append(openClose);
  },
  createCloseWidgetBtn() {
    const img = document.createElement("img");
    img.id = "closeWidgetIcon";
    img.src = helper.getHostName("/assets/close-small.svg");
    img.width = 30;
    img.height = 30;
    img.onclick = controller.toggleIframe;
    return img;
  },
  inseretCloseWidgetBtn() {
    const closeBtn = this.createCloseWidgetBtn();
    document.body.append(closeBtn);
  },
  showCloseWidgetBtn() {
    const closeBtn = document.getElementById("closeWidgetIcon");
    if (!closeBtn) return;
    closeBtn.style.display = "block";
  },
  hideCloseWidgetBtn() {
    const closeBtn = document.getElementById("closeWidgetIcon");
    if (!closeBtn) return;
    closeBtn.style.display = "none";
  },
  changeIconOfOpenClose: function (src) {
    const img = document.getElementById("floatingIconBottom");
    img.src = src;
  },
};

views.init();
