
export function getClimate(locationSearch) {
        const url = `https://api.weatherapi.com/v1/current.json?key=483e3f9376af40e7ac0110646232806&q=${locationSearch}`;
        return fetch(url).then((res) => res.json());
      }