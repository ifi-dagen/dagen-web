import fs from "fs";
import path from "path";
import Papa from "papaparse";

export type Member = {
  name: string;
  title: string;
  email: string;
  picturePath: string | null;
};

const SUPPORTED_EXTENSIONS = ["png", "jpg", "jpeg", "svg", "webp", "gif"];

function findPictureFile(baseName: string, directory: string): string | null {
  for (const ext of SUPPORTED_EXTENSIONS) {
    const fileName = `${baseName}.${ext}`;
    const filePath = path.join(directory, fileName);
    
    if (fs.existsSync(filePath)) {
      return fileName;
    }
  }
  
  return null;
}

export async function getMembers(): Promise<Member[]> {
  const csvPath = path.join(process.cwd(), "content/om-oss/members.csv");
  const picturesDir = path.join(process.cwd(), "public/members");
  
  if (!fs.existsSync(csvPath)) {
    console.error("Members CSV file not found");
    return [];
  }

  const fileContent = fs.readFileSync(csvPath, "utf8");
  const { data } = Papa.parse<string[]>(fileContent, {
    skipEmptyLines: true,
  });

  return data.map((row) => {
    const [name, title, email, pictureBaseName] = row;
    const picturePath = findPictureFile(pictureBaseName, picturesDir);
    
    return {
      name,
      title,
      email,
      picturePath: picturePath ? `members/${picturePath}` : null,
    };
  });
}
