import "../styles/models.css";

const models = [
  {
    id: 1,
    name: "Velocity GT",
    type: "Performance",
  },
  {
    id: 2,
    name: "Velocity RS",
    type: "Track",
  },
  {
    id: 3,
    name: "Velocity X",
    type: "Electric",
  },
];

function Models() {
  return (
    <section id="models" className="models">
      <div className="models__heading">
        <p>OUR VEHICLES</p>
        <h2>Choose your machine.</h2>
      </div>

      <div className="models__grid">
        {models.map((model) => (
          <article
            className="model-card"
            key={model.id}
          >
            <span>{model.type}</span>
            <h3>{model.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Models;