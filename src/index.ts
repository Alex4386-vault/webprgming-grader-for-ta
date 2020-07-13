import fs from "fs";
import path from "path";
import iconv from "iconv-lite";
import { parseStudentFilename } from "./parser";
import { JSDOM } from "jsdom";

const homeworkFiles = fs.readdirSync("homework");
const homeworks = [];

for (const homework of homeworkFiles) {
  const parsed = parseStudentFilename(homework, "homework");

  if (parsed !== null) {
    homeworks.push(parsed);
  } else {
    console.error(`오류: 와 샌즈! ${homework}는 올바른 파일 이름이 아니예요!`);
  }
}

for (const homework of homeworks) {
  const studentIdNameFormat = /20[0-9]{7}( |)([가-힣]{2,}|[A-Za-z ]{2,})/g;

  let fileContent = fs.readFileSync(homework.originalFileName);

  const dom = new JSDOM(fileContent);

  const window = dom.window;
  const document = window.document;

  try {

    const form = document.getElementsByTagName("form");

    if (form.length === 0) {
      console.error("ERROR: "+homework.studentName+" @ test 1 - form");
      continue;
    }

    const inputs = document.getElementsByTagName("input");

    if (inputs.length === 0) {
      console.error("ERROR: "+homework.studentName+" @ test 1 - inputs");
      continue;
    }

  } catch(e) {
    console.error("ERROR: "+homework.studentName+" @ test FAILED, manual check required");
  }

  //console.error(homework.studentName+" status: ERROR! filePath: "+path.join(process.cwd(), homework.originalFileName));
}



