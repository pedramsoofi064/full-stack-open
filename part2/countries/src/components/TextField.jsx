const TextFiled = ({ value, setFieldValue, title }) => {
  return (
    <>
      <label>{title}</label>{" "}
      <input value={value} onChange={(e) => setFieldValue(e.target.value)} />
    </>
  );
};

export default TextFiled;
