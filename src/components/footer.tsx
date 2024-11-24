import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-50 p-4 text-center text-slate-600">
      <p>© 2024 AudioIntel</p>
      <p className="mt-2">
        Made with ❤️ by{" "}
        <Link
          data-track="footer_amit_wani_click"
          className="underline font-bold text-blue-600"
          href="https://x.com/mtwn105"
        >
          Amit Wani
        </Link>
      </p>
    </footer>
  );
}
