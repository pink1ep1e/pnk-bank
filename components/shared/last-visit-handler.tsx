"use client";

import { useEffect } from 'react';
import { AddXp } from "@/lib/add-xp";

interface LastVisitHandlerProps {
  userId: number;
}

export const LastVisitHandler = ({ userId }: LastVisitHandlerProps) => {
  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toISOString().split('T')[0];

    console.log(lastVisit, today)

    if (lastVisit !== today) {
        AddXp(userId, 100);
      }

    localStorage.setItem('lastVisit', today);
  }, [userId]);

  return null;
};