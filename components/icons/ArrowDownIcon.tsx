// Pil ned for bruk i bla. dropdown-menyer
// Penere enn å bruke symboler o.l.

type IconProps = {
    className?: string;
};

export default function ArrowDownIcon({ className = "" }: IconProps) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
        </svg>
    );
}