import FieldInfoWrapper from "../../assets/wrappers/fieldInfo-wrapper";

const FieldInfo = ({ icon, text }) => {
  return (
    <FieldInfoWrapper>
      <span className="icon">{icon} </span>
      <span className="text">{text} </span>
    </FieldInfoWrapper>
  );
};
export default FieldInfo;
