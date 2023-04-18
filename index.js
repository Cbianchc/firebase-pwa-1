import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings = {
    databaseURL: "url que te da firebase de una"
    //url que te da firebase de una
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const listaComprasDB = ref(database, "listaCompra")

const nuevoItem = document.getElementById("input");
const btnAgragar = document.getElementById("agregar");
const compraList = document.getElementById("lista-compras");

btnAgragar.addEventListener("click", function() {
    let valorInput = nuevoItem.value

    push(listaComprasDB, valorInput)

    LimpiarInput()
})

onValue(listaComprasDB, function(snapshot) {
    //convertir el objet que me llega en un array

    
    if (snapshot.exists()) {
        let ArrayDeItems = Object.entries(snapshot.val())
        limpiarListaItems() 

        for (let i = 0; i < ArrayDeItems.length; i++) {
            let currentItem = ArrayDeItems[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
            // console.log("primero  "  + currentItemID)
            // console.log("segundo  "  + currentItemValue)

            agregarElementoALista(currentItem)
        }    
    } else {
        compraList.innerHTML = "no hay items todavia..."
    }

    
})

function LimpiarInput(){
    //limpiar input, reinicar input despues 
    nuevoItem.value = "";
}
function limpiarListaItems(){
    compraList.innerHTML = ""
}
function agregarElementoALista(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let nuevoEl = document.createElement("li")
    
    nuevoEl.textContent = itemValue

    nuevoEl.addEventListener("dblclick", function() {
        let itemExactoEnDB = ref(database, `listaCompra/${itemID}`)

        remove(itemExactoEnDB)
    })
    compraList.append(nuevoEl)
}

