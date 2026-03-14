import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo size="md" />
          <Navigation />
        </div>
      </Container>
    </header>
  );
}