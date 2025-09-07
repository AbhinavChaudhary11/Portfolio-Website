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
    const { left, top, width, height } = itemRef.current.getBoundingClientRect()

    const relativeX = (event.clientX - left) / width
    const relativeY = (event.clientY - top) / height

    const tiltX = (relativeY - 0.5) * 12
    const tiltY = (relativeX - 0.5) * -12

    const newTransform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
    setTransformStyle(newTransform)
  }

  const handleMouseLeave = () => setTransformStyle("")

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

// Project Card (title removed from inside)
export const BentoCard = ({ src, link }) => {
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
    if (link === window.location.origin) {
      window.location.reload()
    } else {
      window.open(link, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="relative w-[40rem] h-[25rem] md:w-[46rem] md:h-[28rem] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg">
      <img
        src={src}
        alt=""
        className="absolute left-0 top-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col justify-end h-full w-full p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
        <button
          onClick={handleClick}
          className="border-hsla relative flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-black px-6 py-2 text-xs uppercase text-white/70"
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
  const cardsRef = useRef([])

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // heading animations
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

    // horizontal scroll cards
    gsap.to(".cards-wrapper", {
      xPercent: -100 * (cardsRef.current.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current, // pin whole section
        pin: true,
        scrub: 1,
        snap: 1 / (cardsRef.current.length - 1),
        start: "top top",
        end: () => "+=" + document.querySelector(".cards-wrapper").offsetWidth,
      },
    })
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#f6f6f6] py-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
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
      </div>

      {/* Cards scroll horizontally */}
      <div className="cards-scroll-section relative overflow-hidden">
        <div className="cards-wrapper flex">
          {projectImages.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="flex-shrink-0 w-full flex flex-col items-center gap-6"
            >
              <BentoTilt>
                <BentoCard src={project.imageSrc} link={project.link} />
              </BentoTilt>
              {/* Title outside card */}
              <h2 className="text-2xl md:text-3xl font-bold text-black text-center">
                {project.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
