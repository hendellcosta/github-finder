/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import Search from "../components/Search";
import { UserProps } from "../types/user";
import User from '../components/User'
import Error from '../components/Error'

function Home() {
  const [user, setUser] = useState<UserProps | null>(null); // user type can be UserProps or null, but will start as null
  const [error, setError] = useState(false);

  const loadUser = async (userName: string) => {
    setError(false);
    setUser(null);

    const res = await fetch(`https://api.github.com/users/${userName}`); // request to github api

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    if (res.status === 404) {
      setError(true);
      return;
    }

    const {avatar_url, login, location, followers, following} = data; // it gets avatar_url... from the api (data)

    const userData: UserProps = { // get all user data (from the const above) and set it to UserProps type
      avatar_url,
      login,
      location,
      followers,
      following
    };

    setUser(userData) // it says that user has userData data

    console.log(data);
  };

  return (
    <div>
      <Search loadUser={loadUser} />{" "}
      {/* the loadUser that will be used on the <Search /> is the one declared here */}

      {user && <User {...user} />} {/* it will get the params from the useState*/}
      {error && <Error />}
    </div>
  );
}

export default Home;
