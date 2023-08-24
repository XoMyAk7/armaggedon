import { actions as sizeActions } from "../store/reducers/sizeSlice";
import { actions as basketActions } from "../store/reducers/basketSlice";
import { actions as distanceActions } from "../store/reducers/distanceSlice";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";

const rootActions = {
  ...sizeActions,
  ...basketActions,
  ...distanceActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
