import React, {useCallback, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import { State } from '../reducers';

import Section from './Section';
import SimplePane from './SimplePane';

import styles from './Execute.module.css';
import {editCode} from '../actions';

const Execute: React.FC = () => {
  const details = useSelector((state: State) => {
    console.log('Current state:', state);
    return state.output.execute;
  });

  const primaryAction = useSelector((state: State) => state.configuration.primaryAction);
  const stdout = useSelector((state: State) => state.output.execute.stdout);
  const code = useSelector((state: State) => state.code);
  const dispatch = useDispatch();
  const [displayStdout, setDisplayStdout] = useState(stdout);


  useEffect(() => {
    if (primaryAction === 'annotator') {
      if (stdout) {
        setDisplayStdout('Annotated Successfully!');
      } else {
        setDisplayStdout('Waiting for Annotations...');
      }
    } else {
      setDisplayStdout(stdout);
    }
  }, [primaryAction, stdout]);

  useEffect(() => {
    if (primaryAction === 'annotator') {
      dispatch(editCode(stdout || code));
    }
  }, [primaryAction, stdout, code, dispatch]);


  const isAutoBuild = useSelector(selectors.isAutoBuildSelector);

  const addMainFunction = useCallback(() => dispatch(actions.addMainFunction()), [dispatch]);

  return (
    <SimplePane {...details} kind="execute" stdout={displayStdout}>
      {isAutoBuild && <Warning addMainFunction={addMainFunction} />}
    </SimplePane>
  );
};

interface WarningProps {
  addMainFunction: () => any;
}

const Warning: React.FC<WarningProps> = props => (
  <Section kind="warning" label="Warnings">
    No main method was detected, so your code was compiled
    {'\n'}
    but not run. If you’d like to execute your code, please
    {'\n'}
    <button className={styles.addMain} onClick={props.addMainFunction}>
      add a main method
    </button>
    .
  </Section>
);

export default Execute;
