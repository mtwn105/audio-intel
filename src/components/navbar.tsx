import { Brain, Menu } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
const Navbar1 = () => {
  return (
    <>
      <nav className="hidden p-4 justify-between md:flex">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Brain className="size-6" />
            <span className="text-xl font-bold">AudioIntel</span>
          </div>
          <div className="flex items-center">
            <Link
              className={cn(
                "text-muted-foreground",
                navigationMenuTriggerStyle,
                buttonVariants({
                  variant: "ghost",
                })
              )}
              href="/"
            >
              Home
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          {/* <Button variant={"outline"}>Log in</Button>
          <Button>Sign up</Button> */}
        </div>
      </nav>
      <div className="block p-4 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="size-6" />
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
                <Link href="/" className="font-semibold">
                  Home
                </Link>
              </div>
              <div className="border-t pt-4">
                {/* <div className="mt-2 flex flex-col gap-3">
                  <Button variant={"outline"}>Log in</Button>
                  <Button>Sign up</Button>
                </div> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default Navbar1;
