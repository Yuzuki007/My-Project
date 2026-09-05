interface LogoIconProps {
  src: string;
  alt: string;
}

export function LogoIcon({ src, alt }: LogoIconProps) {
  return (
    <span className="logo-icon">
      <img src={src} alt={alt} />
    </span>
  );
}
