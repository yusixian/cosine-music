import { AnimatePresence } from 'framer-motion';
import { ReactElement, cloneElement, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Tab from './Tab';
import TabList from './TabList';
import TabPanel from './TabPanel';

type TabsProps = {
  defaultActive?: number;
  id?: string;
  className?: string;
  children?: ReactElement[];
};
function Tabs({ id = 'default', defaultActive, className, children }: TabsProps) {
  const [selected, setSelected] = useState(defaultActive ?? 0);
  const [tabList, ...tabPanels] = children ?? [];

  if (!children?.length || children?.length <= 1) throw new Error('Tabs must have at least 2 children');
  return (
    <div className={twMerge('flex flex-col items-center justify-center gap-3', className)}>
      {cloneElement(tabList, {
        selected,
        setSelected,
        onClick: tabList?.props?.onClick,
        id,
        ...(tabList?.props ?? {}),
      })}
      <AnimatePresence mode="wait" initial={false}>
        {cloneElement(tabPanels[selected], {
          key: tabPanels[selected]?.props?.key ?? `${id}-tab-panel-${selected}`,
          ...(tabPanels[selected]?.props ?? {}),
        })}
      </AnimatePresence>
    </div>
  );
}

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;
export default Tabs;
