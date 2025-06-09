import { formatHex8 } from "culori";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ChangeEvent,
    type FC,
    type MouseEvent,
} from "react";
import type { Color, ColorLike, Variant } from "../../../types";
import { darken } from "../../../utils";
import styled from "../../../utils/styled";
import {
    resolveSliderLabelSize,
    resolveSliderThumbSize,
    resolveSliderThumbStyles,
    resolveSliderTickSize,
    resolveSliderTrackStyles,
    resolveSliderTrackThickness,
} from "./Slider.helpers";
import type {
    SliderMark,
    SliderOrientation,
    SliderProps,
} from "./Slider.types";

const SliderRoot = styled("div")<{
    orientation: SliderOrientation;
    disabled?: boolean;
    full?: boolean;
    length?: number;
}>(({ orientation, full, length, disabled }) => ({
    position: "relative",
    display: "flex",
    flexDirection: orientation === "vertical" ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
    height: orientation === "vertical" ? (length ?? 120) : 40,
    width:
        orientation === "horizontal" ? (full ? "100%" : (length ?? 200)) : 40,
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    touchAction: "none",
}));

const TrackContainer = styled("div")<{
    orientation: SliderOrientation;
}>(({ orientation }) => ({
    position: "relative",
    flexGrow: 1,
    borderRadius: 9999,
    ...(orientation === "horizontal"
        ? { height: 4, width: "100%" }
        : { width: 4, height: "100%" }),
}));

const TrackSegment = styled("div")<{
    orientation: SliderOrientation;
    start: number;
    end: number;
}>(({ theme, orientation, start, end }) => ({
    background: formatHex8(darken(theme.colors.neutral, 0.25)),
    position: "absolute",
    borderRadius: 9999,
    ...(orientation === "horizontal"
        ? {
              left: `${start}%`,
              width: `${end - start}%`,
              top: 0,
              height: "100%",
          }
        : {
              bottom: `${start}%`,
              height: `${end - start}%`,
              left: 0,
              width: "100%",
          }),
}));

const TrackSegmentFilled = styled("div")<{
    color: Color | ColorLike;
    variant: Variant;
    orientation: SliderOrientation;
    start: number;
    end: number;
    hovered: boolean;
}>(({ theme, color, variant, orientation, start, end, hovered }) => ({
    position: "absolute",
    borderRadius: 9999,
    ...(orientation === "horizontal"
        ? {
              left: `${start}%`,
              width: `${end - start}%`,
              top: 0,
              height: "100%",
          }
        : {
              bottom: `${start}%`,
              height: `${end - start}%`,
              left: 0,
              width: "100%",
          }),
    ...resolveSliderTrackStyles(theme, color, hovered)[variant],
}));

const Tick = styled("div")<{
    orientation: SliderOrientation;
    percent: number;
}>(({ theme, percent, orientation }) => ({
    position: "absolute",
    backgroundColor: theme.colors.common.white,
    ...(orientation === "horizontal"
        ? {
              left: `${percent}%`,
              top: "50%",
              width: 1,
              height: 2,
              transform: "translate(-50%, -50%)",
          }
        : {
              bottom: `${percent}%`,
              left: "50%",
              width: 2,
              height: 1,
              transform: "translate(-50%, 50%)",
          }),
}));

const Thumb = styled("div")<{
    color: Color | ColorLike;
    variant: Variant;
    percent: number;
    orientation: SliderOrientation;
    hovered: boolean;
}>(({ theme, color, variant, percent, orientation, hovered = false }) => ({
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundClip: "content-box",
    boxSizing: "border-box",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    ...(orientation === "horizontal"
        ? { left: `${percent}%`, top: "50%" }
        : { top: `${100 - percent}%`, left: "50%" }),
    ...resolveSliderThumbStyles(theme, color, hovered)[variant],
}));

const Label = styled("div")(({ theme }) => ({
    position: "absolute",
    top: "-1.5rem",
    color: theme.typography.colors.primary,
    whiteSpace: "nowrap",
    ...theme.typography.levels["body-xs"],
}));

const HiddenInput = styled("input")({
    position: "absolute",
    width: 0,
    height: 0,
    opacity: 0,
    margin: 0,
    padding: 0,
    pointerEvents: "none",
});

