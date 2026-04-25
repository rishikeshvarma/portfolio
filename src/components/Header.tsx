"use client";

import { useEffect, useState } from "react";
import { Flex, Fade } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";
import { person } from "@/app/resources/content";
import { display } from "@/app/resources";
import { ThemeToggle } from "./ThemeToggle";

const TimeDisplay = ({ timeZone, locale = "en-GB" }: { timeZone: string; locale?: string }) => {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone, locale]);
  return <>{currentTime}</>;
};

export const Header = () => {
  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Flex
        fitHeight
        position="unset"
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
      >
        <Flex fillWidth className={styles.headerRow} horizontal="space-between" vertical="center">
          <Flex className={styles.headerLeft} paddingLeft="12" horizontal="start" vertical="center" textVariant="body-default-s">
            {person.timezone}
          </Flex>
          <Flex className={styles.headerRight} paddingRight="12" horizontal="end" vertical="center" textVariant="body-default-s" gap="20">
            {display.themeSwitcher && <ThemeToggle />}
            {display.time && <TimeDisplay timeZone={person.timezone} />}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default TimeDisplay;
