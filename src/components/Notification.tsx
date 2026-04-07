import { BlurryBackground } from './data-containers/BlurryBackground'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

const toastStyle = {
  padding: '.4rem',
  borderRadius: '1rem',
  background: 'var(--blur-bg-Layered)'
}

export const Notification = () => {
  return (
    <Toaster 
    position="top-center"
    reverseOrder={false}>
      {(t) => (
        <AnimatePresence>
          {t.visible && (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              {/* Здесь рендерится содержимое вашего тоста */}
              <BlurryBackground style={toastStyle}>{t.message as React.ReactNode}</BlurryBackground>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Toaster>
  )
}
