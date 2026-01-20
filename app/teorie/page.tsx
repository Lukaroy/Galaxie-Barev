"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'

type Segment = {
  id: number
  title: string
  slug: string
  description?: string
  tags: string[]
}

interface Props {
  segments?: Segment[] // uděláme optional pro safety
}

export default function SegmentsList({ segments = [] }: Props) {
  return (
    <div style={{ padding: "8rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Nadpis a úvod */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "3rem", textAlign: "center" }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "0.5rem", color: "white", letterSpacing: "-0.02em" }}>
            Designová teorie
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255, 255, 255, 0.6)", fontWeight: "400", maxWidth: "700px", margin: "0 auto" }}>
            Základní principy a pravidla, která musí znát každý designer. Od barev přes typografii až po přístupnost.
          </p>
        </motion.div>

        {/* Seznam segmentů */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {segments.length === 0 ? (
            <p style={{ color: "white" }}>Žádné segmenty k zobrazení</p>
          ) : (
            segments.map((segment, index) => (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                style={{
                  background: "rgba(59, 54, 77, 0.3)",
                  border: "1px solid rgba(152, 114, 199, 0.3)",
                  borderRadius: "0.8rem",
                  padding: "2rem",
                  transition: "border-color 0.2s",
                  backdropFilter: "blur(10px)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "60px",
                    height: "60px",
                    borderRadius: "1rem",
                    background: "linear-gradient(135deg, #9872C7, #9872C7dd)",
                    flexShrink: 0
                  }}></div>
                  <h2 style={{ fontSize: "1.75rem", fontWeight: "600", color: "white", letterSpacing: "-0.01em" }}>
                    <Link href={`/teorie/${segment.slug}`} style={{ textDecoration: "none", color: "white" }}>
                      {segment.title}
                    </Link>
                  </h2>
                </div>

                {segment.description && (
                  <p style={{ fontSize: "1rem", color: "rgba(255, 255, 255, 0.7)", lineHeight: "1.7", margin: 0 }}>
                    {segment.description}
                  </p>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
