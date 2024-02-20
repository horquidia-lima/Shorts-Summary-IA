import {server} from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const videoURL = input.value
    
    if(!videoURL.includes("shorts")){
        return content.textContent = "Esse video nao parece ser um shorts"
    }

    const [_, params] = videoURL.split("/shorts/")

    //limpar URL
    const [videoID] = params.split("?si")
    
    content.textContent = "Obtendo o texto do audio..."

    const transcription = await server.get("/summary/" + videoID)

    content.textContent = "realizando o resumo"

    const summary = await server.post("/summary")
})