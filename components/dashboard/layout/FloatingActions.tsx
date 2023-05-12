import { globalConfigAtom, globalMusicControllerAtom } from '@/store/music/state';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useMemo } from 'react';
import { MdMusicNote, MdOutlinePauseCircleFilled, MdOutlinePlayCircleFilled } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';

const iconClass = 'h-8 w-8 text-primary';
export default function FloatingActions() {
  const [globalConfig, setGlobalConfig] = useRecoilState(globalConfigAtom);
  const globalController = useRecoilValue(globalMusicControllerAtom);
  const actions = useMemo(
    () => [
      {
        icon: globalConfig.playerPause ? (
          <MdOutlinePlayCircleFilled className={iconClass} />
        ) : (
          <MdOutlinePauseCircleFilled className={iconClass} />
        ),
        name: 'Music Play Or Pause',
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
        name: 'Music Show',
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
