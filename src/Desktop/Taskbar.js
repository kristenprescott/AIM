import "./styles.css";
import { useState } from "react";
import { ReaderClosed, WindowsExplorer, Computer3 } from "@react95/icons";
import { TaskBar, List, Modal } from "@react95/core";
import { AppBar } from "react95";

export default function Taskbar() {
  const [first, toggleFirst] = useState(false);
  const [second, toggleSecond] = useState(false);

  const closeFirst = () => toggleFirst(false);
  const closeSecond = () => toggleSecond(false);

  return (
    <div id="Taskbar">
      <AppBar>
        {first && (
          <Modal
            icon={<WindowsExplorer variant="16x16_4" />}
            title="Windows Explorer"
            closeModal={closeFirst}
            width="300"
            height="200"
          />
        )}

        {second && (
          <Modal
            defaultPosition={{ x: 50, y: 50 }}
            width="300"
            height="200"
            icon={<WindowsExplorer variant="16x16_4" />}
            title="Local Disk (C:"
            closeModal={closeSecond}
          />
        )}
        <TaskBar
          style={{ justifyContent: "space-between" }}
          list={
            <List>
              <List.Item
                icon={<ReaderClosed variant="32x32_4" />}
                onClick={() => toggleSecond(false)}
              >
                Local Disk (C:)
              </List.Item>
              <List.Divider />
              <List.Item
                icon={<WindowsExplorer variant="32x32_4" />}
                onClick={() => toggleFirst(false)}
              >
                Windows Explorer
              </List.Item>
              <List.Divider />
              <List.Item icon={<Computer3 variant="32x32_4" />}>
                Shut Down...
              </List.Item>
            </List>
          }
        />
      </AppBar>
    </div>
  );
}
