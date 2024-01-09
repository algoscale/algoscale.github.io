const model = {
    iframeOpen: false,
    host: "https://cdn.insighto.ai",
}
const helper = {
    getHostName(url) {
        return model.host + url
    }
}
const controller = {
    toggleIframe: function () {
        if (model.iframeOpen) {
            views.removeWidget();
            views.changeIconOfOpenClose(helper.getHostName("/assets/bot.svg"));
        } else {
            if (!document.getElementById("chatWidget")) {
                views.insertIframeWidget();
            }
            views.changeIconOfOpenClose(helper.getHostName("/assets/down.svg"));
            views.displayIframe();
        }
        model.iframeOpen = !model.iframeOpen;
    },

}

const views = {
    init: function () {
        this.insertOpenCloseBtn();
    },
    createIframeWidget: function (src) {
        const iframe = document.createElement("iframe");
        iframe.id = "chatWidget";
        iframe.src = src;
        iframe.style.border = "none"
        iframe.style.display = "none";
        return iframe;
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
        const widget = this.createIframeWidget(helper.getHostName(`/bot-iframe.html?widgetId=${widgetId}`));
        document.body.append(widget);
    },
    insertOpenCloseBtn: function () {
        const openClose = this.createBtn(helper.getHostName("/assets/bot.svg"));
        document.body.append(openClose);
    },
    changeIconOfOpenClose: function (src) {
        const img = document.getElementById("openCloseWidget");
        img.src = src;
    }
}

views.init();