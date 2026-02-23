import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="glitch text-7xl font-black">404</p>
      <h1 className="mt-4 text-2xl font-semibold neon-heading">Signal Lost in the Grid</h1>
      <p className="mt-2 text-sm text-muted-foreground">The page drifted out of this network sector.</p>
      <Link href="/dashboard" className="mt-6 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
        Return to Dashboard
      </Link>
    </div>
  );
}
