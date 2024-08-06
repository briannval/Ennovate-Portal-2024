const Team = ({
  name,
  title,
  email,
  img,
}: {
  name: string;
  title: string;
  email: string;
  img: string;
}) => {
  /*
    TODO: add responsiveness for fields
    */

  return (
    <div
      style={{ background: "#213c87" }}
      className="h-[250px] w-[250px] cursor-pointer transition-[0.2s] duration-[ease-in-out] ease-[box-shadow] overflow-hidden m-[25px]"
    >
      <h1 className="font-medium absolute text-[white] z-50 text-[25px] left-[25px] bottom-[25px]">
        {name}
      </h1>
      <p className="person-title">{title}</p>
      <p className="person-email">{email}</p>
      <div className="person-gradient"></div>
      <img className="person-img" src={img}></img>
    </div>
  );
};

export default Team;
