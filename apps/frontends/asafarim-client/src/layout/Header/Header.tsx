export function Header({ children }: { children?: React.ReactNode }) {

  return (
    <header className="h-16 bg-[var(--bg-secondary)] flex items-center justify-center border-b border-[var(--border-secondary)]  font-josefin font-extrabold">
      {children ?? <div className="text-3xl text-[var(--text-primary)] font-josefin font-extrabold">
        ASafariM
      </div>
      }
    </header>
  );
}

export default Header;