export const Slider: FC<SliderProps> = ({
    color = "primary",
    variant = "solid",
    size = "md",
    min = 0,
    max = 100,
    step = 1,
    defaultValue,
    value,
    onChange,
    onChangeCommitted,
    orientation = "horizontal",
    disabled,
    full,
    length,

    marks,
    valueLabelDisplay = "off",
    getAriaLabel,
    getAriaValueText,
    disableSwap,
    ...rest
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isRange = Array.isArray(value ?? defaultValue);
    const [internalValue, setInternalValue] = useState<number[]>(
        isRange
            ? ((defaultValue as number[] | undefined) ?? [min, max])
            : [(defaultValue as number | undefined) ?? min],
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled
        ? Array.isArray(value)
            ? value
            : [value]
        : internalValue;

    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const percents = currentValue.map((v) => ((v - min) / (max - min)) * 100);
    const sortedPercents = [...percents].sort((a, b) => a - b);

    const resolvedMarks: SliderMark[] = useMemo(() => {
        if (marks === true) {
            const s = step ?? 1;
            const out: SliderMark[] = [];
            for (let i = min; i <= max; i += s) {
                out.push({ value: i });
            }
            return out;
        } else if (Array.isArray(marks)) {
            return marks;
        }
        return [];
    }, [marks, min, max, step]);

    const snapToMarks = useCallback(
        (val: number) => {
            if (!Array.isArray(marks)) return val;
            const sorted = [...marks].map((m) => m.value).sort((a, b) => a - b);
            return sorted.reduce(
                (closest, curr) =>
                    Math.abs(curr - val) < Math.abs(closest - val)
                        ? curr
                        : closest,
                sorted[0],
            );
        },
        [marks],
    );

    const updateValue = useCallback(
        (index: number, newVal: number) => {
            newVal = snapToMarks(newVal);
            if (isRange && disableSwap) {
                if (index === 0 && newVal > currentValue[1]) return;
                if (index === 1 && newVal < currentValue[0]) return;
            }
            const newValue: number[] = [...currentValue];
            newValue[index] = newVal;
            if (!isControlled) setInternalValue(newValue);
            const fakeEvent = {
                target: { value: isRange ? newValue : newValue[0] },
            } as unknown as ChangeEvent<HTMLInputElement>;
            onChange?.(fakeEvent, isRange ? newValue : newValue[0]);
        },
        [
            currentValue,
            isControlled,
            isRange,
            onChange,
            snapToMarks,
            disableSwap,
        ],
    );

    const getPositionValue = useCallback(
        (clientX: number, clientY: number) => {
            if (!ref.current) return null;
            const rect = ref.current.getBoundingClientRect();
            const pos =
                orientation === "horizontal"
                    ? clientX - rect.left
                    : rect.bottom - clientY;
            const size =
                orientation === "horizontal" ? rect.width : rect.height;
            const percent = Math.min(Math.max(pos / size, 0), 1);
            const raw = percent * (max - min) + min;
            return Math.round(raw / step!) * step!;
        },
        [orientation, min, max, step],
    );

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (draggingIndex === null) return;
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            const newValue = getPositionValue(clientX, clientY);
            if (newValue !== null) updateValue(draggingIndex, newValue);
        };

        const handleUp = (e: MouseEvent | TouchEvent) => {
            if (draggingIndex !== null) {
                setDraggingIndex(null);
                onChangeCommitted?.(
                    e as any,
                    isRange ? [...currentValue] : currentValue[0],
                );
            }
            window.removeEventListener("mousemove", handleMove as any);
            window.removeEventListener("mouseup", handleUp as any);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("touchend", handleUp);
        };

        if (draggingIndex !== null) {
            window.addEventListener("mousemove", handleMove as any);
            window.addEventListener("mouseup", handleUp as any);
            window.addEventListener("touchmove", handleMove);
            window.addEventListener("touchend", handleUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMove as any);
            window.removeEventListener("mouseup", handleUp as any);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("touchend", handleUp);
        };
    }, [
        draggingIndex,
        currentValue,
        updateValue,
        getPositionValue,
        onChangeCommitted,
        isRange,
    ]);

    const handleTrackStart = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
        const clickedVal = getPositionValue(clientX, clientY);
        if (clickedVal === null) return;

        let indexToDrag = 0;

        if (isRange) {
            const dist = currentValue.map((v) => Math.abs(v - clickedVal));
            indexToDrag = dist[0] <= dist[1] ? 0 : 1;

            // 🔁 Update value immediately when clicking on the track
            updateValue(indexToDrag, clickedVal);
        } else {
            updateValue(0, clickedVal);
        }

        setDraggingIndex(indexToDrag);
    };

    const htmlStep =
        step === null ? "any" : typeof step === "number" ? step : 1;

    const tickSize = resolveSliderTickSize(size);
    const labelSize = resolveSliderLabelSize(size);
    const thumbSize = resolveSliderThumbSize(size);
    const trackThickness = resolveSliderTrackThickness(size);

    return (
        <SliderRoot
            ref={ref}
            disabled={disabled}
            orientation={orientation}
            full={full}
            length={length}
            onMouseDown={handleTrackStart}
            onTouchStart={handleTrackStart as any}
        >
            <TrackContainer
                orientation={orientation}
                css={{
                    height:
                        orientation === "horizontal" ? trackThickness : "100%",
                    width: orientation === "vertical" ? trackThickness : "100%",
                }}
            >
                {isRange ? (
                    <>
                        <TrackSegmentFilled
                            color={color}
                            variant={variant}
                            start={0}
                            end={sortedPercents[0]}
                            orientation={orientation}
                            hovered={hoveredIndex === 0}
                        />
                        <TrackSegment
                            start={sortedPercents[0]}
                            end={sortedPercents[1]}
                            orientation={orientation}
                        />
                        <TrackSegmentFilled
                            color={color}
                            variant={variant}
                            start={sortedPercents[1]}
                            end={100}
                            orientation={orientation}
                            hovered={hoveredIndex === 1}
                        />
                    </>
                ) : (
                    <>
                        <TrackSegmentFilled
                            color={color}
                            variant={variant}
                            start={0}
                            end={sortedPercents[0]}
                            orientation={orientation}
                            hovered={hoveredIndex === 0}
                        />
                        <TrackSegment
                            start={sortedPercents[0]}
                            end={100}
                            orientation={orientation}
                        />
                    </>
                )}

                {resolvedMarks.map((mark, i) => {
                    const percent = ((mark.value - min) / (max - min)) * 100;
                    return (
                        <>
                            <Tick
                                key={`tick-${i}`}
                                orientation={orientation}
                                percent={percent}
                                css={{
                                    width:
                                        orientation === "horizontal"
                                            ? 1
                                            : tickSize,
                                    height:
                                        orientation === "horizontal"
                                            ? tickSize
                                            : 1,
                                }}
                            />
                            {mark.label != null && (
                                <Label
                                    key={`label-${i}`}
                                    css={{
                                        fontSize: labelSize,
                                        left:
                                            orientation === "horizontal"
                                                ? `${percent}%`
                                                : undefined,
                                        bottom:
                                            orientation === "vertical"
                                                ? `${percent}%`
                                                : undefined,
                                        transform: "translate(-50%, 0)",
                                    }}
                                >
                                    {mark.label ?? mark.value}
                                </Label>
                            )}
                        </>
                    );
                })}

                {currentValue.map((val, i) => (
                    <>
                        <Thumb
                            color={color}
                            variant={variant}
                            key={i}
                            percent={percents[i]}
                            hovered={hoveredIndex === i}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            orientation={orientation}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                setDraggingIndex(i);
                            }}
                            onTouchStart={(e) => {
                                e.stopPropagation();
                                setDraggingIndex(i);
                            }}
                            css={{
                                width: thumbSize,
                                height: thumbSize,
                            }}
                        />
                        {valueLabelDisplay !== "off" && (
                            <Label
                                style={{
                                    left:
                                        orientation === "horizontal"
                                            ? `${percents[i]}%`
                                            : undefined,
                                    top:
                                        orientation === "vertical"
                                            ? `${100 - percents[i]}%`
                                            : undefined,
                                }}
                            >
                                {Math.round(val)}
                            </Label>
                        )}
                    </>
                ))}
            </TrackContainer>
            <HiddenInput
                type="range"
                min={min}
                max={max}
                step={htmlStep}
                value={isRange ? undefined : currentValue[0]}
                onChange={(e: any) => {
                    const newVal = parseFloat(e.target.value);
                    updateValue(0, newVal);
                }}
                disabled={disabled}
                {...rest}
            />
        </SliderRoot>
    );
};
