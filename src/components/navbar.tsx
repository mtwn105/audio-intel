"use client";

import { Brain, Menu } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
const Navbar1 = () => {
  const { data, isPending } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden p-4 justify-between md:flex">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Brain className="size-6 text-primary" />
            <span className="text-xl font-bold">AudioIntel</span>
          </div>
          <div className="flex items-center">
            <Link
              className={cn(
                "text-muted-foreground",
                navigationMenuTriggerStyle,
                buttonVariants({
                  variant: "ghost",
                }),
                pathname === "/" && "text-primary"
              )}
              href="/"
            >
              Home
            </Link>
            {!isPending && data?.user && (
              <Link
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  }),
                  pathname === "/intels" && "text-primary"
                )}
                href="/intels"
              >
                Intels
              </Link>
            )}
            {!isPending && data?.user && (
              <Link
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  }),
                  pathname === "/app" && "text-primary"
                )}
                href="/app"
              >
                Generate
              </Link>
            )}
          </div>
        </div>
        {!isPending && (
          <div className="flex gap-2 items-center">
            {data?.user ? (
              <>
                <Avatar>
                  <AvatarImage src={data.user.image || ""} />
                  <AvatarFallback>{data.user.name[0]}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-semibold">{data.user.name}</p>
                <Button variant={"destructive"} onClick={() => signOut()}>
                  Log out
                </Button>
              </>
            ) : (
              <Button onClick={() => router.push("/sign-in")}>Sign in</Button>
            )}
          </div>
        )}
      </nav>
      <div className="block p-4 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="size-6 text-primary" />
            <span className="text-xl font-bold">AudioIntel</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center gap-2">
                    <Brain className="size-6" />
                    <span className="text-xl font-bold">AudioIntel</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="my-8 flex flex-col gap-4">
                <Link
                  href="/"
                  className={cn(
                    "font-semibold",
                    pathname === "/" && "text-primary"
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/intels"
                  className={cn(
                    "font-semibold",
                    pathname === "/intels" && "text-primary"
                  )}
                >
                  Intels
                </Link>
                <Link
                  href="/app"
                  className={cn(
                    "font-semibold",
                    pathname === "/app" && "text-primary"
                  )}
                >
                  Generate
                </Link>
              </div>
              <div className="border-t pt-4">
                {!isPending && (
                  <div className="flex gap-2 items-center">
                    {data?.user ? (
                      <>
                        <Avatar>
                          <AvatarImage src={data.user.image || ""} />
                          <AvatarFallback>{data.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-semibold">
                          {data.user.name}
                        </p>
                        <Button
                          variant={"destructive"}
                          onClick={async () => {
                            await signOut();
                            router.push("/sign-in");
                          }}
                        >
                          Log out
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => router.push("/sign-in")}>
                        Sign in
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default Navbar1;
