import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import CustomCursor from './components/CustomCursor'
import About from './components/About'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import ContactForm from './components/ContactForm' // import modal component

const App = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const openContactForm = () => setContactFormOpen(true)
  const closeContactForm = () => setContactFormOpen(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <Header 
        openContactForm={openContactForm}  
      />
      <HeroSection id="home" />
      <CustomCursor/>
      <About id="about" />
      <ProjectsSection id="projects" />
      <ContactSection id="contact" openContactForm={openContactForm} />

      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={closeContactForm} 
      />
    </>
  )
}

export default App
