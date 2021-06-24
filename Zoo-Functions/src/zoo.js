/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((speciesId) => ids.some((id) => id === speciesId.id));
}

function getAnimalsOlderThan(animal, age) {
  const filteredSpecies = species.filter((sp) => sp.name === animal)[0].residents;
  return filteredSpecies.every((ele) => ele.age > age);
}

function getEmployeeByName(employeeName) {
  const find = (ele) => ele.firstName === employeeName || ele.lastName === employeeName;
  return (employeeName === undefined) ? {} : employees.find(find);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.filter((func) => func.managers.length === 1).some((name) => name.id === id);
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  const obj = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(obj);
}

function countAnimals(speciesItem) {
  const reduceFunction = () => species.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});
  const filterLength = () => species.filter((el) => el.name === speciesItem)[0].residents.length;
  return (speciesItem === undefined) ? reduceFunction() : filterLength();
}

function calculateEntry(entrants = {}) {
  const value = [];
  const price = Object.entries(prices);
  const entries = Object.entries(entrants);
  entries.forEach((entr) => price.forEach((pric) => {
    const result = (entr[0] === pric[0]) ? value.push(entr[1] * pric[1]) : null;
    return result;
  }));
  return value.reduce((acc, curr) => acc + curr, 0);
}

const getAnimals = (residents, sex, sorted) => {
  const animals = residents.reduce((acc, curr) => {
    const res = (sex && curr.sex !== sex) ? acc : acc.concat(curr.name);
    return res;
  }, []);
  return (sorted) ? animals.sort() : animals;
};

function getAnimalMap(options = {}) {
  const object = { NE: [], NW: [], SE: [], SW: [] };
  species.forEach((el) => {
    if (options.includeNames) {
      object[el.location].push({ [el.name]: getAnimals(el.residents, options.sex, options.sorted) });
    } else {
      object[el.location].push(el.name);
    }
  });
  return object;
}

const clockCalc = (receivedHour) => {
  const hour = (receivedHour > 12) ? receivedHour - 12 : receivedHour;
  return hour;
};

const scheduleReduce = (acc, curr) => {
  acc[curr[0]] = `Open from ${curr[1].open}am until ${clockCalc(curr[1].close)}pm`;
  const monday = (curr[0] === 'Monday') ? acc[curr[0]] = 'CLOSED' : null;
  return acc;
};

function getSchedule(dayName) {
  const days = Object.entries(hours);
  const getDays = () => days.reduce(scheduleReduce, {});
  const getDay = () => {
    const result = {};
    const getDayEntries = Object.entries(hours);
    const hour = getDayEntries.find((day) => day[0] === dayName)[1];
    result[dayName] = `Open from ${hour.open}am until ${clockCalc(hour.close)}pm`;
    const monday = (hour.open === 0) ? result[dayName] = 'CLOSED' : result;
    return result;
  };
  return (dayName === undefined) ? getDays() : getDay();
}

function getOldestFromFirstSpecies(id) {
  const getAnimalId = employees.filter((employee) => employee.id === id)[0].responsibleFor[0];
  const getSpecies = species.filter((animal) => animal.id === getAnimalId)[0].residents;
  let max = getSpecies[0].age;
  getSpecies.forEach((specie) => {
    const calc = specie.age > max ? max = specie.age : null;
  });
  const result = getSpecies.filter((specie) => specie.age === max);
  return [result[0].name, result[0].sex, result[0].age];
}

function increasePrices(percentage) {
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    prices[key] = Math.round((prices[key] * ((percentage / 100) + 1)) * 100) / 100;
  });
}

function getSingleEmployeeCoverage(idOrName) {
  const getEmployee = employees.find((pers) => idOrName === pers.id || idOrName === pers.firstName || idOrName === pers.lastName);
  const fullName = `${getEmployee.firstName} ${getEmployee.lastName}`;
  const animals = [];
  const getAnimal = getEmployee.responsibleFor.forEach((id) => animals.push(species.find((anim) => id === anim.id).name));
  return { [fullName]: animals };
}

function getEmployeeCoverage(idOrName) {
  const getCoverage = () => employees.reduce((acc, empl) => Object.assign(acc, getSingleEmployeeCoverage(empl.id)), {});
  return (idOrName === undefined) ? getCoverage() : getSingleEmployeeCoverage(idOrName);
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
