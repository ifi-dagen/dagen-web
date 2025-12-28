// Viser en liste med FAQ som dropwdown-menyer (åpne / lukke svarene)
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FaqProps } from "@/types";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon"

// Props: liste med FAQ-objekter
type FaqDropdownProps = {
    faqs: FaqProps[];
};


export default function FaqDropdown({ faqs }: FaqDropdownProps) {
    // State for åpen / lukket dropdown
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Toggle (aktivere), åpner / lukker valgt spørsmål 
    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                    {/* Knapp for å åpne/lukke svar med spørsmål som tittel */}
                    <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex justify-between items-center gap-4"
                    >
                        <span className="font-semibold text-lg">
                            {faq.question}
                        </span>

                        {/* Pil opp / ned (roterer 180 ved åpne/lukke) */}
                        <ArrowDownIcon
                            className={`w-5 h-5 shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {/* Viser svaret kun hvis denne raden (spørsmålet) er åpen */}
                    {openIndex === index && (
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 prose prose-sm max-w-none">
                            <ReactMarkdown>{faq.answer}</ReactMarkdown>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
