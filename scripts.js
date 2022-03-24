// Start des Programms im globalen Context
// Deklaration und Initialisierung der Variablen
const search = document.getElementById('search');
const searchField = document.getElementById("search-field");
const clock = document.getElementById("clock");

// Fügt dem Html-Element des Suchfeldes einen EventListener hinzu
// Sobald in diesem Element das Event "keydown" ausgelöst wird, wird eine anonyme, lokale Funktion ausgeführt
// Der Parameter "event" enthält alle Informationen zum Event
searchField.addEventListener("keydown",  event => {
    // Wenn die Taste "Enter" gedrückt wurde, wird der Wert im Suchfeld abgespeichert...
    // und an window.open() weitergegeben. Hier öffnen wir im selben Fenster einen Link zu unserer...
    // Lieblings-Suchmaschine und übergeben den Wert des Suchfeldes als Query-Parameter an sie.
    if (event.key === "Enter") {
        let val = searchField.value;
        // Öffnet eine Suchmaschine im gleichen Fenster und übergibt den Wert des Suchfeldes als Query-Parameter
        window.open("https://duckduckgo.com/?q=" + val + "&source=web", "_self");
    }
});

// Funktionsdefinition, um die aktuelle Uhrzeit zu bekommen und sie anschließend in ein...
// menschenlesbares Format zu konvertieren.
function getTime(){
    // Erstellt ein neues Datum-Objekt
    // Hint: Konstruktor-Aufruf -- Syntaktischer Zucker
    let date = new Date(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        hour = date.getHours();

    return "" +
        (hour < 10 ? ("0" + hour) : hour) + ":" +
        (min < 10 ? ("0" + min) : min) + ":" +
        (sec < 10 ? ("0" + sec) : sec);
}

// Weißt dem Inhalt des Html-Element "clock" unseren Uhrzeits-String zu
clock.innerHTML = getTime();

// Problemstellung: JavaScript läuft in einem Thread immer Syncron ab
// Das bedeutet, dass sobald hier in diesem Dokument die letzte Anweisung ausgeführt wurde...
// die Ausführung beendet ist.
// Lösung: Mit Web-API setInterval() lassen wir JavaScript einen Thread erzeugen, der...
// jede Sekunde eine sogenannte "Callback-Funktion" ausführt, die wir als Parameter übergeben.
// Diese ist hier im "Lambda-Syntax" geschrieben und setzt lediglich den Wert der Variable...
// "clock" auf den Rückgabewert der Funktion getTime().
setInterval( () => {
    clock.innerHTML = getTime();
},100);
      
// Fügt dem "DOM", dem gesamten Dokument, einen EventListener hinzu, der bei jedem Klick egal in welchem Element...
// geklickt wurde, überprüft ob entweder "Spacebar" oder "Escape" gedrückt wurde und dann entsprechend...
// das Suchfeld Sichtbar/Unsichtbar macht.
document.addEventListener("keydown", event => {
    if (event.key == " ") {
        search.style.display = 'flex';
        searchField.focus();
    } else if (event.key == "Escape") {
        searchField.value = '';
        searchField.blur();
        search.style.display = 'none';
    }
});