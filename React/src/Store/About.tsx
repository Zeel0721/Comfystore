export default function About() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl mt-20 about-header">
          We love{" "}
          <span className="text-5xl py-1.5 px-2.5 rounded-3xl app-logo">
            Comfy
          </span>
        </h1>
        <p className="text-center mt-10 text-xl about-description-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae
          quam blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia
          optio aut! Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo
          sed officiis ea tempore! Similique eos minima sit porro, ratione
          aspernatur!
        </p>
      </div>
    </div>
  );
}
