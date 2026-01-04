import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { InternGroup } from "../types";


export function getInternGroups(): InternGroup[] {
  const internDir = path.join(process.cwd(), "content/bli-med/interngrupper");
  
  if (!fs.existsSync(internDir)) {
    console.error(`Missing interngrupper directory`);
    return [];
  }

  const files = fs.readdirSync(internDir).filter(file => file.endsWith('.md'));
  
  return files.map(file => {
    const filePath = path.join(internDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content } = matter(fileContent);
    
    return {
      content
    };
  });
}
