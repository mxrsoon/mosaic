import { Static } from "../index.js";

export class HtmlUtils extends Static {
    static documentReady() {
        const loaded = /^loaded|^i|^c/.test(document.readyState);

        return new Promise(function(resolve) {
            if (loaded) return resolve();

            function onReady() {
                resolve();
                document.removeEventListener("DOMContentLoaded", onReady);
                window.removeEventListener("load", onReady);
            }

            document.addEventListener("DOMContentLoaded", onReady);
            window.addEventListener("load", onReady);
        });
    }
}