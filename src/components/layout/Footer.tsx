export function Footer() {
  return (
    <footer className="pb-24 md:border-t md:border-border md:pb-0">
      <div className="mx-auto flex w-full max-w-310 flex-col items-center px-4 py-5 text-xs text-muted-foreground md:flex-row md:justify-between md:gap-4 md:px-10 md:text-[13px]">
        <span>Fan project, not affiliated with Formula 1.</span>
        <span className="max-md:hidden">Data: Jolpica-F1 and OpenF1</span>
      </div>
    </footer>
  );
}
