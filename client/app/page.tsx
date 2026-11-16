
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  FolderGit2,
  Database,
  MessageSquareText,
  Check,
  Code2,
  Search,
  FileCode2,
  Command,
} from "lucide-react";

import { BrandMark } from "@/components/layout/app-shell";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getGithubLoginUrl } from "@/lib/api";

const features = [
  {
    icon: FolderGit2,
    number: "01",
    title: "Connect your repositories",
    description:
      "Connect your GitHub account and bring your public or private repositories into one workspace.",
  },
  {
    icon: Database,
    number: "02",
    title: "Build contextual knowledge",
    description:
      "MyPilot chunks, embeds, and indexes your code using RAG and PostgreSQL with pgvector.",
  },
  {
    icon: MessageSquareText,
    number: "03",
    title: "Understand your code",
    description:
      "Ask questions in natural language and get answers grounded in your actual source code.",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-[-150px] top-[450px] h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-[110px]" />
      </div>

      {/* Navigation */}
      <header className="relative z-10 mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <BrandMark />

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="#features" className="transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#how-it-works" className="transition-colors hover:text-foreground">
            How it works
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Sign in
          </Link>
          <a
            href={getGithubLoginUrl()}
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Get started <ArrowUpRight className="ml-1 size-4" />
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-2 lg:gap-12 lg:pb-32 lg:pt-24">
          {/* Hero copy */}
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              Your AI-powered codebase companion
            </div>

            <h1 className="font-heading text-5xl font-semibold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Your codebase,
              <span className="block bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">
                finally understood.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
              Stop digging through files and searching endless documentation.
              Connect your GitHub repositories and let AI help you understand
              your code, one question at a time.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={getGithubLoginUrl()}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 gap-2 px-6 shadow-lg shadow-primary/20"
                )}
              >
                Connect GitHub
                <ArrowRight className="size-4" />
              </a>

              <Link
                href="#how-it-works"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-6"
                )}
              >
                Explore the workflow
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <Check className="size-3.5 text-primary" />
                GitHub integration
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-3.5 text-primary" />
                Context-aware answers
              </span>
              <span className="flex items-center gap-2">
                <Check className="size-3.5 text-primary" />
                Source citations
              </span>
            </div>
          </div>

          {/* Product preview */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/20 via-violet-500/10 to-transparent blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/10">
              {/* Window header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-400" />
                    <span className="size-2.5 rounded-full bg-yellow-400" />
                    <span className="size-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="ml-3 text-xs text-muted-foreground">
                    MyPilot Workspace
                  </span>
                </div>
                <Command className="size-4 text-muted-foreground" />
              </div>

              {/* Workspace content */}
              <div className="grid min-h-[390px] grid-cols-[115px_1fr] sm:grid-cols-[145px_1fr]">
                {/* Sidebar */}
                <aside className="border-r border-border bg-muted/30 p-3">
                  <div className="mb-6 flex items-center gap-2 text-xs font-semibold">
                    <Code2 className="size-4 text-primary" />
                    Workspace
                  </div>

                  <div className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Repository
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-2 py-2 text-xs font-medium text-primary">
                    mypilot
                  </div>

                  <div className="mt-6 space-y-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FileCode2 className="size-3.5" />
                      Files
                    </div>
                    <div className="flex items-center gap-2">
                      <Search className="size-3.5" />
                      Search
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquareText className="size-3.5" />
                      AI Chat
                    </div>
                  </div>
                </aside>

                {/* Chat panel */}
                <div className="flex flex-col p-4 sm:p-5">
                  <div className="mb-5">
                    <div className="text-sm font-semibold">Ask your codebase</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      Repository: mypilot
                    </div>
                  </div>

                  <div className="ml-auto max-w-[90%] rounded-xl bg-primary px-3.5 py-3 text-xs leading-5 text-primary-foreground">
                    How does authentication work in this project?
                  </div>

                  <div className="mt-5 flex gap-2.5">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Sparkles className="size-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 text-xs font-semibold">
                        MyPilot AI
                      </div>
                      <p className="text-xs leading-5 text-muted-foreground">
                        Authentication is handled through Spring Security and
                        OAuth2. The application establishes a session after
                        successful GitHub sign-in.
                      </p>

                      <div className="mt-3 rounded-lg border border-border bg-muted/40 p-3">
                        <div className="mb-2 flex items-center gap-2 text-[10px] font-medium text-primary">
                          <FileCode2 className="size-3.5" />
                          Source reference
                        </div>
                        <div className="font-mono text-[10px] leading-5 text-muted-foreground">
                          <span className="text-primary">src/</span>
                          security/SecurityConfig.java
                          <br />
                          <span className="text-muted-foreground/60">
                            Lines 42–68
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input preview */}
                  <div className="mt-auto pt-8">
                    <div className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-3">
                      <span className="text-[11px] text-muted-foreground">
                        Ask anything about your code...
                      </span>
                      <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <ArrowRight className="size-3.5" />
                      </div>
                    </div>
                    <p className="mt-2 text-center text-[9px] text-muted-foreground">
                      AI answers grounded in your repository
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating status card */}
            <div className="absolute -bottom-6 -left-5 hidden items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-xl sm:flex">
              <div className="flex size-9 items-center justify-center rounded-lg bg-green-500/10">
                <Check className="size-5 text-green-500" />
              </div>
              <div>
                <div className="text-xs font-semibold">Knowledge indexed</div>
                <div className="text-[10px] text-muted-foreground">
                  Ready for AI-powered search
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature section */}
        <section id="features" className="border-y border-border bg-muted/20">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mx-auto mb-14 max-w-xl text-center">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Built for developers
              </div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Less searching. More understanding.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Everything you need to turn an unfamiliar repository into
                something you can confidently navigate.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.number}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        / {feature.number}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-14">
            <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-6" />
            </div>

            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Get to know your codebase.
              <span className="block text-muted-foreground">
                Without the guesswork.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-muted-foreground">
              Connect GitHub, index your repository, and start asking
              meaningful questions about the code you work with every day.
            </p>

            <a
              href={getGithubLoginUrl()}
              className={cn(buttonVariants({ size: "lg" }), "mt-8 gap-2")}
            >
              Start with GitHub
              <ArrowRight className="size-4" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-7 sm:flex-row">
          <BrandMark />
          <p className="text-xs text-muted-foreground">
            Built for developers who want to understand more.
          </p>
          <span className="text-xs text-muted-foreground">
            © 2026 MyPilot
          </span>
        </div>
      </footer>
    </div>
  );
}
