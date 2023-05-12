import React from "react";
import AppleSafari from "./apple-safari.svg";
import ArrowDownThik from "./arrow-down-thick.svg";
import AutoRenew from "./autorenew.svg";
import Check from "./check.svg";
import ChevronLeft from "./chevron-left.svg";
import ChevronRight from "./chevron-right.svg";
import ClockOutline from "./clock-outline.svg";
import CoffeeOutline from "./coffee-outline.svg";
import Cog from "./cog.svg";
import Copy from "./copy.svg";
import Delete from "./delete.svg";
import Exclamation from "./exclamation.svg";
import FileDownload from "./file-download-outline.svg";
import FileEye from "./file-eye-outline.svg";
import Firefox from "./firefox.svg";
import GoogleChrome from "./google-chrome.svg";
import HomeOutline from "./home-outline.svg";
import Info from "./info.svg";
import MenuDown from "./menu-down.svg";
import Minus from "./minus.svg";
import OpenInNew from "./open-in-new.svg";
import PageFirst from "./page-first.svg";
import PageLast from "./page-last.svg";
import Pencil from "./pencil.svg";
import PlayArrow from "./play-arrow.svg";
import Plus from "./plus.svg";
import Slack from "./slack.svg";
import Sync from "./sync.svg";
import TestTube from "./test-tube.svg";
import TimerSandComplete from "./timer-sand-complete.svg";
import Url from "./url.svg";
import X from "./x.svg";
import Nfc from "./nfc.svg";

export type IconNamesT =
  | "url"
  | "menuDown"
  | "arrowDownThik"
  | "sync"
  | "copy"
  | "check"
  | "info"
  | "exclamation"
  | "x"
  | "pencil"
  | "homeOutline"
  | "testTube"
  | "autoRenew"
  | "playArrow"
  | "appleSafari"
  | "firefox"
  | "googleChrome"
  | "coffeeOutline"
  | "plus"
  | "minus"
  | "timerSandComplete"
  | "openInNew"
  | "clockOutline"
  | "fileDownload"
  | "fileEye"
  | "chevronLeft"
  | "chevronRight"
  | "pageLast"
  | "pageFirst"
  | "delete"
  | "nfc"
  | "slack"
  | "cog";

export default {
  url: Url,
  menuDown: MenuDown,
  arrowDownThik: ArrowDownThik,
  sync: Sync,
  copy: Copy,
  cog: Cog,
  info: Info,
  check: Check,
  exclamation: Exclamation,
  x: X,
  pencil: Pencil,
  homeOutline: HomeOutline,
  testTube: TestTube,
  autoRenew: AutoRenew,
  playArrow: PlayArrow,
  firefox: Firefox,
  appleSafari: AppleSafari,
  googleChrome: GoogleChrome,
  coffeeOutline: CoffeeOutline,
  minus: Minus,
  plus: Plus,
  timerSandComplete: TimerSandComplete,
  openInNew: OpenInNew,
  clockOutline: ClockOutline,
  delete: Delete,
  fileDownload: FileDownload,
  pageFirst: PageFirst,
  pageLast: PageLast,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  fileEye: FileEye,
  slack: Slack,
  nfc: Nfc,
} as Record<IconNamesT, React.FC<React.SVGProps<SVGSVGElement>>>;
