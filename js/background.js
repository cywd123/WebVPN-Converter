import { convert } from "./convert.js";

chrome.contextMenus.create({
    "title": '用WebVPN在新标签页打开',
    "id": 'convert-and-open',
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId !== 'convert-and-open')
        return;
    
    const webvpn_link = await chrome.storage.sync.get(['webvpn_link']);
    if (webvpn_link.webvpn_link == undefined ) {
        webvpn_link.webvpn_link = "https://webvpn.stu.edu.cn";
    }

    chrome.tabs.create({
        url: convert(webvpn_link.webvpn_link, info.pageUrl),
        index: tab.index + 1
    });
});

chrome.action.onClicked.addListener(async () => {
    const webvpn_link = await chrome.storage.sync.get(['webvpn_link']);
    if (webvpn_link.webvpn_link == undefined ) {
        webvpn_link.webvpn_link = "https://webvpn.stu.edu.cn";
    }
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        var page_url = tabs[0].url;
        chrome.tabs.update(
            tab.id, {url: convert(webvpn_link.webvpn_link, page_url)}
        );
    });
});