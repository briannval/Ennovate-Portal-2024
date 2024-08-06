const Team = () => {
  return (
    <div className="member block">
      <h1 className="person-name">Tiya Tanaka</h1>
      <p className="person-title">Project Director</p>
      <p className="person-email">tanakatiya@gmail.com</p>
      <div className="person-gradient"></div>
      <img
        className="person-img"
        src={require("./assets/team-members/Tiya-Tanaka.jpg")}
      ></img>
    </div>
  );
};

export default Team;
