import { Route, Routes } from "react-router-dom"
import { Navbar, Footer } from "@/components/ui/navbar"
import { Rule } from "@/components/ui/rule"
import { RuleRail } from "@/components/ui/rule-rail"
import LandingPage from "@/pages/LandingPage"
import ContactPage from "@/pages/ContactPage"
import CmsPage from "@/pages/CmsPage"
import DashboardPage from "@/pages/DashboardPage"
import DocsPage from "@/pages/DocsPage"
import NotFound from "@/pages/NotFound"
import { NAV_ITEMS, FOOTER_COLUMNS, RULE } from "@/lib/site"

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Routes>
        {/* CMS & dashboard use their own shell; landing/contact share the public chrome. */}
        <Route
          path="/cms/*"
          element={<CmsPage />}
        />
        <Route
          path="/admin/*"
          element={<DashboardPage />}
        />
        <Route
          path="*"
          element={
            <>
              <Navbar brand="Craft" items={NAV_ITEMS} />
              {RULE.enabled ? (
                <div className="sticky top-12 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
                  <Rule unit={RULE.unit} trackCursor scrollTarget="self" className="mx-auto w-full max-w-[1280px] border-x border-border" />
                </div>
              ) : null}
              {RULE.enabled && RULE.vertical ? <RuleRail side="right" unit={RULE.unit} topOffset={49} trackCursor /> : null}
              <div className="flex flex-1">
                <main className="min-w-0 flex-1">
                  <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="docs" element={<DocsPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
              <Footer brand="Craft" columns={FOOTER_COLUMNS} note="Built with the ArtCraft design language." />
            </>
          }
        />
      </Routes>
    </div>
  )
}
