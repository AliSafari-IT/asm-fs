export function Header({ children, className }: { children?: React.ReactNode, className?: string }) {

  return (
    <header className={`h-16 flex items-center justify-center border-b border-[var(--border-secondary)]  font-josefin font-extrabold ${className}`}>
      {children ?? <div className="text-3xl text-[var(--text-primary)] bg-[var(--bg-secondary)] font-josefin font-extrabold">
        ASafariM
      </div>
      }
    </header>
  );
}

export default Header;
