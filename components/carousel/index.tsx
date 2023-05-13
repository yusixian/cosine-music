import _ from 'lodash-es';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { twMerge } from 'tailwind-merge';
import { FaArrowRight } from 'react-icons/fa';
import clsx from 'clsx';

export type CarouselProps = {
  className?: string;
  wrapperClass?: string;
  children: React.ReactNode;
  width: number;
  height: number;
  // 默认位于第几张图
  defaultActiveIndex?: number;
  // 轮播图 自动轮播间隔 单位ms
  interval?: number;
  // CSS transition 时间 单位为s
  transitionTime?: number;
  // 自动播放
  autoplay?: boolean;
  // 渲染上一个指示器
  renderLeftArrow?: ({ preEvent }: { preEvent: () => void }) => React.ReactNode;
  // 渲染下一个指示器
  renderRightArrow?: ({ nextEvent }: { nextEvent: () => void }) => React.ReactNode;
  // 按钮throttle时间
  throttleTime?: number;
  // 渲染圆点指示器
  dotClass?: string;
  renderDot?: ({ goTo }: { goTo: (idx: number) => void }) => React.ReactNode;
};

type CarouselStyledProps = {
  offset: number;
  enableTransitionAnim?: boolean;
  transitionTime?: number;
};
const CarouselWrapper = styled.div`
  transform: ${({ offset }: CarouselStyledProps) => `translateX(${offset}px)`};
  transition: ${({ enableTransitionAnim, transitionTime }: CarouselStyledProps) =>
    enableTransitionAnim ? `all ${transitionTime ?? 0.5}s` : 'none'};
`;
// TODO: new package utils and push
function useThrottle(fn: any, delay: number) {
  const options = { leading: true, trailing: false }; // add custom lodash options
  const fnRef = useRef(fn);
  // use mutable ref to make useCallback/throttle not depend on `fn` dep
  useEffect(() => {
    fnRef.current = fn;
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    _.throttle((...args) => fnRef.current(...args), delay, options),
    [delay],
  );
}

// TODO：mvp版本 优化offset、width
const Carousel = (props: CarouselProps): JSX.Element => {
  const {
    className,
    wrapperClass,
    defaultActiveIndex,
    children,
    transitionTime,
    width,
    height,
    interval,
    renderLeftArrow,
    renderRightArrow,
    throttleTime,
    dotClass,
    renderDot,
    autoplay,
  } = props;
  const [index, setIndex] = useState(defaultActiveIndex ?? 1);
  const [enableTransitionAnim, setEnableTransitionAnim] = useState(true);
  const length = React.Children.count(children);
  const realLength = length ? length + 2 : 0;
  const offset = useMemo(() => -width * index, [index, width]); // 计算偏移量
  const timer = useRef<any>(null);
  const [isMoving, setIsMoving] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = (idx: number) => {
    // 当在动画进行时，不允许切换
    if (!realLength || isMoving) return;
    // 切换前先把动画参数打开
    setEnableTransitionAnim(true);
    // 修改状态为进行时
    setIsMoving(true);
    // 改变当前位置
    setIndex(idx);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeWithoutAnim = (idx: number) => {
    // 当在动画进行时，不允许切换
    if (!realLength || isMoving) return;
    // 切换前先把动画参数打开
    setEnableTransitionAnim(false);
    // 改变当前位置
    setIndex(idx);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nextItem = () => {
    const tar = index === realLength - 1 ? 0 : index + 1;
    handleChange(tar);
  };
  const preItem = () => {
    handleChange(index === 0 ? realLength - 1 : index - 1);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setTimer = () =>
    setTimeout(() => {
      nextItem();
    }, interval);

  // 定时器自动播放
  useEffect(() => {
    if (!autoplay) return;
    timer.current && clearTimeout(timer.current);
    timer.current = setTimer();
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [autoplay, interval, setTimer]);

  useEffect(() => {
    if (isMoving) return;
    if (index === realLength - 1) {
      handleChangeWithoutAnim(1);
    } else if (index === 0) {
      handleChangeWithoutAnim(realLength - 2);
    }
  }, [handleChangeWithoutAnim, index, isMoving, realLength]);

  // 处理过渡结束事件
  const handleTransitionEnd = () => {
    // 修改状态为完成
    setIsMoving(false);
  };
  const throttledPreItem = useThrottle(preItem, throttleTime ?? 300);
  const throttledNextItem = useThrottle(nextItem, throttleTime ?? 300);
  const throttledHandleChange = useThrottle(handleChange, throttleTime ?? 300);

  // 渲染轮播图列表
  const renderList = () => {
    if (!length) return null;
    const childrenArray = React.Children.toArray(children);
    const firstElement = childrenArray[0];
    const lastElement = childrenArray[length - 1];
    childrenArray.unshift(lastElement);
    childrenArray.push(firstElement);
    return childrenArray.map((item, i) => (
      <div key={i} className={wrapperClass} style={{ width, height }}>
        {item}
      </div>
    ));
  };

  const _renderLeftArrow = () => {
    if (renderLeftArrow && typeof renderLeftArrow === 'function') return renderLeftArrow({ preEvent: throttledPreItem });
    return (
      <div
        className="absolute inset-y-0 left-0 flex cursor-pointer items-center justify-center bg-black/10 p-2"
        onClick={throttledPreItem}
      >
        <FaArrowRight className="h-5 w-5 rotate-180 fill-white" />
      </div>
    );
  };

  const _renderRightArrow = () => {
    if (renderRightArrow && typeof renderRightArrow === 'function') return renderRightArrow({ nextEvent: throttledNextItem });
    return (
      <div
        className="absolute inset-y-0 right-0 flex cursor-pointer items-center justify-center bg-black/10 p-2"
        onClick={throttledNextItem}
      >
        <FaArrowRight type="AiOutlineArrowLeft" className="h-5 w-5 fill-white" />
      </div>
    );
  };

  const _renderDot = () => {
    if (renderDot && typeof renderDot === 'function') return renderDot({ goTo: throttledHandleChange });
    if (!length) return null;
    const dots = [];
    for (let i = 0; i < length; ++i) {
      dots.push(
        <div
          key={i}
          className={twMerge(
            clsx('aspect-square w-2 cursor-pointer rounded-full bg-white/90', { 'bg-primary': index === i + 1 }),
            dotClass,
          )}
          onClick={() => throttledHandleChange(i + 1)}
        ></div>,
      );
    }
    return (
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center">
        <div className="mx-auto mb-1 flex items-center justify-center gap-2 rounded-full bg-black/10 p-2">
          {dots.map((v) => v)}
        </div>
      </div>
    );
  };
  return (
    <div className={twMerge('relative flex overflow-hidden', className)} style={{ width, height }}>
      <CarouselWrapper
        className="flex"
        offset={offset}
        transitionTime={transitionTime}
        enableTransitionAnim={enableTransitionAnim}
        onTransitionEnd={handleTransitionEnd}
      >
        {renderList()}
      </CarouselWrapper>
      {_renderLeftArrow()}
      {_renderRightArrow()}
      {_renderDot()}
    </div>
  );
};
Carousel.defaultProps = {
  defaultActiveIndex: 1,
  interval: 1000,
  transitionTime: 0.5,
  throttleTime: 300,
  autoplay: true,
};

export default Carousel;
