import { useRef, useState } from "react";

interface MagnifierProps {
  src: string;
  alt: string;
  zoom?: number;
}

const Magnifier: React.FC<MagnifierProps> = ({ src, alt, zoom = 2 }) => {
  const [magnifierStyle, setMagnifierStyle] = useState<React.CSSProperties>({});
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    if (x > 0 && x < width && y > 0 && y < height) {
      setMagnifierStyle({
        display: "block",
        left: `${x}px`,
        top: `${y}px`,
        backgroundPosition: `-${x * zoom - 50}px -${y * zoom - 50}px`,
        backgroundImage: `url(${src})`,
        backgroundSize: `${width * zoom}px ${height * zoom}px`,
      });
    } else {
      setMagnifierStyle({ display: "none" });
    }
  };

  return (
    <div className="relative">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMagnifierStyle({ display: "none" })}
        className="w-full h-auto object-cover rounded-lg shadow-md"
      />
      <div
        className="magnifier absolute rounded-full border-2 border-gray-400"
        style={magnifierStyle}
      ></div>
      <style>{`
        .magnifier {
          width: 100px;
          height: 100px;
          pointer-events: none;
          display: none;
          transform: translate(-50%, -50%);
          border: 2px solid #d17842;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};
export default Magnifier;
