import fs from "fs"
import wav from "node-wav"
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static" 

const filePath = "./tmp/audio.mp4"
const outpuPath = filePath.replace(".mp4",".wav")

export const convert = () => new Promise((resolve, reject) =>{
    console.log("convertendo o video")

    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
    .input(filePath)
    .audioFrequency(16000)
    .audioChannels(1)
    .format("wav")
    .on("end", () => {
        const file = fs.readFileSync(outpuPath)
        const fileDecoded = wav.decode(file)

        const audioData = fileDecoded.channelData[0]
        const floatArray = new Float32Array(audioData)

        console.log("Video convertido com sucesso")

        resolve(floatArray)
        fs.unlinkSync(outpuPath)
    })
    .on("error", (error) => {
        console.log("Error ao conveter o video", error)
        reject(error)
    })
    .save(outpuPath)
})