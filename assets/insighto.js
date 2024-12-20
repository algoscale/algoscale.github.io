const loadedWidgetId =
  typeof insighto_ai_widget_id !== "undefined"
    ? insighto_ai_widget_id
    : widget_id;

const api = {
  async fetchTheme() {
    try {
      const data = await fetch(
        `https://ragify-be.azurewebsites.net/api/v1/widget/${loadedWidgetId}/parameters`
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
    botIconColor: "#3b81f6",
    removeBranding: false,
    conversationBotIcon: "/bot.png",
    headerTextColor: "#ffffff",
    iceBreakColor: "var(--primary-color)",
    showVoice: true,
    actionButtons: [],
    hasHumanAgent: false,
    actionButtonsColor: "var(--primary-color)",
    styleParams: {
      autoCloseBubbleEverytime: true,
      autoOpenWidget: false,
      hideIceBreakerForSession: false,
      showResetButton: false,
      agencyName: "Insighto.AI",
      placeholder: "Type or speak using mic",
      agencyDomain: "https://insighto.ai",
    },
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
    const { style_params = {} } = data?.data;
    if (data) {
      model.botIcon.bubbleBotIcon =
        data?.data.bubble_bot_icon || model.botIcon.bubbleBotIcon;
      model.botIcon.bubbleColor =
        data?.data.bubble_color || model.botIcon.bubbleColor;
      model.botIcon.bubbleText = data?.data.bubble_text || "";
      const title = data?.data?.display_name || model.botIcon.displayName;
      model.botIcon.displayName = title;
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
      model.botIcon.actionButtons =
        data?.data.action_buttons || model.botIcon.actionButtons;
      model.botIcon.actionButtonsColor =
        data?.data.action_buttons_color || model.botIcon.actionButtonsColor;
      const styleParameters = style_params || {};
      model.botIcon.styleParams.autoCloseBubbleEverytime =
        "auto_close_bubble_everytime" in styleParameters
          ? styleParameters.auto_close_bubble_everytime
          : model.botIcon.styleParams.autoCloseBubbleEverytime;
      model.botIcon.styleParams.autoOpenWidget =
        "auto_open_widget" in styleParameters
          ? styleParameters.auto_open_widget
          : model.botIcon.styleParams.autoOpenWidget;
      model.botIcon.styleParams.hideIceBreakerForSession =
        "hide_ice_breaker_for_session" in styleParameters
          ? styleParameters.hide_ice_breaker_for_session
          : model.botIcon.styleParams.hideIceBreakerForSession;
      model.botIcon.styleParams.showResetButton =
        "show_reset_button" in styleParameters
          ? styleParameters.show_reset_button
          : model.botIcon.styleParams.showResetButton;
      model.botIcon.styleParams.placeholder =
        styleParameters.placeholder || model.botIcon.styleParams.placeholder;
      model.botIcon.agency = data?.data?.agency;
    }
  },
  toggleIframe: async function () {
    if (model.iframeOpen) {
      controller.closeWidget();
      model.iframeOpen = false;
    } else {
      controller.openWidget();
      model.iframeOpen = true;
    }
  },
  closeWidget: function () {
    views.removeWidget();
    views.changeIconOfOpenClose(model.botIcon.bubbleBotIcon);
    views.hideCloseWidgetBtn();
    sessionStorage.setItem("alreadyOpenedOnce", true);
    model.iframeOpen = false;
  },
  openWidget: function name() {
    if (!document.getElementById("chatWidget")) {
      views.insertIframeWidget();
    }
    if (document.getElementById("greetMe")) {
      views.initateAnimationForGreetRemove(200);
      views.initiateRemove(500);
    }
    views.changeIconOfOpenClose(helper.getHostName("/assets/down.svg"));
    views.displayIframe();
    model.iframeOpen = true;
  },
  getThemeInBase64() {
    const botIcon = this.getBotIconTheme();
    const theme = btoa(unescape(encodeURIComponent(JSON.stringify(botIcon))));
    return theme;
  },
};

const views = {
  init: async function () {
    await controller.setBotThemeColorAndIcon();
    this.insertOpenCloseBtn();
    this.insertGreet();
    this.inseretCloseWidgetBtn();
    const { styleParams } = controller.getBotIconTheme();
    if (
      styleParams.autoCloseBubbleEverytime &&
      sessionStorage.getItem("greeted")
    ) {
      this.removeGreetMessage();
      return;
    }
    if (styleParams.autoCloseBubbleEverytime) this.showGreetForOneSession();
    if (
      styleParams.autoOpenWidget &&
      !sessionStorage.getItem("alreadyOpenedOnce")
    )
      controller.openWidget();
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
    const botIcon = controller.getBotIconTheme();
    if (botIcon.bubbleText) {
      greetDiv.id = "greetMe";
      greetDiv.className = "greetMe__banner";
      const img = createCloseIcon();
      const messageDiv = createMessage();
      greetDiv.append(img);
      greetDiv.append(messageDiv);
    }
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
    div.style.backgroundColor = botIcon.botIconColor;
    img.alt = "Floating icon";
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
      `/bot-iframe.html?widgetId=${loadedWidgetId}&theme=${theme}`
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
    img.alt = "Close icon";
    img.width = 30;
    img.height = 30;
    img.onclick = () => {
      controller.closeWidget();
    };
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
