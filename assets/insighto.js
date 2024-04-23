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
    displayName: "Insighto.ai",
    introMessage: "How can I help you ?",
    userTextMessageColor: "#ffffff",
    botTextMessageColor: "#000000",
    userOpeningMessages: [
      "Book a Demo",
      "Is Insighto.ai multilingual ?",
      "Pricing",
      "Can I train a bot ?",
      "Can I connect to live agent ?",
    ],
    headerColor: "var(--primary-color)",
    userMessageColor: "var(--primary-color)",
    botMessageColor: "#f1f1f0",
    botIconColor: "",
    removeBranding: false,
    conversationBotIcon: "/bot.png",
    headerTextColor: "#ffffff",
    iceBreakColor: "var(--primary-color)",
    showVoice: true,
    hasHumanAgent: false,
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
      model.botIcon.displayName =
        data?.data.display_name || model.botIcon.displayName;
      model.botIcon.introMessage =
        data?.data.intro_message || model.botIcon.introMessage;
      model.botIcon.userOpeningMessages =
        data?.data.user_opening_messages || model.botIcon.userOpeningMessages;
      model.botIcon.headerColor =
        data?.data.header_color || model.botIcon.headerColor;
      model.botIcon.userMessageColor =
        data?.data.user_message_color || model.botIcon.userMessageColor;
      model.botIcon.botMessageColor =
        data?.data.bot_message_color || model.botIcon.botMessageColor;
      model.botIcon.botIconColor =
        data?.data.bot_icon_color || model.botIcon.botIconColor;
      model.botIcon.removeBranding =
        data?.data.remove_branding || model.botIcon.removeBranding;
      model.botIcon.conversationBotIcon =
        data?.data.conversation_bot_icon || model.botIcon.conversationBotIcon;
      model.botIcon.iceBreakColor =
        data?.data.ice_break_color || model.botIcon.iceBreakColor;
      model.botIcon.userTextMessageColor =
        data?.data.user_text_message_color ||
        model.botIcon.userTextMessageColor;
      model.botIcon.botTextMessageColor =
        data?.data.bot_text_message_color || model.botIcon.botTextMessageColor;
      model.botIcon.headerTextColor =
        data?.data.header_text_color || model.botIcon.headerTextColor;
      model.botIcon.showVoice =
        "show_voice" in data?.data
          ? data?.data.show_voice
          : model.botIcon.showVoice;
      model.botIcon.hasHumanAgent =
        "has_human_agent" in data?.data
          ? data?.data.has_human_agent
          : model.botIcon.hasHumanAgent;
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
  getThemeInBase64() {
    const botIcon = this.getBotIconTheme();
    const theme = btoa(JSON.stringify(botIcon));
    return theme;
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
    const theme = controller.getThemeInBase64();
    const src = helper.getHostName(
      `/bot-iframe.html?widgetId=${insighto_ai_widget_id}&theme=${theme}`
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
