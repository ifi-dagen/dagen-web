type IconProps = {
  className?: string;
};

export default function FacebookLogoIcon({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326V22.67c0 .732.593 1.325 1.325 1.325h11.495V14.71h-3.13v-3.62h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.92c-1.504 0-1.796.715-1.796 1.764v2.317h3.587l-.467 3.62h-3.12v9.285h6.116c.73 0 1.324-.593 1.324-1.325V1.326C24 .593 23.405 0 22.675 0z"/>
    </svg>
  );
}