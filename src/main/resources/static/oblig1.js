// creating an array to store the tickets
const billetter = [];

function addToArray() {

    //cChecking that all the input boxes have input before making a ticket
    const film = document.getElementById("film").value;
    const antall = document.getElementById("antall").value;
    const fornavn = document.getElementById("fornavn").value;
    const etternavn = document.getElementById("etternavn").value;
    const telefonnr = document.getElementById("telefonnr").value;
    const epost = document.getElementById("epost").value;

    // reset error messages
    resetErrorMessages();

    // Validating movie choice
    if (film === "Velg film her") {
        showError("feilmeldingFilm", "Du må velge en film!");
        return;
    }

    // Validating if antall is a positive integer
    if (!validatePositiveInteger(antall)) {
        showError("feilmeldingAntall", "Antall må være et positivt heltall.");
        return;
    }

    // Validating name and surname. Adding .trim function to remove any unwanted space
    if (!fornavn.trim()) {
        showError("feilmeldingFornavn", "Må fylle inn fornavn!");
        return;
    }

    if (!etternavn.trim()) {
        showError("feilmeldingEtternavn", "Må fylle inn etternavn!");
        return;
    }

    // Validating phone number
    if (!validatePhoneNumber(telefonnr)) {
        showError("feilmeldingTelefonnr", "Ugyldig telefonnummer.");
        return;
    }

    // Validating email
    if (!validateEmail(epost)) {
        showError("feilmeldingEpost", "Ugyldig e-postadresse.");
        return;
    }

    // Creating a ticket-object and adding it to the array
    const billett = {
        film: film,
        antall: antall,
        fornavn: fornavn,
        etternavn: etternavn,
        telefonnr: telefonnr,
        epost: epost
    };

    billetter.push(billett);

    // show tickets
    showTickets();

    // resetting the input boxes
    resetInputs();
}

// function to delete the array
function deleteTickets() {
    billetter.length = 0;

    // showing all tickets (which is now empty)
    showTickets();
}

function showTickets() {
    // finding the element where the tickets are going to be displayed
    const billettListeElement = document.getElementById("billettListe");

    // erasing the content before updating the list
    billettListeElement.innerHTML = "";

    // looping trough all the tickets and adding them to the list
    for (const billett of billetter) {
        const billettTekst = `Film: ${billett.film} ,  Antall: ${billett.antall} ,  Navn: ${billett.fornavn} ${billett.etternavn} , 
         Telefon: ${billett.telefonnr} ,  Epost: ${billett.epost}`;

        // choosing header for the text
        const header = document.createElement("h3");
        header.appendChild(document.createTextNode(billettTekst));
        billettListeElement.appendChild(header);
    }
}

// function to reset all the input boxes
function resetInputs() {
    document.getElementById("film").value = "Velg film her";
    document.getElementById("antall").value = "";
    document.getElementById("fornavn").value = "";
    document.getElementById("etternavn").value = "";
    document.getElementById("telefonnr").value = "";
    document.getElementById("epost").value = "";

    // resetting error messages
    resetErrorMessages();
}

// function to reset all error messages
function resetErrorMessages() {
    document.getElementById("feilmeldingFilm").innerText="";
    document.getElementById("feilmeldingAntall").innerText = "";
    document.getElementById("feilmeldingTelefonnr").innerText = "";
    document.getElementById("feilmeldingEpost").innerText = "";
    document.getElementById("feilmeldingKjop").innerText = "";
    document.getElementById("feilmeldingFornavn").innerText = "";
    document.getElementById("feilmeldingEtternavn").innerText = "";
}

// function that shows the error message by the input box
function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}

// function that validates if antall is a positive integer
function validatePositiveInteger(value) {
    const intValue = parseInt(value, 10);
    return !isNaN(intValue) && intValue > 0 && intValue === Math.floor(intValue);
}

// validation for norwegian phone numbers. from chatGPT.
function validatePhoneNumber(value) {
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(value);
}

// email validation inspired from regexr.com
function validateEmail(value) {
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(value);
}