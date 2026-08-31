import "../styles/features.css";

function Features() {
  return (
    <section
      id="performance"
      className="features"
    >
      <div className="features__heading">
        <p>BUILT FOR PERFORMANCE</p>

        <h2>
          Power meets precision.
        </h2>
      </div>

      <div className="features__grid">
        <article>
          <strong>707</strong>
          <span>Horsepower</span>
        </article>

        <article>
          <strong>3.4s</strong>
          <span>0–60 MPH</span>
        </article>

        <article>
          <strong>200+</strong>
          <span>MPH Top Speed</span>
        </article>
      </div>
    </section>
  );
}

export default Features;