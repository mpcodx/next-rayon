"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

export default function ThirdPartyScripts() {
  const [loadScripts, setLoadScripts] = useState(false)

  useEffect(() => {
    let timerId: NodeJS.Timeout
    let loaded = false

    const triggerLoading = () => {
      if (loaded) return
      loaded = true
      setLoadScripts(true)

      // Clean up event listeners
      window.removeEventListener("scroll", triggerLoading)
      window.removeEventListener("mousemove", triggerLoading)
      window.removeEventListener("touchstart", triggerLoading)
      window.removeEventListener("keydown", triggerLoading)
      window.removeEventListener("click", triggerLoading)

      if (timerId) clearTimeout(timerId)
    }

    // Set a timeout of 3.5 seconds to load them anyway if the user doesn't interact
    timerId = setTimeout(triggerLoading, 3500)

    // Listen to user interactions
    window.addEventListener("scroll", triggerLoading, { passive: true })
    window.addEventListener("mousemove", triggerLoading, { passive: true })
    window.addEventListener("touchstart", triggerLoading, { passive: true })
    window.addEventListener("keydown", triggerLoading, { passive: true })
    window.addEventListener("click", triggerLoading, { passive: true })

    return () => {
      if (timerId) clearTimeout(timerId)
      window.removeEventListener("scroll", triggerLoading)
      window.removeEventListener("mousemove", triggerLoading)
      window.removeEventListener("touchstart", triggerLoading)
      window.removeEventListener("keydown", triggerLoading)
      window.removeEventListener("click", triggerLoading)
    }
  }, [])

  if (!loadScripts) return null

  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-68457LHBSZ"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-68457LHBSZ');
          `,
        }}
      />

      {/* Facebook Pixel */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '23863632866572138');
            fbq('track', 'PageView');
          `,
        }}
      />
    </>
  )
}
