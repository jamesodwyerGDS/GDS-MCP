"use client";
import React, { ComponentPropsWithoutRef } from "react";
import useCountdown from "../../hooks/useCountdown";
import {
  Container,
  TimerContainer,
  Circle,
  MaskCircle,
  InnerCircle,
  TimeLeft,
  Time,
  SizingProps,
  ColorProps,
  DisplayVariant,
} from "./index.styles";
import VisuallyHidden from "../utils/VisuallyHidden";

export type Props = {
  /** Date to countdown to */
  date: string | number | Date;
  /** Label of the message that displays on top of the time */
  timeLeftLabel: string;
  /** Colour variant for component */
  colourVariant?: ColorProps["$colourVariant"];
  /** Size variant for component */
  sizeVariant?: SizingProps["$sizeVariant"];
  /** Timer text display position
   * "start" value will align text to the start of the container.
   * "bottom" value will center the text below the timer.
   */
  textPosition?: SizingProps["$textPosition"];
  /** Display only the timer part, no animation  */
  timeOnly?: DisplayVariant["$timeOnly"];
  /** Callback to be called once timer finishes */
  onCountdownEnd?: () => void;
  /** Message spoken out by a screenreader once timer has finished */
  countdownEndA11yMessage?: string;
  /** Show days in the formatted time otherwise accumulated hours  */
  showDays?: boolean;
  /** Add days to hours in the formatted time otherwise drop days */
  multiDay?: boolean;
} & ComponentPropsWithoutRef<"div">;

