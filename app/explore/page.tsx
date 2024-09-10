"use client";

import React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/useType";
import { selectUser } from "../../state/userSlice/user.selectors";
type Props = {};

function Page({}: Props) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUser);

  return <div>{userData?.name} Explore</div>;
}

export default Page;
