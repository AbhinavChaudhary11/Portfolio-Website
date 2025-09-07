import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TiLocationArrow } from "react-icons/ti"

// Tilt wrapper
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("")
  const itemRef = useRef(null)

  const handleMouseMove = (event) => {
    if (!itemRef.current) return

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect()

    const relativeX = (event.clientX - left) / width
    const relativeY = (event.clientY - top) / height

    // Increased tilt and scale for more movement
    const tiltX = (relativeY - 0.5) * 12  // was 6
    const tiltY = (relativeX - 0.5) * -12 // was -6

    const newTransform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)` // was 0.97
    setTransformStyle(newTransform)
  }

  const handleMouseLeave = () => {
    setTransformStyle("")
  }

  return (
    <div
      ref={itemRef}
      className={`transition-transform duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  )
}

// Project Card
export const BentoCard = ({ src, title, link }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [hoverOpacity, setHoverOpacity] = useState(0)
  const hoverButtonRef = useRef(null)

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return
    const rect = hoverButtonRef.current.getBoundingClientRect()

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => setHoverOpacity(1)
  const handleMouseLeave = () => setHoverOpacity(0)

  const handleClick = (e) => {
    e.preventDefault()

    // If link is same as current site, reload instead of opening new tab
    if (link === window.location.origin) {
      window.location.reload()
    } else {
      window.open(link, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="relative w-[30rem] h-[20rem] md:w-[34rem] md:h-[22rem] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg">
      <img
        src={src}
        alt={title}
        className="absolute left-0 top-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col justify-between h-full w-full p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
        {/* Title */}
        <h2 className="text-xl md:text-3xl font-bold flex items-center gap-2">
          {title}
        </h2>

        {/* Hover Button */}
        <button
          onClick={handleClick}
          className="border-hsla relative flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-black px-6 py-2 text-xs uppercase text-white/70 mt-4"
          ref={hoverButtonRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
            style={{
              opacity: hoverOpacity,
              background: `radial-gradient(120px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
            }}
          />
          <TiLocationArrow className="relative z-20" />
          <p className="relative z-20">View Project</p>
        </button>
      </div>
    </div>
  )
}

const ProjectsSection = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const titleLineRef = useRef(null)

  const projectImages = [
    {
      id: 1,
      title: "E-expence Tracker",
      imageSrc: "/images/project-1.png",
      link: "https://expense-tracker-two-kappa-60.vercel.app/login",
    },
    {
      id: 2,
      title: "3D Game Website",
      imageSrc: "/images/project-2.png",
      link: "https://game-website-bay.vercel.app/",
    },
    {
      id: 3,
      title: "3D Portfolio Website",
      imageSrc: "/images/project-3.png",
      link: window.location.origin,
    },
    {
      id: 4,
      title: "ResuMate",
      imageSrc: "/images/project-4.png",
      link: "https://ai-resume-analyzer-ruddy-nine.vercel.app/",
    },
    {
      id: 5,
      title: "Store Rating System",
      imageSrc: "/images/project-5.png",
      link: "",
    },
  ]

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      titleLineRef.current,
      { width: "0%", opacity: 0 },
      {
        width: "100%",
        opacity: 1,
        duration: 1.5,
        delay: 0.3,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, [])

  
  return (
    <section ref={sectionRef} className="bg-[#f6f6f6] py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 opacity-0"
          >
            Feature Projects
          </h2>
          <div
            ref={titleLineRef}
            className="w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full opacity-0"
          />
        </div>

        {/* Grid */}
        <div className="flex flex-wrap justify-center gap-10">
          {projectImages.map((project) => (
            <BentoTilt key={project.id}>
              <BentoCard
                src={project.imageSrc}
                title={project.title}
                link={project.link}
              />
            </BentoTilt>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
