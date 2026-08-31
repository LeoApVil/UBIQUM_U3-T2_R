import { addScheduleTimes } from '../components/logic/ScheduleProcess';

export const apiFetch = (urlPet, process) => {
  return fetch(urlPet)
    .then(async response => {

      if (!response.ok) {
        throw new Error("No se ha podido realizar la petición");
      }

      const data = await response.json();

      if (!process) {
        return data;
      }

      return addScheduleTimes(data);
    });
};