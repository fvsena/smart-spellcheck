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
    console.log("Iniciado captura");
    StartMonitor();
}

//Prepares data and elements to be monitored and starts the observer
function StartMonitor() {

    try {
        observer.disconnect();
    } catch (e) {
        console.log(e);
    }

    const targetConsola = document.body;
    const configConsola = { characterData: true, attributes: false, childList: true, subtree: true };

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
			if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    if (!node.tagName) continue; // not an element
                    //console.log('EVENTO CAPTURADO - ADDED NODES');
					setTimeout(enableDisable, 2000);
                }
            }
			
			if (mutation.type === 'characterData') {
                //console.log('EVENTO CAPTURADO - CHARACTER DATA');
				setTimeout(enableDisable, 2000);
            }
        }
    };

    observer = new MutationObserver(callback);
    observer.observe(targetConsola, configConsola);

}

function enableDisable(){
	var erros = document.querySelectorAll('[data-entitytype');
	var errosLanguageTools = document.getElementsByClassName('lt-toolbar__status-icon--has-errors');

	if (errosLanguageTools.length > 0) {
		console.log("***** CONSTAM ERROS DE DIGITAÇÃO LANGUAGE TOOLS **** ");

		var frames = document.getElementsByClassName('oneWorkspaceTabWrapper');
		for (var i = 0; i < frames.length; i++) {
			var elementos = frames[i].getElementsByClassName('slds-button slds-button_brand');
			if (elementos.length > 0) {
				for (var j = 0; j < elementos.length; j++) {
					if (elementos[j].textContent == "OK") {
						console.log("***** BLOQUEANDO ELEMENTO**** ");
						elementos[j].setAttribute("style", "display:none");
                    }
				}
			}
        }
	}
	else if (erros.length > 0){
		console.log("***** CONSTAM ERROS DE DIGITAÇÃO **** ");
		var elementos = document.querySelectorAll('[data-shortcut-id="publisher_primary_action_button"]');

		if (elementos.length > 0) {
			console.log("***** TRATATIVA SPRINKLR **** ");
			for (var i = 0; i < elementos.length; i++) {
				console.log("***** BLOQUEANDO ELEMENTO**** ");
				elementos[i].setAttribute("style", "display:none");
			}
		}
	}
	else {
		console.log("***** NÃO CONSTAM ERROS DE DIGITAÇÃO **** ");
		var elementos = document.querySelectorAll('[data-shortcut-id="publisher_primary_action_button"]');

		if (elementos.length > 0) {
			for (var i = 0; i < elementos.length; i++) {
				elementos[i].removeAttribute("style");
			}
		}
		else {

			var frames = document.getElementsByClassName('oneWorkspaceTabWrapper');
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
	}
}
