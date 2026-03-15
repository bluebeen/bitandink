import Container from "@/components/common/Container";
import BeanAvatar from "@/components/common/BeanAvatar";

export default function Loading() {
  return (
    <Container className="flex min-h-[65vh] items-center justify-center">
      <div className="relative flex flex-col items-center gap-5 text-center">
        <div className="relative h-20 w-20 md:h-24 md:w-24">
          <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]/10 blur-2xl" />
          <div className="relative h-full w-full animate-bean-float">
            <BeanAvatar clickable={false} className="h-full w-full" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
            bean@beanlog.site:~$ loading
          </p>
          <p className="text-sm text-[var(--color-sub)]">
            Bean이 아카이브를 정리하고 있어요...
          </p>
        </div>
      </div>
    </Container>
  );
}