const model = {
    widget: {
        dimension: {
            height: "100px",
            width: "100px",
        },
        show: false
    }
}
const controllers = {
    onWidgetBtnClick: function () {
        model.widget.dimension.height = model.widget.show ? "100px" : "800px";
        model.widget.dimension.width = model.widget.show ? "100px" : "550px";
        model.widget.dimension.show = true;
        views.setDimentionsOfIframe(model.widget.dimension.height, model.widget.dimension.width);
    }
}
const views = {
    init: function () {
        const chatWidget = document.getElementById("chatWidget");
        chatWidget.onreadystatechange = function () {
            console.log(chatWidget.contentDocument.readyState);
        }
        chatWidget.onload = () => {
            setTimeout(() => {
                const button = chatWidget.contentWindow.document.getElementById("openClose");
                button.onclick = controllers.onWidgetBtnClick;
            })
        }
    },
    setDimentionsOfIframe: function (height, width) {
        document.getElementById("chatWidget").style.height = height;
        document.getElementById("chatWidget").style.width = width;
    }
};
views.init();
