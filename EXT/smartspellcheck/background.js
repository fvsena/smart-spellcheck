var userinfo = null;
var capturaAtiva = false;
var url = {
    host: "https://automation.teleperformance.com.br/smarttab-mercadolivre-api"
}

//Listen for tabs that are updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //Validate if its the correct page to insert the logic
    console.log(tab)
    if (ValidatePage(tab)) {
        loadScript();
    }
})
//Listen for tabs that are created
chrome.tabs.onCreated.addListener(function (tabId, changeInfo, tab) {
    //Validate if its the correct page to insert the logic
    if (ValidatePage(tab)) {
        loadScript();
    }
})


async function loadScript() {
    tabId = await getTabId();
    insertScript();
}
async function insertScript() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['monitor.js']
    })
}
async function getTabId() {
    var tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0].id;
}

function ValidatePage(tab) {
    //Check for page title
    if (tab.title.includes('Agent Console') || tab.title.includes('Console do agente') || tab.title == ('Sprinklr') || tab.title.includes('Lightning Experience') || title.includes('Salesforce')) {
       return true;
    }
	else {
		return false;
	}
    
}

chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {
        console.log(request);

		if (request.name == "iniciar") {
            Iniciar();
            capturaAtiva = true;
            sendResponse({iniciado:true});
        }
		
		if (request.name == "liberar") {
            Liberar();
        }
    }
);

async function Iniciar() {

    tabId = await getTabId()
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['/monitor.js']
    })
}

async function Liberar() {

    tabId = await getTabId()
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['/override.js']
    })
}

async function getTabId() {
    var tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0].id;
}