import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 py-10">
      <Container>
        <div className="space-y-4">
          <Logo showText size="sm" />

          <div className="mt-6 space-y-2 font-mono text-sm">
            <p className="text-[var(--color-accent)]">
              bitandink@beanlog.site:~$ whoami
            </p>

            <p className="text-[var(--color-sub)]">
              writer · frontender · siter
            </p>

            <p className="mt-4 text-[var(--color-accent)]">$ credits</p>

            <p className="text-[var(--color-sub)]">writing: 최이사각(perfugium)</p>
            <p className="text-[var(--color-sub)]">studio: Bean Web Studio</p>

            <p className="mt-4 text-[var(--color-accent)]">$ help</p>

            <p className="text-[var(--color-sub)]">press ? for shortcuts</p>

            <p className="mt-4 text-[var(--color-accent)]">$ copyright</p>

            <p className="text-[var(--color-sub)]">
              <span className="terminal-caret">© 2026 bitandink</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}