import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="text-7xl font-extrabold text-gradient">404</p>
      <h1 className="mt-4 text-2xl font-bold">This path doesn&apos;t exist yet</h1>
      <p className="mt-2 text-muted">
        The page you&apos;re looking for moved or was never built. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/tech" variant="outline">Browse tech guides</ButtonLink>
      </div>
    </div>
  );
}
