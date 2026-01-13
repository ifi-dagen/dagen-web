// Viser markdown-formatert tekst på nettsiden.
// Markdown gjøres om til HTML (f.eks. # Tittel blir <h1>Tittel</h1>)

import ReactMarkdown from "react-markdown";

type ContentMarkdownProps = {
    markdownText: string;  // Markdown-teksten som skal vises
    isCentered: boolean;   // Kun ett element? tekst sentreres
};

export default function ContentMarkdown({ markdownText, isCentered }: ContentMarkdownProps) {
    return (
        <div
            className={`
                prose wrap-break-word max-w-full
                ${isCentered ? "mx-auto" : ""}
            `}
        >
            <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
    );
}
