import { globalConfigAtom, globalMusicControllerAtom } from '@/store/music/state';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useMemo } from 'react';
import { CgTrashEmpty } from 'react-icons/cg';
import { MdMusicNote, MdOutlinePauseCircleFilled, MdOutlinePlayCircleFilled, MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';

const iconClass = 'h-8 w-8 text-primary';
export default function FloatingActions() {
  const [globalConfig, setGlobalConfig] = useRecoilState(globalConfigAtom);
  const globalController = useRecoilValue(globalMusicControllerAtom);
  const actions = useMemo(
    () => [
      {
        icon: <CgTrashEmpty className={iconClass} />,
        name: '清空播放列表',
        event: () => {
          globalController.list.clear();
        },
      },
      {
        icon: <MdSkipNext className={iconClass} />,
        name: '下一首',
        event: () => {
          globalController.skipForward();
        },
      },
      {
        icon: <MdSkipPrevious className={iconClass} />,
        name: '上一首',
        event: () => {
          globalController.skipBack();
        },
      },
      {
        icon: globalConfig.playerPause ? (
          <MdOutlinePlayCircleFilled className={iconClass} />
        ) : (
          <MdOutlinePauseCircleFilled className={iconClass} />
        ),
        name: '播放 / 暂停',
        event: () => {
          setGlobalConfig((prev) => {
            const { playerPause } = prev;
            playerPause ? globalController.play() : globalController.pause();
            return { ...prev, playerPause: !playerPause };
          });
        },
      },
      {
        icon: <MdMusicNote className={iconClass} />,
        name: '显示 / 隐藏播放器',
        event: () => {
          setGlobalConfig((prev) => ({ ...prev, playerShow: !prev.playerShow }));
        },
      },
    ],
    [globalConfig, globalController, setGlobalConfig],
  );

  return (
    <SpeedDial color="primary" ariaLabel="FloatingActions" className="absolute bottom-4 right-4" icon={<SpeedDialIcon />}>
      {actions.map((action) => (
        <SpeedDialAction key={action.name} icon={action.icon} onClick={action.event} tooltipTitle={action.name} />
      ))}
    </SpeedDial>
  );
}
