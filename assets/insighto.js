const model = {
  iframeOpen: false,
  widgetTheme: null,
  host: "https://cdn.insighto.ai",
};
const helper = {
  getHostName(url) {
    return model.host + url;
  },
};
const controller = {
  async init() {
    const response = await api.fetchWidgetTheme(insighto_ai_widget_id);
    model.widgetTheme = response.data;
  },
  toggleIframe: async function () {
    if (model.iframeOpen) {
      views.removeWidget();
      views.changeIconOfOpenClose(helper.getHostName("/assets/bot.svg"));
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
    await controller.init();
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
      const messageDiv = document.createElement("div");
      messageDiv.className = "greetMe__bannerMsg";
      const para = document.createElement("p");
      para.innerText = "Hi! I am Insighto.ai, how can I help you?";
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
    const img = document.createElement("img");
    img.id = "openCloseWidget";
    img.width = 40;
    img.height = 40;
    img.src = src;
    img.onclick = controller.toggleIframe;
    return img;
  },
  insertIframeWidget: function () {
    const theme = this.getThemeParams();
    const base64Theme = btoa(JSON.stringify(theme));
    const widget = this.createIframeWidget(
      helper.getHostName(
        `/bot-iframe.html?widgetId=${insighto_ai_widget_id}&theme=${base64Theme}`
      )
    );
    document.body.append(widget);
  },
  getThemeParams() {
    if (!model.widgetTheme) {
      return {};
    }
    const displayName = model?.widgetTheme.display_name || "";
    const introMessage = model?.widgetTheme.intro_message || "";
    const userOpeningMessages = model?.widgetTheme.user_opening_messages.length
      ? model?.widgetTheme.user_opening_messages.length
      : [];
    const headerColor = model?.widgetTheme.header_color || "";
    const userMessageColor = model?.widgetTheme.user_message_color || "";
    const botMessageColor = model?.widgetTheme.bot_message_color || "";
    const botIconColor = model.widgetTheme.bot_icon_color || "";
    const removeBranding = model.widgetTheme.remove_branding || false;
    const botProfilePic = model?.widgetTheme.bot_profile_pic || "";
    return {
      displayName,
      introMessage,
      userOpeningMessages,
      headerColor,
      userMessageColor,
      botMessageColor,
      botIconColor,
      removeBranding,
      botProfilePic,
    };
  },
  insertOpenCloseBtn: function () {
    const openClose = this.createBtn(helper.getHostName("/assets/bot.svg"));
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
    const img = document.getElementById("openCloseWidget");
    img.src = src;
  },
};

const api = {
  async fetchWidgetTheme(widgetId) {
    try {
      const response = await (
        await fetch(
          `https://ragify-be.azurewebsites.net/api/v1/widget/${widgetId}/parameters`
        )
      ).json();
      return response;
    } catch (error) {
      return {};
    }
  },
};
views.init();
