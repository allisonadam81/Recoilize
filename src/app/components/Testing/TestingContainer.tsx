/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

import Editor from './Editor';
import SelectorsButton from './SelectorsButton';
import { useAppSelector } from '../../state-management/hooks';
import './testing.css';
import { atom, selector } from 'recoil';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';


const Testing = () => {
  // retrieve snapshotHistory State from Redux Store
  const snapshotHistory = useAppSelector(state => state.snapshot.snapshotHistory);
  // const theObject = useAppSelector(selectAtomsAndSelectorsState);
  const { atomsAndSelectors: { atoms, selectors, $selectors } } = useAppSelector(state => state.atomsAndSelectors);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    console.log('in use effect 1');
    console.log('snapshot history', snapshotHistory);
  }, []);
  
  const [ currentAtom, setCurrentAtom ] = useState('');
  const [ currentAtomValue, setCurrentAtomValue ] = useState('');
  const [ toBeValue, setToBeValue ] = useState('');
  
  const [ parameters, setParameters ] = useState('');
  const [ madeSelectors, setMadeSelectors ] = useState({});
  const [ madeAtoms, setMadeAtoms ] = useState({});

  useEffect(() => {
    console.log('in use effect 2 ')

    const createdAtoms = {};
    snapshotHistory[snapshotHistory.length - 1].atomsAndSelectors.atoms.forEach(theAtom => {
      createdAtoms[theAtom] = atom({
        key: theAtom,
        default: snapshotHistory[snapshotHistory.length - 1].filteredSnapshot[theAtom].contents,
      });
    });
    setMadeAtoms(createdAtoms);
  }, []);

  useEffect(() => {
    let selectorsClone = JSON.parse(JSON.stringify($selectors));
    const createdSelectors = {};
  
    selectors.forEach(selectorKey => {
      if (selectorsClone[selectorKey].set) {
        selectorsClone[selectorKey].set = selectorsClone[selectorKey].set.replaceAll('get(', 'get(madeAtoms.');
        selectorsClone[selectorKey].set = selectorsClone[selectorKey].set.replaceAll('set(', 'set(madeAtoms.');
        selectorsClone[selectorKey].set = eval('(' + selectorsClone[selectorKey].set + ')');
      }
      if (selectorsClone[selectorKey].get){
        selectorsClone[selectorKey].get = selectorsClone[selectorKey].get.replaceAll('get(', 'get(madeAtoms.');
        selectorsClone[selectorKey].get = eval('(' + selectorsClone[selectorKey].get + ')');
      } else {
        selectorsClone[selectorKey].get = ({ get }) => {return};
      }
      createdSelectors[selectorKey] = selector(selectorsClone[selectorKey]);
    });

    setMadeSelectors(createdSelectors);
    setLoading(false);
  }, [ madeAtoms ]);


  // chosen selector piece of state that tells our container which piece of state has been chosen,
  // and therefore will be drilled down (chosenSelector is just a string)
  const [ currentSelector, setCurrentSelector ] = useState(''); 
  const [ loadedSelector, setLoadedSelector ] = useState(() => {return});
  const [ javascript, setJavascript ] = useState('');

  return loading
  ? (<p>loading...</p>)
  : (
      <div className='testing-container'>
        <div>
          {/* requires a parameter to be passed in, regardless of whether or not it's used. */}
          <h1>Testing Window</h1>
          <SelectorsButton
            key='selectors button'
            madeSelectors={madeSelectors}
            currentAtom={currentAtom}
            setCurrentAtom={setCurrentAtom}
            currentAtomValue={currentAtomValue}
            setCurrentAtomValue={setCurrentAtomValue}
            toBeValue={toBeValue}
            setToBeValue={setToBeValue}
            parameters={parameters}
            setParameters={setParameters}
            atoms={atoms}
            selectors={selectors}
            currentSelector={currentSelector}
            setCurrentSelector={setCurrentSelector}
            onChange={setJavascript}
            selectorsFnAsStrings={$selectors}
            loadedSelector={loadedSelector}
            setLoadedSelector={setLoadedSelector}
          />
        </div>
        <Editor
            onChange={setJavascript}
            selectorsFnAsStrings={$selectors}
            madeAtoms={madeAtoms}
            value={javascript}
            loadedSelector={loadedSelector}
            toBeValue={toBeValue}             // the value that is expected after the selector is invoked (user input)
            currentAtom={currentAtom}         // the current atom's key value -> will need to grab our atom's value with matching key from our recoil state to compare with toBeValue
            currentAtomValue={currentAtomValue} // reassign our GUIs stateful atom as the value of currentAtomValue 
            currentSelector={currentSelector} // the currentSelector chosen from our drop down menu (just the key)
            setCurrentSelector={setCurrentSelector}
            madeSelectors={madeSelectors} // the object containing our actual selectors from our recoil state -> match the key from currentSelector from our made selector with useSetRecoilState
            parameters={parameters}       // pass down the parameters into editor to use
        />
      </div>
    )
};

export default Testing;
