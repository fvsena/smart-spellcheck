
//EVENTOS
document.addEventListener('DOMContentLoaded', function () {

    // document.getElementById('iniciar').addEventListener(
        // 'click', Iniciar);
		
	document.getElementById('ignorar').addEventListener(
        'click', Ignorar);


})

async function Iniciar() {
    var resposta = await chrome.runtime.sendMessage({ name: "iniciar" });
    document.getElementById('iniciar').textContent = "Reiniciar captura";
}

async function Ignorar() {
    var resposta = await chrome.runtime.sendMessage({ name: "liberar" });
}