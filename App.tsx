import React, { useEffect, useMemo, useState } from 'react';

type Profile = {
  name: string;
  id: number;
  visibility: string;
};

const Profile = () => {
  const [profile, setProfile] = useState<Profile[]>();
  const [pages, setPages] = useState(0);
  const [pageActual, setPageActual] = useState(0);
  const [totalRepos, setTotalRepos] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    async function getProfile() {
      const response = await (
        await fetch(`https://api.github.com/users/vitorferraz10/repos`)
      ).json();
      setTotalRepos(response.length);
      setProfile(response);
    }

    getProfile();
  }, []);

  const resultFilterPagination = useMemo(() => {
    setPages(Math.ceil(profile?.length / itemsPerPage));

    const starIndex = pageActual * itemsPerPage;
    const endIndex = starIndex + itemsPerPage;

    return profile?.slice(starIndex, endIndex);
  }, [profile, pageActual]);

  console.log(resultFilterPagination);

  return (
    <div>
      <h1>Repositórios da API do GitHub com Dinamic Routes do Next JS</h1>{' '}
      {pageActual >= 1 && (
        <button onClick={() => setPageActual(pageActual - 1)}>previous</button>
      )}
      {pageActual < pages - 1 && (
        <button onClick={() => setPageActual(pageActual + 1)}>next</button>
      )}
      <section>
        {profile &&
          resultFilterPagination.map((profile: Profile, i) => {
            return (
              <div key={i}>
                <h2>Repositorio {i + 1}</h2>
                <p>
                  <span>Nome :</span> {profile.name}
                </p>
                <p>
                  <span>Id :</span> {profile.id}
                </p>
                <p>
                  <span>Visibilidade:</span> {profile.visibility}
                </p>
              </div>
            );
          })}
      </section>
    </div>
  );
};

export default Profile;
