import { useRouter } from "next/router";

type MemberCardProps = {
    memberPicture?: string | null;
    memberName: string;
    memberTitle: string;
    titleMail: string;
}


export default function MemberCard({ memberPicture, memberName, memberTitle, titleMail }: MemberCardProps) {
    const router = useRouter();
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg text-center">
            {/* Bilde, white space lik bildestørrelse hvis ikke bilde */}
            {memberPicture ? (
                <img
                    src={`${router.basePath}/${memberPicture}`}
                    alt={memberName}
                    className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                />
            ) : (
                <div className="w-32 h-32 mx-auto mb-4" />
            )}
            {/* Navn, tittel og epost */}
            {/* h-14 i navn for å få tittel på lik linje ved korte og lange navn */}
            <h2 className="text-xl font-semibold text-(--primary) h-14 flex items-center justify-center">{memberName}</h2>
            <p className="text-gray-700 dark:text-gray-300 font-medium">{memberTitle}</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{titleMail}</p>
        </div>
    );
}