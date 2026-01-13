import { useSelector } from "react-redux";

const Notification = () => {
  const text = useSelector((state) => state.notification.text);
  const visible = useSelector((state) => state.notification.visible);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  if (!visible) return null;

  return <div style={style}>{text}</div>;
};

export default Notification;
