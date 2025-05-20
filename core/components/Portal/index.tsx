"use client";
import React, { useEffect, useState } from "react";

import { createPortal } from "react-dom";

type TProps = {
  children: React.ReactNode;
};

const Portal = ({ children }: TProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const domElement = document.querySelector("#portal");

  if (!domElement) return;

  if (!isMounted) return;

  return createPortal(children, domElement);
};

export default Portal;
