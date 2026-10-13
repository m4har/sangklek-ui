import * as React from "react"
import { ArrowDownToLine, Github, MessageCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Frame, Eyebrow } from "@/components/ui/section"

type HeroProps = {
  index?: string
  eyebrowLabel?: string
  eyebrowMeta?: string
  title: React.ReactNode
  accent?: React.ReactNode
  lead: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string; icon?: "discord" | "github" }
  note?: React.ReactNode
  aside?: React.ReactNode
  className?: string
}

/** Landing hero: display headline, lead, CTA row, HUD eyebrow. */
function Hero({
  index = "01",
  eyebrowLabel = "Overview",
  eyebrowMeta,
  title,
  accent,
  lead,
  primaryCta,
  secondaryCta,
  note,
  aside,
  className,
}: HeroProps) {
  return (
    <Frame className={className} aria-labelledby="hero-title">
      <Eyebrow index={index} label={eyebrowLabel} meta={eyebrowMeta} />
      <div className="px-6 py-14 md:px-10 md:py-20 xl:flex xl:items-center xl:justify-between xl:gap-12">
        <div className="min-w-0">
          <h1
            id="hero-title"
            className="max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl"
          >
            {title}{" "}
            {accent ? <span className="whitespace-nowrap text-accent-foreground">{accent}</span> : null}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{lead}</p>
          <div className="mt-8 flex flex-wrap items-start gap-3">
            <Button asChild>
              <a href={primaryCta.href}>
                <ArrowDownToLine />
                {primaryCta.label}
              </a>
            </Button>
            {secondaryCta ? (
              <Button asChild variant="outline">
                <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer">
                  {secondaryCta.icon === "github" ? <Github /> : <MessageCircle />}
                  {secondaryCta.label}
                </a>
              </Button>
            ) : null}
          </div>
          {note ? <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{note}</p> : null}
        </div>
        {aside ? <div className="mt-12 xl:mt-0 xl:shrink-0">{aside}</div> : null}
      </div>
    </Frame>
  )
}

export { Hero }
export type { HeroProps }
