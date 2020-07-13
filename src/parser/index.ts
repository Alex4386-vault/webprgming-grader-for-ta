import path from "path";

const filenameParser = /^([A-Za-z -]+)_([0-9]+)_assignsubmission_file_([0-9A-Za-z가-힣\(\)\[\]\.\# _-]+)$/g;

export function parseStudentFilename(fileName: string, root?: string) {
  const pathName = root ? path.join(root, fileName) : fileName;
  
  fileName = fileName.normalize("NFC");
  filenameParser.lastIndex = 0;
  const parsed = filenameParser.exec(fileName);

  if (parsed === null) {
    return null;
  } else {
    return {
      studentName: parsed[1],
      fileName: parsed[3],
      originalFileName: pathName
    }
  }
}
