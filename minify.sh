npm i uglify-js clean-css -g
uglifyjs -o ./assets/insighto.min.js ./assets/insighto.js
uglifyjs -o ./assets/bot-iframe.min.js ./assets/bot-iframe.js
uglifyjs -o ./call_assets/call_iframe.min.js ./call_assets/call_iframe.js
uglifyjs -o ./web_call_assets/web_call_iframe.min.js ./web_call_assets/web_call_iframe.js
cleancss -o ./assets/insighto.min.css ./assets/insighto.css