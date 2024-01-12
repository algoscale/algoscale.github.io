const model = {
  iframeOpen: false,
  host: "https://cdn.insighto.ai",
};
const helper = {
  getHostName(url) {
    return model.host + url;
  },
};
const controller = {
  toggleIframe: function () {
    if (model.iframeOpen) {
      views.removeWidget();
      views.changeIconOfOpenClose(helper.getHostName("/assets/bot.svg"));
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
  init: function () {
    this.insertOpenCloseBtn();
    this.insertGreet();
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
      img.src = "/assets/close.svg";
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
  },
  displayIframe: function () {
    document.getElementById("chatWidget").style.display = "block";
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
    const widget = this.createIframeWidget(
      helper.getHostName(`/bot-iframe.html?widgetId=${insighto_ai_widget_id}`)
    );
    document.body.append(widget);
  },
  insertOpenCloseBtn: function () {
    const openClose = this.createBtn(helper.getHostName("/assets/bot.svg"));
    document.body.append(openClose);
  },
  changeIconOfOpenClose: function (src) {
    const img = document.getElementById("openCloseWidget");
    img.src = src;
  },
};

views.init();
