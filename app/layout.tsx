import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nirmaan | Hackathon 2026",
  description: "A design-led hackathon for builders, mentors, sponsors, and campus communities.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className="theme-light" suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                var clean = function(node) {
                  if (node && node.removeAttribute) {
                    if (node.hasAttribute('bis_skin_checked')) node.removeAttribute('bis_skin_checked');
                    if (node.hasAttribute('bis_frame_id')) node.removeAttribute('bis_frame_id');
                  }
                };
                document.querySelectorAll('[bis_skin_checked], [bis_frame_id]').forEach(clean);
                var observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(m) {
                    if (m.type === 'attributes' && (m.attributeName === 'bis_skin_checked' || m.attributeName === 'bis_frame_id')) {
                      clean(m.target);
                    } else if (m.type === 'childList') {
                      m.addedNodes.forEach(function(n) {
                        clean(n);
                        if (n.querySelectorAll) n.querySelectorAll('[bis_skin_checked], [bis_frame_id]').forEach(clean);
                      });
                    }
                  });
                });
                observer.observe(document.documentElement, { attributes: true, subtree: true, childList: true });
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
