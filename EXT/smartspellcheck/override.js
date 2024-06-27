var storage_available = true;
var title = document.title;
var processingConsola = false;
var listaTemporaria = [[]];

console.log('CAPTURANDO TITULO: ' + title);
if (title.includes('Agent Console') || title.includes('Console do agente') || title == ('Sprinklr') || title.includes('Lightning Experience') || title.includes('Salesforce')) {
    setTimeout(executeScript, 2000);
} else {
    console.log('NAO ESTA NA FERRAMENTA MAPEADA')
}

//Starts the instance
function executeScript() {
    console.clear();
    Liberar();
}

//Prepares data and elements to be monitored and starts the observer
function Liberar() {
	console.log("***** ERROS IGNORADOS **** ");
	var spans = document.getElementsByTagName('span');
    var frames = document.getElementsByClassName('oneWorkspaceTabWrapper');
    if (frames.length > 0) {
        for (var i = 0; i < frames.length; i++) {
            elementos = frames[i].getElementsByClassName('slds-button slds-button_brand');
            if (elementos.length > 0) {
                for (var j = 0; j < elementos.length; j++) {
                    if (elementos[j].textContent == "OK") {
                        elementos[j].removeAttribute("style");
                    }
                }
            }
        }
    }
    else if (spans.length > 0) {
        for (let index = 0; index < spans.length; index++) {
            spans[index].removeAttribute('data-entitytype')
        }

        document.querySelector('[data-shortcut-id="publisher_primary_action_button"]').removeAttribute("style");
    }
}

