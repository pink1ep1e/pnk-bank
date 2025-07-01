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

    if (lastVisit) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastVisit === yesterdayStr) {
        AddXp(userId, 50);
      }
    }

    localStorage.setItem('lastVisit', today);
  }, [userId]);

  return null;
};