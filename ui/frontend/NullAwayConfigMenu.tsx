import React, {Fragment, useCallback, useState} from 'react';

import MenuGroup from './MenuGroup';
import {CheckboxConfig} from './ConfigElement';
import {SegmentedButton} from './SegmentedButton';
import HeaderButton from './HeaderButton';
import {BuildIcon} from './Icon';
import * as actions from './actions';
import {useAppDispatch} from './configureStore';

const useDispatchAndClose = (action: () => actions.ThunkAction, close: () => void) => {
  const dispatch = useAppDispatch();

  return useCallback(
    () => {
      dispatch(action());
      close();
    },
    [action, close, dispatch]
  );
}


const NullAwayConfigMenu = () => {
  const [castToNonNullMethod, setCastToNonNullMethod] = useState('');
  const [checkOptionalEmptiness, setCheckOptionalEmptiness] = useState(false);
  const [checkContracts, setCheckContracts] = useState(false);
  const [jspecifyMode, setJSpecifyMode] = useState(false);

  const nullawaycompile = useDispatchAndClose(actions.performNullAwayCompile, () => {});

  return (
    <Fragment>
      <MenuGroup title="NullAway Config">
        <div className="config-item">
          <label>
            CastToNonNullMethod&nbsp;&nbsp;
            <input
              type="text"
              value={castToNonNullMethod}
              onChange={(e) => setCastToNonNullMethod(e.target.value)}
              className="config-input"
            />
          </label>
        </div>
        <CheckboxConfig
          name="&nbsp;&nbsp;CheckOptionalEmptiness"
          checked={checkOptionalEmptiness}
          onChange={() => setCheckOptionalEmptiness(!checkOptionalEmptiness)}
        />
        <CheckboxConfig
          name="&nbsp;&nbsp;CheckContracts"
          checked={checkContracts}
          onChange={() => setCheckContracts(!checkContracts)}
        />
        <CheckboxConfig
          name="&nbsp;&nbsp;JSpecifyMode"
          checked={jspecifyMode}
          onChange={() => setJSpecifyMode(!jspecifyMode)}
        />

      </MenuGroup>

      <MenuGroup title='Action'>
        <SegmentedButton isBuild onClick={nullawaycompile}>
          <HeaderButton bold rightIcon={<BuildIcon />}>
            Build
          </HeaderButton>
        </SegmentedButton>
      </MenuGroup>

    </Fragment>
  );
};



export default NullAwayConfigMenu;
