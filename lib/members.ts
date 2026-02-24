// Denne filen leser inn medlemmer fra members.csv 
// og returnerer en liste til å bruke på om-oss-siden

import fs from "fs";
import path from "path";
import { Member } from "@/types";
import { getCsvContent } from "./getFileContent";

type MemberCsvRow = {
    name: string;
    title: string;
    email: string;
    picture?: string;
};

export function getMembers(): Member[] {
    const rows = getCsvContent<MemberCsvRow>("om-oss/members");

    // Path til bildemappen fra root
    const memberPictureDir = path.join(process.cwd(), "public/members");

    return rows
        .map((row) => {
            const name = (row.name ?? "").trim();
            const title = (row.title ?? "").trim();
            const email = (row.email ?? "").trim();
            const pictureFileName = (row.picture ?? "").trim();

            if (!name || !title || !email) {
                console.warn("Ignoring invalid row - members.csv", row);
                return null;
            }

            let picturePath: string | null = null;

            if (pictureFileName) {
                const absPicturePath = path.join(memberPictureDir, pictureFileName);
                if (fs.existsSync(absPicturePath)) {
                    picturePath = `members/${pictureFileName}`;
                } else {
                    console.warn(`Picture for ${name} not found: ${absPicturePath}`);
                }
            }

            const member: Member = { name, title, email, picturePath };
            return member;
        })
        .filter((m): m is Member => m !== null);
}