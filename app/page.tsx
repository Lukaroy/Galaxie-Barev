"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import Loading from "@/app/loading"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return <Loading />
  }

  return (
    <div className="home-container">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
      <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.8, 
            type: "spring",
            stiffness: 100,
            damping: 15
        }}
      >
  <img src="/Logo.svg" alt="Logo" width={120} height={120} />
</motion.div>

        <div className="hero-heading">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            GALAXIE BAREV
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Designové studio
          </motion.p>
        </div>

        <motion.div 
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>Tvořit dobrý design není snadné. A to je v pořádku.</p>
          <p>Máme nástroje, které ti pomůžou dostat tvé nápady na další úroveň.</p>
        </motion.div>

        <motion.div 
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {user ? (
            <motion.button
              className="cta-primary"
              onClick={() => router.push("/barvy")}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              Začít tvořit
            </motion.button>
          ) : (
            <>
              <motion.button
                className="cta-primary"
                onClick={() => router.push("/registrace")}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                Vytvořit účet
              </motion.button>
              <motion.button
                className="cta-secondary"
                onClick={() => router.push("/prihlaseni")}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                Přihlásit se
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
