import {setAllPronouns, setNomPronouns, setRefPronouns} from './ducks/pronouns';
import {setAllNouns} from './ducks/nouns';
import {setAllAdjectives} from './ducks/adjectives'
import store from './store';


//Calculate pronoun stuff

const mascPronouns = ['he','him','his','himself']

const femPronouns = ['she','her','herself', 'hers']

export const sumPronouns = (obj) => {
  let total = 0, masc = 0, fem = 0;
  for (let key in obj) {
    if (femPronouns.indexOf(key) > -1) fem += obj[key];
    if (mascPronouns.indexOf(key) > -1) masc += obj[key];
  }
  total = fem + masc;
  return {total, masc, fem};
}

export const nomPronouns = (obj) => {
  let total = 0, masc = 0, fem = 0;
  if (obj) {
    fem = obj.she || 0;
    masc = obj.he || 0;
  }
  total = fem + masc;
  return {total, masc, fem};
}

export const refPronouns = (obj) => {
  let total = 0, masc = 0, fem = 0;
  if (obj) {
    fem = obj.herself || 0;
    masc = obj.himself || 0;
  }
  total = fem + masc;
  return {total, masc, fem};
}

//Calculate Noun stuff
const femNouns = ['woman', 'women', 'womens', 'girl', 'girls', 'girl\'s', 'wife', 'sister', 'mother']
const mascNouns = ['man', 'men', 'mens', 'boy', 'boys', 'boy\'s', 'husband', 'brother', 'father']

export const sumNouns = (obj) => {
  let total = 0, masc = 0, fem = 0;
  for (let key in obj) {
    if (femNouns.indexOf(key) > -1) fem += obj[key];
    if (mascNouns.indexOf(key) > -1) masc += obj[key];
  }
  total = fem + masc;
  return {total, masc, fem};
}   

export default (dataObj) => {
  const pronNum = sumPronouns(dataObj.pronouns);
  store.dispatch(setAllPronouns(pronNum));
  const nomPron = nomPronouns(dataObj.pronouns);
  store.dispatch(setNomPronouns(nomPron));
  const refPron = refPronouns(dataObj.pronouns);
  store.dispatch(setRefPronouns(refPron));
  const allPron = sumNouns(dataObj.nouns);
  store.dispatch(setAllNouns(allPron));
  store.dispatch(setAllAdjectives(dataObj.adjectives))
}