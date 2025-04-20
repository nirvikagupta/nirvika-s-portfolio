import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Box } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  details: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Angry Birds Game",
    description: "Currently developing a fully functional Angry Birds-style game with a Team Size-2 static GUI already implemented.",
    details: `View it <a href="https://github.com/anika23086/AngryBirds-AP-Project.git" target="_blank" rel="noopener noreferrer">on GitHub</a>.`
  },
  {
    id: 2,
    title: "Byte Me System",
    description: "Developed a CLI-based system to manage food ordering and tracking Individual using Java and Collection Frameworks.",
    details: `View it <a href="https://github.com/nirvikagupta/Canteen-Management.git" target="_blank" rel="noopener noreferrer">on GitHub</a>.`
  },
  {
    id: 3,
    title: "Flight System: Falcon",
    description: "Developed a website (front and back end) which manages flight bookings and travel through database interconection.",
    details: `View it <a href="https://github.com/Jaitrika/Falcon_DBMS_project.git" target="_blank" rel="noopener noreferrer">on GitHub</a>.`
  },
  {
    id: 4,
    title: "Research on Password Security",
    description: "Explored how varying restrictions on passwords impact their security strength, using entropy and cracking time analysis to propose effective password guidelines.",
    details: `View it <a href="https://docs.google.com/document/d/1E9rwQAPjJ7n4JiD68tkXRpwAy7cF3pVnDx3kxAsPEfs/edit?tab=t.0" target="_blank" rel="noopener noreferrer">on Drive</a>.`
  },
  {
    id: 5,
    title: "Food Service",
    description: "Developed a website (front and back end) which manages flight bookings and travel through database interconection.",
    details: `View it <a href="https://github.com/nirvikagupta/ERP-System.git" target="_blank" rel="noopener noreferrer">on GitHub</a>.`
  },
  {
    id: 6,
    title: "Research and Book on Gender Inequality",
    description: "Wrote a book exploring the significance of feminism, addressing socioeconomic factors, gender stereotypes, and transformative feminist movements, while highlighting strong women worldwide and providing comprehensive citations for further research. I focused on the underlying problems and how technology plays a role in it",
    details: `View it <a href="https://docs.google.com/document/d/1vunpcN_2Bn42kIVevaYOZFDXUStBsIklGHKHa37mf9I/edit?usp=sharing" target="_blank" rel="noopener noreferrer">on Drive</a>.`
  },
];

const ProjectsSection: React.FC = () => {
  const [tilt, setTilt] = useState<{ [key: number]: { rotateX: number, rotateY: number } }>({});
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});

  // Play the card flip sound
  const playCardFlipSound = () => {
    const audio = new Audio('/cardflip.mp3');
    audio.play();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    if (flipped[id]) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt((prev) => ({
      ...prev,
      [id]: { rotateX, rotateY }
    }));
  };

  const handleMouseLeave = (id: number) => {
    setTilt((prev) => ({
      ...prev,
      [id]: { rotateX: 0, rotateY: 0 }
    }));
  };

  const handleClick = (id: number) => {
    // Play the card flip sound on click
    playCardFlipSound();

    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getImageById = (id: number) => {
    switch (id) {
      case 1: return "angrybirds.png";
      case 2: return "byteme.png";
      case 3: return "falcon.png";
      case 4: return "pw.png";
      case 5: return "canteen.png";
      case 6: return "genderequal.png";
      default: return "";
    }
  };

  return (
    <section id="projects" className="py-20 bg-pink-200 min-h-screen">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
        </div>

        {/* Horizontal scroll wrapper */}
        <div className="overflow-x-auto flex gap-8 py-4">
          {projects.map((project) => {
            const { rotateX, rotateY } = tilt[project.id] || { rotateX: 0, rotateY: 0 };
            const isFlipped = flipped[project.id] || false;
            const image = getImageById(project.id);

            return (
              <div
                key={project.id}
                onMouseMove={(e) => handleMouseMove(e, project.id)}
                onMouseLeave={() => handleMouseLeave(project.id)}
                onClick={() => handleClick(project.id)}
                className="cursor-pointer flex-shrink-0"
                style={{
                  width: '270px',
                  height: '400px',
                  perspective: '1000px',
                }}
              >
                <div
                  className="w-full h-full transition-all duration-300 ease-out"
                  style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div 
                    className="relative w-full h-full transition-transform duration-500"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Front Side */}
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                      }}
                    >
                      {image ? (
                        <>
                        <Card
                          className="w-full h-full bg-cover bg-center rounded-2xl shadow-xl"
                          style={{
                            backgroundImage: `url("/${image}")`
                          }}
                        />
                        <div className="absolute inset-0 z-10 pointer-events-none">
                          <div className="absolute top-3 left-3 animate-float-slow text-yellow-400 text-xs">✨</div>
                          <div className="absolute bottom-4 right-4 animate-float text-pink-400 text-sm">★</div>
                        </div>
                      </>
                      ) : (
                        <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl rounded-2xl h-full transition-all">
                          <CardHeader>
                            <CardTitle className="text-xl font-bold text-gray-800">{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="relative h-32 rounded-lg overflow-hidden">
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-300">
                                <Box className="h-16 w-16 text-purple-700" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Back Side */}
                    <div 
                      className="absolute inset-0 w-full h-full" 
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <Card className="bg-[#fff5ec] text-[#b84c65] p-6 rounded-2xl h-full flex flex-col justify-center">
                        <CardTitle className="text-xl mb-3">{project.title}</CardTitle>
                        <CardDescription className="text-[#b84c65]/90 mb-2">{project.description}</CardDescription>
                        <p
                          className="text-sm text-[#b84c65]/80 [&_a]:underline [&_a:hover]:text-[#d23b60] [&_a]:transition-colors"
                          dangerouslySetInnerHTML={{ __html: project.details }}
                        />
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;