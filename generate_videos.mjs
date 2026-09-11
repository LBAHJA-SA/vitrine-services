import fs from "fs";
import path from "path";
const outDir = "C:\\vitrine-services\\public\\videos";
fs.mkdirSync(outDir, {recursive:true});
const minimalMP4Base64 = "AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAu1tZGF0AAAAsAAAAExhdmM1OC4zNS4xMDA=";
const titles = ["fatourati-15s","cv-15s","bot-15s","vitrine-15s","excel-15s"];
titles.forEach(t=>{
  fs.writeFileSync(path.join(outDir, `${t}.mp4`), Buffer.from(minimalMP4Base64, "base64"));
  console.log(`created ${t}.mp4`);
});
console.log("PLACEHOLDER_VIDEOS_CREATED");
