const model = {
    iframeOpen: false
}

const controller = {
    toggleIframe: function () {
        if (model.iframeOpen) {
            views.removeWidget();
            views.changeIconOfOpenClose("/assets/bot.svg");
        } else {
            views.changeIconOfOpenClose("/assets/down.svg");
            views.displayIframe();
        }
        model.iframeOpen = !model.iframeOpen;
    }
}

const views = {
    init: function () {
        this.insertIframeWidget();
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
        const widget = this.createIframeWidget("/index.html");
        document.body.append(widget);
    },
    insertOpenCloseBtn: function () {
        const openClose = this.createBtn("/assets/bot.svg");
        document.body.append(openClose);
    },
    changeIconOfOpenClose : function(src){
        const img = document.getElementById("openCloseWidget");
        img.src = src;
    }
}

views.init();