/**The CountdownTimer component can be used i.e to display how much time user has to complete a purchase. */
const CountdownTimer = ({
  date,
  colourVariant = "light",
  sizeVariant = "regular",
  textPosition = "bottom",
  timeOnly = false,
  timeLeftLabel,
  onCountdownEnd,
  countdownEndA11yMessage,
  showDays,
  multiDay,
}: Props) => {
  const callbackTriggered = React.useRef<boolean>(false);

  const [reducedMotionPreference, setReducedMotionPreference] =
    React.useState(true);

  const {
    formatted,
    totalSeconds = 0,
    hasFinished,
    startSeconds,
  } = useCountdown({ to: date, showDays, multiDay }) ?? {};

  React.useEffect(() => {
    const mediaQuery = window?.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReducedMotionPreference(mediaQuery?.matches);
  }, []);

  const progress = React.useMemo(() => {
    if (
      typeof totalSeconds === "undefined" ||
      !startSeconds ||
      reducedMotionPreference
    ) {
      return 100;
    }

    return Number(((totalSeconds / startSeconds) * 100).toPrecision(2));
  }, [totalSeconds, startSeconds, reducedMotionPreference]);

  /** Run callback on countdown end */

  React.useEffect(() => {
    if (!hasFinished) {
      callbackTriggered.current = false;
    }

    if (hasFinished && !callbackTriggered.current) {
      onCountdownEnd?.();
      callbackTriggered.current = true;
    }
  }, [callbackTriggered, hasFinished, onCountdownEnd]);

  const radius = 25.5;

  const circumference = radius * 2 * Math.PI;

  /* Progress ring is created using stroke-dashoffset  */
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const innerCircleSize = React.useMemo(() => {
    const maxRadius = 14;

    const circleProgress =
      maxRadius - Math.abs((progress - 100) / 100) * maxRadius;

    return circleProgress;
  }, [progress]);

  const svgSize = sizeVariant === "small" ? 48 : 56;

  return (
    <Container $textPosition={textPosition}>
      {timeOnly ? null : (
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 51 51"
          aria-hidden="true"
        >
          <defs>
            <mask id="loader">
              <g>
                <line
                  x1="26.4838"
                  y1="-0.0146485"
                  x2="26.4838"
                  y2="7.18634"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="31.8088"
                  y1="0.756984"
                  x2="30.3117"
                  y2="7.80062"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="36.8579"
                  y1="2.61694"
                  x2="33.929"
                  y2="9.19538"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="41.4094"
                  y1="5.48622"
                  x2="37.1767"
                  y2="11.3119"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="45.2653"
                  y1="9.23899"
                  x2="39.9139"
                  y2="14.0574"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="48.2562"
                  y1="13.712"
                  x2="42.02"
                  y2="17.3125"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="50.2521"
                  y1="18.7087"
                  x2="43.4036"
                  y2="20.934"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="51.1656"
                  y1="24.01"
                  x2="44.004"
                  y2="24.7627"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="50.9564"
                  y1="29.3862"
                  x2="43.7948"
                  y2="28.6335"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="49.634"
                  y1="34.6028"
                  x2="42.7854"
                  y2="32.3776"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="47.2562"
                  y1="39.4279"
                  x2="41.02"
                  y2="35.8274"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="43.9265"
                  y1="43.6568"
                  x2="38.5751"
                  y2="38.8384"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="39.7916"
                  y1="47.0982"
                  x2="35.5589"
                  y2="41.2724"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="35.0309"
                  y1="49.6051"
                  x2="32.102"
                  y2="43.0267"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="29.8527"
                  y1="51.0669"
                  x2="28.3555"
                  y2="44.0233"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="24.484"
                  y1="51.4227"
                  x2="24.484"
                  y2="44.2217"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="19.1589"
                  y1="50.6512"
                  x2="20.6561"
                  y2="43.6076"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="14.1099"
                  y1="48.7913"
                  x2="17.0388"
                  y2="42.2128"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="9.55841"
                  y1="45.9239"
                  x2="13.7911"
                  y2="40.0982"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="5.7027"
                  y1="42.169"
                  x2="11.0541"
                  y2="37.3506"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="2.71167"
                  y1="37.6961"
                  x2="8.94791"
                  y2="34.0956"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="0.715763"
                  y1="32.6995"
                  x2="7.56431"
                  y2="30.4742"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="-0.197546"
                  y1="27.3979"
                  x2="6.964"
                  y2="26.6452"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="0.0116329"
                  y1="22.0218"
                  x2="7.17318"
                  y2="22.7745"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="1.33368"
                  y1="16.8054"
                  x2="8.18223"
                  y2="19.0306"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="3.71155"
                  y1="11.9803"
                  x2="9.94779"
                  y2="15.5808"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="7.04132"
                  y1="7.75136"
                  x2="12.3927"
                  y2="12.5698"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="11.1762"
                  y1="4.31004"
                  x2="15.4088"
                  y2="10.1358"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="15.9371"
                  y1="1.8031"
                  x2="18.866"
                  y2="8.38153"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  x1="21.1151"
                  y1="0.341283"
                  x2="22.6123"
                  y2="7.38492"
                  stroke="white"
                  strokeWidth="2"
                />
              </g>
            </mask>
            <mask id="circle">
              <circle
                cx="25.5"
                cy="25.7051"
                r="14.5"
                stroke="white"
                strokeWidth="2"
                fill="white"
              />
              <InnerCircle cx="25.5" cy="25.7051" r={innerCircleSize} />
            </mask>
          </defs>
          <g mask="url(#loader)">
            <Circle
              $colourVariant={colourVariant}
              cx={radius}
              cy={radius}
              r={radius}
              style={{ strokeDashoffset: -Math.abs(strokeDashoffset) }}
              strokeDasharray={circumference + " " + circumference}
            />
          </g>
          <g mask="url(#circle)">
            <MaskCircle
              cx="25.5"
              cy="25.7051"
              r="14.5"
              $colourVariant={colourVariant}
            />
          </g>
        </svg>
      )}
      <TimerContainer
        $colourVariant={colourVariant}
        $textPosition={textPosition}
        $sizeVariant={sizeVariant}
        $timeOnly={timeOnly}
      >
        {sizeVariant === "regular" && !timeOnly ? (
          <TimeLeft id="time-left">{timeLeftLabel}</TimeLeft>
        ) : null}
        <Time
          role="timer"
          {...(sizeVariant === "regular" && !timeOnly
            ? { "aria-labelledby": "time-left" }
            : { "aria-label": timeLeftLabel })}
          $sizeVariant={sizeVariant}
          $textPosition={textPosition}
          $timeOnly={timeOnly}
        >
          {formatted}
        </Time>
      </TimerContainer>
      {hasFinished && countdownEndA11yMessage ? (
        <VisuallyHidden>
          <p role="status" aria-live="assertive">
            {countdownEndA11yMessage}
          </p>
        </VisuallyHidden>
      ) : null}
    </Container>
  );
};

export default CountdownTimer;
