import { actions as sizeActions } from "../store/reducers/sizeSlice";
import { actions as basketActions } from "../store/reducers/basketSlice";
import { actions as distanceActions } from "../store/reducers/distanceSlice";
import { actions as asteroidActions } from "../store/reducers/asteroidSlice";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";

const rootActions = {
  ...sizeActions,
  ...basketActions,
  ...distanceActions,
  ...asteroidActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
