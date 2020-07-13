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
  
  // test for unicode
  const unicodeText = iconv.decode(fileContent, "utf-8").normalize("NFC");
  const unicodeResult = studentIdNameFormat.exec(unicodeText);
  studentIdNameFormat.lastIndex = 0;

  if (unicodeResult !== null) {
    const studentId = unicodeResult[0];
    //console.log(studentId+" status: OK!");
    continue;
  }

  const cp949Text = iconv.decode(fileContent, "cp949").normalize("NFC");
  const cp949Result = studentIdNameFormat.exec(cp949Text);
  studentIdNameFormat.lastIndex = 0;

  if (cp949Result !== null) {
    const studentId = cp949Result[0];
    //console.log(studentId+" status: OK! - with encoding change");
    continue;
  }

  console.error("ERROR: "+homework.studentName);
  //console.error(homework.studentName+" status: ERROR! filePath: "+path.join(process.cwd(), homework.originalFileName));
}



