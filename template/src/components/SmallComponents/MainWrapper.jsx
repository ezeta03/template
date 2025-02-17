import "../../../assets/sass/modules/SmallComponents/MainWrapper.module.scss";
import Header from "./Header";
import Aside from "./Aside";
import Wrapper from "./Wrapper";

const MainWrapper = () => {
  return (
    <>
      <Header />
      <main>
        <Aside />
        <Wrapper />
      </main>
    </>
  );
};

export default MainWrapper