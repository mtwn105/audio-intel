import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Transform Audio into Actionable Intelligence
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-prose">
              Leverage AI-powered analytics to extract valuable insights from
              your audio content. Perfect for podcasters, researchers, and
              content creators.
            </p>
            <div className="mt-10 flex gap-4">
              <Button asChild size="lg">
                <Link href="/app">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
