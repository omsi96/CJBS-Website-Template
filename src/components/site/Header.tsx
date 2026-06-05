// Site header — logo + nav + auth state. Safe to extend with your own links.
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { CambridgeLogo } from "@/components/site/CambridgeLogo";

const nav = ["Programmes", "Executive Education", "Faculty & Research", "Insights", "Alumni"];

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-cjbs-line bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <CambridgeLogo size="md" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a key={item} href="#" className="text-sm font-medium text-cjbs-muted transition-colors hover:text-cjbs-ink">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className="hidden sm:block">
                <span className="text-sm font-semibold text-cjbs-ink">{user.name.split(" ")[0]}</span>
              </Link>
              <Avatar initials={user.avatarInitials} size="sm" />
            </>
          ) : (
            <Link href="/login">
              <Button size="sm" variant="secondary">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
