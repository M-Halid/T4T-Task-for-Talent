import { Link } from "react-router-dom";
const GetStarted = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="carousel carousel-center max-w-4xl p-4 space-x-4 bg-neutral shadow-xl rounded-box">
        <div className="carousel-item">
          <div className="card w-96 glass">
            <figure>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full rounded-box"
              >
                <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </figure>
            <div className="card-body">
              <h2 className="card-title">Registriere dich</h2>
              <p>Einfache Anmeldung - Email, Passwort und los gehts</p>
              <div className="card-actions justify-end">
                <Link to="/signup">
                  <button className="btn btn-primary">registrieren</button>
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="carousel-item">
          <div className="card w-96 glass">
            <figure>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full rounded-box"
              >
                <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </figure>
            <div className="card-body">
              <h2 className="card-title">Profil anlegen</h2>
              <p>
                Erstelle dein Nutzerprofil innerhalb weniger Minuten. Alles auf
                einen Blick!
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card w-96 glass">
            <figure>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full rounded-box"
              >
                <path d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
              </svg>
            </figure>
            <div className="card-body">
              <h2 className="card-title">Talent Profil</h2>
              <p>
                {" "}
                Präsentiere dich und deine Talente um Aufträge zu ergattern,
                oder...
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card w-96 glass">
            <figure>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full rounded-box"
              >
                <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
              </svg>
            </figure>
            <div className="card-body">
              <h2 className="card-title">Tasks</h2>
              <p>
                ... erstelle Tasks auf die sich unsere Talents bewerben können
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card w-96 glass">
            <figure>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full rounded-box"
              >
                <path d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </figure>
            <div className="card-body">
              <h2 className="card-title">Finde was du suchst</h2>
              <p>ob Talent oder Task - hier findest du was du suchst</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card w-96 glass">
            <figure>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full rounded-box"
              >
                <path d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
              </svg>
            </figure>
            <div className="card-body">
              <h2 className="card-title">bestätige Aufträge</h2>
              <p>
                über freie Kommunikation ohne Restriktionen, wie und wo du
                willst
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card w-96 glass">
            <figure>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full rounded-box"
              >
                <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
              </svg>
            </figure>
            <div className="card-body">
              <h2 className="card-title">Bearbeitung</h2>
              <p>
                Warte ab bis dein Task erfüllt wird oder mach dich an die Arbeit
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card w-96 glass">
            <figure>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full rounded-box"
              >
                <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </figure>
            <div className="card-body">
              <h2 className="card-title">Erfüllung</h2>
              <p>ist die Bearbeitung gemäß der gestellten Kriterien erfolgt</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card w-96 glass">
            <figure>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full rounded-box"
              >
                <path d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
              </svg>
            </figure>
            <div className="card-body">
              <h2 className="card-title">Money maken</h2>
              <p>... werden beide Seiten profitieren</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
