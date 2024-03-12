import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();

  const date = new Date();
  const today = new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "long",
    timeStyle: "medium",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Witaj {username}!</h1>

      <p>&nbsp;</p>

      <p>
        <Link to="/dash/notes">Wyświetl listę zadań</Link>
      </p>

      <p>
        <Link to="/dash/notes/new">Dodaj nowe zadanie</Link>
      </p>

      <p>&nbsp;</p>

      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users">Wyświetl listę pracowników</Link>
        </p>
      )}

      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users/new">Dodaj nowego pracownika</Link>
        </p>
      )}

      <p>&nbsp;</p>

      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/dashboard/panel">Przejdź do dashboardu</Link>
        </p>
      )}
    </section>
  );

  return content;
};
export default Welcome;
