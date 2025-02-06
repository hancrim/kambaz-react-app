const ConditionalOutputInline = () => {
  const loggedIn = false;
  return (
    <div id="wd-conditional-output-inline">
      <h2>Welcome If Else</h2>
      {loggedIn && <h2>Welcome Inline</h2>}
      {!loggedIn && <h2>Please login Inline</h2>}
    </div>
  );
};
export default ConditionalOutputInline;
