"use client"

import { useEffect, useRef } from 'react'

export function MapSection() {
  const iframeRef = useRef(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleMessage = (event) => {
      // Verifica se a mensagem vem do iframe esperado
      const expectedOrigin = 'https://public-issue-prhpjsx35-daniloctms-projects.vercel.app'
      if (event.origin !== expectedOrigin) return
      
      console.log('Mensagem do iframe:', event.data)
      
      if (event.data.type === 'mapReady') {
        // Enviar comandos para o mapa com a origem correta
        iframe.contentWindow.postMessage({
          action: 'centerMap',
          coordinates: { lat: -10.7942, lng: -47.8822 }
        }, expectedOrigin) // Use a mesma origem aqui
      }
    }

    window.addEventListener('message', handleMessage)

    // Enviar mensagem após um pequeno delay para garantir que o iframe está pronto
    const timer = setTimeout(() => {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          action: 'centerMap',
          coordinates: { lat: -10.7942, lng: -47.8822 }
        }, 'https://public-issue-prhpjsx35-daniloctms-projects.vercel.app')
      }
    }, 2000)

    return () => {
      window.removeEventListener('message', handleMessage)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        src="https://public-issue-prhpjsx35-daniloctms-projects.vercel.app/generate_map"
        className="w-full h-full border-0"
        title="Mapa Interativo"
        allow="geolocation"
        sandbox="allow-scripts allow-same-origin allow-forms"
        onLoad={() => {
          // Enviar mensagem quando o iframe carregar
          if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
              action: 'centerMap',
              coordinates: { lat: -10.7942, lng: -47.8822 }
            }, 'https://public-issue-prhpjsx35-daniloctms-projects.vercel.app')
          }
        }}
      />
    </div>
  )
}